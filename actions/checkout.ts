'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { getShippingSettings } from '@/actions/admin/shipping'
import { validateCoupon } from '@/actions/admin/coupons'
import Razorpay from 'razorpay'
import crypto from 'crypto'

let razorpayInstance: any = null
try {
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  }
} catch (e) {
  console.warn("Razorpay credentials missing or invalid")
}

export async function createOrder(
  addressData: any,
  paymentMethod: string,
  cartItemsFromFrontend: any[],
  couponCode?: string
) {
  const supabaseAdmin = createAdminClient()
  
  let userId = null
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('boujee-user-session')?.value
    if (sessionCookie) {
      const parsed = JSON.parse(decodeURIComponent(sessionCookie))
      userId = parsed.id || null
    }
  } catch {
    console.warn("Session read exception caught safely.")
  }

  if (!cartItemsFromFrontend || cartItemsFromFrontend.length === 0) {
    return { success: false, error: 'Your shopping cart is completely empty.' }
  }

  // 1. 🛡️ SECURITY: Fetch real product prices from database to prevent client-side price tampering
  const productIds = cartItemsFromFrontend.map(i => i.id).filter(Boolean)
  let dbProducts: any[] = []
  if (productIds.length > 0) {
    const { data } = await supabaseAdmin
      .from('products')
      .select('id, price')
      .in('id', productIds)
    dbProducts = data || []
  }

  const dbPriceMap = new Map(dbProducts.map(p => [p.id, Number(p.price) || 0]))

  let subtotal = 0
  const validatedCartItems = []
  for (const item of cartItemsFromFrontend) {
    const realPrice = dbPriceMap.has(item.id) ? dbPriceMap.get(item.id)! : (Number(item.price) || 0)
    const quantity = Math.max(1, Number(item.quantity) || 1)
    subtotal += (realPrice * quantity)
    validatedCartItems.push({
      ...item,
      price: realPrice,
      quantity
    })
  }

  const shippingSettings = await getShippingSettings()
  const flatRate = Number(shippingSettings.flat_rate ?? 99)
  const freeThreshold = Number(shippingSettings.free_threshold ?? 1499)
  const codCharge = Number(shippingSettings.cod_charge ?? 50)
  const onlineDiscountPercent = Number(shippingSettings.online_discount ?? 0)

  const shipping_cost = subtotal >= freeThreshold ? 0 : flatRate
  const cod_cost = paymentMethod === 'COD' ? codCharge : 0

  let couponDiscount = 0
  if (couponCode) {
    const couponRes = await validateCoupon(couponCode, subtotal)
    if (couponRes.success && couponRes.coupon) {
      const coupon = couponRes.coupon
      if (coupon.type === 'percentage') {
        couponDiscount = Math.round((subtotal * coupon.value) / 100)
      } else {
        couponDiscount = coupon.value
      }
    }
  }

  const online_discount_amount = paymentMethod === 'RAZORPAY'
    ? Math.round((subtotal * onlineDiscountPercent) / 100)
    : 0

  const total_amount = Math.max(0, subtotal + shipping_cost + cod_cost - couponDiscount - online_discount_amount)

  const order_number = `BB-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
  const orderMockId = crypto.randomUUID()

  const orderRecordPayload = {
    id: orderMockId,
    user_id: userId,
    customer_name: addressData.fullName || addressData.full_name || 'Premium Collector',
    customer_email: addressData.email || '',
    customer_phone: addressData.phone || '',
    shipping_address: `${addressData.street}, ${addressData.city}, ${addressData.state} - ${addressData.zipCode}`,
    items: validatedCartItems,
    subtotal: subtotal,
    shipping_fee: shipping_cost,
    discount: couponDiscount + online_discount_amount,
    coupon_code: couponCode || null,
    total: total_amount,
    payment_method: paymentMethod === 'RAZORPAY' ? 'Razorpay Online' : 'COD',
    payment_status: paymentMethod === 'RAZORPAY' ? 'pending' : 'pending',
    status: 'pending',
    notes: null,
  }

  // Create order record in database (for both COD and Razorpay)
  try {
    const { error: orderInsertError } = await supabaseAdmin
      .from('orders')
      .insert([orderRecordPayload])

    if (orderInsertError) {
      console.error("Critical Supabase Orders insert crash:", orderInsertError.message)
      return { success: false, error: `Database Write Error: ${orderInsertError.message}` }
    }
  } catch (dbErr: any) {
    console.error("Orders transaction catch error block:", dbErr)
    return { success: false, error: 'Failed to write order record.' }
  }

  // Handle Razorpay: Create Gateway Order and update notes
  if (paymentMethod === 'RAZORPAY') {
    if (!razorpayInstance) {
      return { success: false, error: 'Razorpay payment gateway is not configured on the server environment.' }
    }
    try {
      const options = {
        amount: Math.round(total_amount * 100),
        currency: 'INR',
        receipt: orderMockId,
        payment_capture: 1,
        notes: {
          internal_order_id: orderMockId,
          customer_email: addressData.email || '',
        }
      }
      const rzpOrder = await razorpayInstance.orders.create(options)

      // Safely attach razorpay order id to notes field
      try {
        await supabaseAdmin
          .from('orders')
          .update({ notes: `Razorpay Order: ${rzpOrder.id}` })
          .eq('id', orderMockId)
      } catch (err) {
        console.warn('Could not update notes on order record:', err)
      }

      return {
        success: true,
        isRazorpay: true,
        razorpayOrderId: rzpOrder.id,
        orderId: orderMockId,
        orderNumber: order_number,
        amount: options.amount,
      }
    } catch (err: any) {
      console.error('Razorpay Gateway Error:', err)
      // Cleanup pending order if gateway initialization fails
      await supabaseAdmin.from('orders').delete().eq('id', orderMockId)
      return { success: false, error: 'Failed to initialize payment gateway window.' }
    }
  }

  // Reduce product stock for COD
  for (const item of validatedCartItems) {
    const { data: product } = await supabaseAdmin
      .from('products')
      .select('stock')
      .eq('id', item.id)
      .maybeSingle()

    if (product) {
      const currentStock = Number(product.stock) || 0
      const orderedQty = Number(item.quantity) || 1
      const newStock = Math.max(0, currentStock - orderedQty)
      await supabaseAdmin.from('products').update({ stock: newStock }).eq('id', item.id)
    }
  }

  // Clear cart cookies for COD
  const cookieStore = await cookies()
  cookieStore.delete('boujee-cart-token')
  cookieStore.delete('cart')

  revalidatePath('/cart')
  revalidatePath('/checkout')
  revalidatePath('/admin/orders')
  
  return { 
    success: true, 
    isRazorpay: false, 
    order_number: order_number, 
    orderId: orderMockId 
  }
}

export async function cancelPendingOrder(orderId: string) {
  if (!orderId) return
  try {
    const supabaseAdmin = createAdminClient()
    await supabaseAdmin
      .from('orders')
      .delete()
      .eq('id', orderId)
      .eq('payment_status', 'pending')
    
    revalidatePath('/admin/orders')
  } catch (e) {
    console.warn('Failed to delete pending order on cancel:', e)
  }
}

export async function verifyRazorpayPayment(
  razorpay_payment_id: string,
  razorpay_order_id: string,
  razorpay_signature: string,
  internal_order_id: string
) {
  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) return { success: false, error: 'Razorpay secret key token is not configured on your server.' }

  // 🛡️ SECURITY 1: Cryptographic HMAC-SHA256 signature verification
  const generated_signature = crypto
    .createHmac('sha256', secret)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex')

  const signatureBuffer = Buffer.from(razorpay_signature, 'utf8')
  const expectedBuffer = Buffer.from(generated_signature, 'utf8')

  let isValid = false
  if (signatureBuffer.length === expectedBuffer.length) {
    isValid = crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  }

  if (!isValid) {
    console.error('Razorpay signature verification failed:', {
      received: razorpay_signature,
      expected: generated_signature,
    })
    return { success: false, error: 'Payment signature verification failed. Untrusted source transaction.' }
  }

  try {
    const supabaseAdmin = createAdminClient()

    const updateData = {
      payment_status: 'paid',
      status: 'confirmed',
      notes: `Paid via Razorpay (Txn: ${razorpay_payment_id})`,
    }

    // Update order status in database
    const { data: updatedOrders, error: updateError } = await supabaseAdmin
      .from('orders')
      .update(updateData)
      .eq('id', internal_order_id)
      .select('items')

    if (updateError) {
      console.error("Failed adjusting payment confirmation flags on orders table:", updateError.message)
    }

    // Decrement product stock upon verified payment
    const orderItems = updatedOrders?.[0]?.items || []
    for (const item of orderItems) {
      if (!item.id) continue
      const { data: product } = await supabaseAdmin
        .from('products')
        .select('stock')
        .eq('id', item.id)
        .maybeSingle()

      if (product) {
        const currentStock = Number(product.stock) || 0
        const orderedQty = Number(item.quantity) || 1
        const newStock = Math.max(0, currentStock - orderedQty)
        await supabaseAdmin.from('products').update({ stock: newStock }).eq('id', item.id)
      }
    }
  } catch (err) {
    console.error("Failed adjusting payment confirmation flags on live table:", err)
  }

  const cookieStore = await cookies()
  cookieStore.delete('boujee-cart-token')
  cookieStore.delete('cart')

  revalidatePath('/cart')
  revalidatePath('/checkout')
  revalidatePath('/admin/orders')
  revalidatePath('/admin')
  return { success: true }
}

export async function processCheckout(
  profile: { fullName: string, email: string, phone: string, alternatePhone?: string, street: string, city: string, state: string, zipCode: string },
  items: any[],
  paymentMethod: 'COD' | 'RAZORPAY',
  couponCode?: string
) {
  const cookieStore = await cookies()
  cookieStore.set('boujee-customer-profile-token', encodeURIComponent(JSON.stringify(profile)), { path: '/', maxAge: 60 * 60 * 24 * 7 })
  return await createOrder(profile, paymentMethod, items, couponCode)
}

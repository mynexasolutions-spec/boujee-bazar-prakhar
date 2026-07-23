// import { createClient } from '@/lib/supabase/server'
// import { notFound } from 'next/navigation'
// import Link from 'next/link'
// import Image from 'next/image'
// import { ArrowLeft, User, MapPin, Package, CreditCard } from 'lucide-react'
// import { OrderStatusManager } from '../_components/OrderStatusManager'

// export const metadata = {
//   title: 'Order Details | Admin Dashboard',
// }

// export default async function AdminOrderDetailsPage({
//   params,
// }: {
//   params: Promise<{ id: string }>
// }) {
//   const resolvedParams = await params
//   const orderId = resolvedParams.id
//   const supabase = await createClient()

//   // Fetch Order Details
//   const { data: order, error: orderError } = await supabase
//     .from('orders')
//     .select(`
//       *,
//     `)
//     .eq('id', orderId)
//     .single()

//   if (orderError) {
//     console.error('Failed to load order', orderId, orderError)
//   }

//   if (!order) {
//     notFound()
//   }

//   // order_items.product_id has no DB foreign key to products (some legacy/mock
//   // rows may not resolve), so look products up separately rather than embedding.
//   const productIds = Array.from(new Set((order.order_items || []).map((item: any) => item.id || item.product_id).filter(Boolean)))

//   let productsById: Record<string, { image_url: string; is_active: boolean }> = {}
//   if (productIds.length > 0) {
//     const { data: productsData } = await supabase
//       .from('products')
//       // .select('id, is_active, featured_image_url, product_images ( image_url )')
//       .select('id, available, image')
//       .in('id', productIds)

//     productsById = (productsData || []).reduce((acc: any, p: any) => {
//       acc[p.id] = {
//         // image_url: p.product_images?.[0]?.image_url || p.featured_image_url || null,
//         // is_active: p.is_active,
//         image_url: p.image || null,
//   is_active: p.available ?? true,
//       }
//       return acc
//     }, {})
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center gap-4">
//         <Link 
//           href="/admin/orders"
//           className="p-2 bg-white border border-stone-200 text-stone-600 rounded-xl hover:bg-stone-50 transition-colors"
//         >
//           <ArrowLeft className="w-5 h-5" />
//         </Link>
//         <div>
//           <h1 className="text-2xl font-bold text-stone-900">Order {order.order_number}</h1>
//           <p className="text-sm text-stone-500 mt-1">
//             Placed on {new Date(order.created_at).toLocaleString('en-IN', {
//               day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
//             })}
//           </p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
//         {/* Left Column: Details & Items */}
//         <div className="lg:col-span-2 space-y-6">
          
//           {/* Customer & Shipping Info */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white rounded-2xl shadow-sm border border-stone-200/60 p-6">
//               <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2 mb-4">
//                 <User className="w-5 h-5 text-stone-400" />
//                 Customer
//               </h3>
//               <div className="space-y-2 text-sm">
//                 <p className="font-medium text-stone-900">{order.profiles?.full_name || 'Guest'}</p>
//                 <p className="text-stone-600">{order.profiles?.email}</p>
//                 {order.profiles?.phone && <p className="text-stone-600">{order.profiles.phone}</p>}
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-sm border border-stone-200/60 p-6">
//               <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2 mb-4">
//                 <MapPin className="w-5 h-5 text-stone-400" />
//                 Shipping Address
//               </h3>
//               {order.addresses ? (
//                 <div className="space-y-1 text-sm text-stone-600">
//                   <p className="font-medium text-stone-900 mb-1">{order.addresses.full_name}</p>
//                   <p>{order.addresses.address_line_1}</p>
//                   <p>{order.addresses.city}, {order.addresses.state} {order.addresses.postal_code}</p>
//                   <p className="mt-2 pt-2 border-t border-stone-100">Phone: {order.addresses.phone}</p>
//                   {order.addresses.alternate_phone && (
//                     <p>Alternate: {order.addresses.alternate_phone}</p>
//                   )}
//                 </div>
//               ) : (
//                 <p className="text-sm text-stone-500 italic">No address details available.</p>
//               )}
//             </div>
//           </div>

//           {/* Order Items */}
//           <div className="bg-white rounded-2xl shadow-sm border border-stone-200/60 overflow-hidden">
//             <div className="p-6 border-b border-stone-200/60 flex items-center gap-2">
//               <Package className="w-5 h-5 text-stone-400" />
//               <h3 className="text-lg font-bold text-stone-900">Order Items</h3>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="w-full text-left text-sm whitespace-nowrap">
//                 <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider text-xs">
//                   <tr>
//                     <th className="px-6 py-4 font-semibold">Product</th>
//                     <th className="px-6 py-4 font-semibold">Variant</th>
//                     <th className="px-6 py-4 font-semibold">Product ID</th>
//                     <th className="px-6 py-4 font-semibold">Unit Price</th>
//                     <th className="px-6 py-4 font-semibold">Qty</th>
//                     <th className="px-6 py-4 font-semibold text-right">Total</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-stone-100">
//                   {order.order_items?.map((item: any) => {
//                     const product = item.id || item.product_id ? productsById[item.id || item.product_id] : null
//                     const href = product?.is_active ? `/shop/${item.id || item.product_id}` : null

//                     const thumbnail = (
//                       <div className="relative w-12 h-14 rounded-lg overflow-hidden shrink-0 border border-stone-200 bg-stone-100">
//                         {product?.image_url ? (
//                           <Image src={product.image_url} alt={item.name } fill className="object-cover" />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center text-stone-300 text-[10px] font-medium">
//                             IMG
//                           </div>
//                         )}
//                       </div>
//                     )

//                     return (
//                       <tr key={item.id} className="hover:bg-stone-50/50 transition-colors">
//                         <td className="px-6 py-4">
//                           {href ? (
//                             <Link href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
//                               {thumbnail}
//                               <span className="font-medium text-stone-900 group-hover:text-orange-600 transition-colors">
//                                 {item.name }
//                               </span>
//                             </Link>
//                           ) : (
//                             <div className="flex items-center gap-3">
//                               {thumbnail}
//                               <div>
//                                 <span className="font-medium text-stone-900">{item.name }</span>
//                                 <span className="block text-[11px] text-stone-400 font-medium">
//                                   {product ? 'Inactive — not viewable on site' : 'Product no longer available'}
//                                 </span>
//                               </div>
//                             </div>
//                           )}
//                         </td>
//                         <td className="px-6 py-4 text-stone-600">{item.variant_name}</td>
//                         <td className="px-6 py-4 text-stone-400 text-xs">{item.id || item.product_id || '—'}</td>
//                         <td className="px-6 py-4 text-stone-600">₹{item.price || item.price_at_purchase}</td>
//                         <td className="px-6 py-4 text-stone-600">{item.quantity}</td>
//                         <td className="px-6 py-4 font-medium text-stone-900 text-right">₹{((item.price || item.price_at_purchase || 0) * (item.quantity || 1))}</td>
//                       </tr>
//                     )
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//         </div>

//         {/* Right Column: Status & Summary */}
//         <div className="space-y-6">
          
//           <OrderStatusManager 
//             orderId={order.id} 
//             initialOrderStatus={order.order_status}
//             initialPaymentStatus={order.payment_status}
//           />

//           <div className="bg-white rounded-2xl shadow-sm border border-stone-200/60 p-6">
//             <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2 mb-6">
//               <CreditCard className="w-5 h-5 text-stone-400" />
//               Payment Summary
//             </h3>
            
//             <div className="space-y-3 text-sm">
//               <div className="flex justify-between text-stone-600">
//                 <span>Subtotal</span>
//                 <span className="font-medium text-stone-900">₹{order.subtotal}</span>
//               </div>
//               <div className="flex justify-between text-stone-600">
//                 <span>Shipping</span>
//                 {order.shipping_cost === 0 ? (
//                   <span className="font-medium text-green-600">Free</span>
//                 ) : (
//                   <span className="font-medium text-stone-900">₹{order.shipping_cost}</span>
//                 )}
//               </div>
//               <div className="pt-3 border-t border-stone-200 flex justify-between items-center">
//                 <span className="font-bold text-stone-900">Total</span>
//                 <span className="text-xl font-bold text-orange-600">₹{order.total_amount}</span>
//               </div>
//             </div>

//             <div className="mt-6 pt-6 border-t border-stone-200">
//               <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Payment Method</p>
//               <p className="text-sm font-medium text-stone-900">{order.payment_method}</p>
//             </div>
//           </div>

//           {/* Timeline Section */}
//           <div className="bg-white rounded-2xl shadow-sm border border-stone-200/60 p-6">
//             <h3 className="text-lg font-bold text-stone-900 mb-6">Timeline</h3>
//             <div className="space-y-4 text-sm">
//               <div className="flex justify-between">
//                 <span className="text-stone-500">Order Placed</span>
//                 <span className="font-medium text-stone-900">
//                   {new Date(order.created_at).toLocaleString('en-IN', {
//                     day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
//                   })}
//                 </span>
//               </div>
//               {order.paid_at && (
//                 <div className="flex justify-between">
//                   <span className="text-stone-500">Paid</span>
//                   <span className="font-medium text-stone-900">
//                     {new Date(order.paid_at).toLocaleString('en-IN', {
//                       day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
//                     })}
//                   </span>
//                 </div>
//               )}
//               {order.shipped_at && (
//                 <div className="flex justify-between">
//                   <span className="text-stone-500">Shipped</span>
//                   <span className="font-medium text-stone-900">
//                     {new Date(order.shipped_at).toLocaleString('en-IN', {
//                       day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
//                     })}
//                   </span>
//                 </div>
//               )}
//               {order.delivered_at && (
//                 <div className="flex justify-between">
//                   <span className="text-stone-500">Delivered</span>
//                   <span className="font-medium text-stone-900">
//                     {new Date(order.delivered_at).toLocaleString('en-IN', {
//                       day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
//                     })}
//                   </span>
//                 </div>
//               )}
//               {order.cancelled_at && (
//                 <div className="flex justify-between text-red-600">
//                   <span>Cancelled</span>
//                   <span className="font-medium">
//                     {new Date(order.cancelled_at).toLocaleString('en-IN', {
//                       day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
//                     })}
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, User, MapPin, Package, CreditCard } from 'lucide-react'
import { OrderStatusManager } from '../_components/OrderStatusManager'
import { createAdminClient } from '@/lib/supabase/admin'

export const metadata = {
  title: 'Order Details | Admin Dashboard',
}

export default async function AdminOrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const orderId = resolvedParams.id
  const supabase = await createAdminClient()

  // 1. ✅ SECURE SIMPLIFIED SELECT FETCH
  const { data: rawOrder, error: orderError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single()
  let parsedItems: any[] = []
try {
  const rawItemsData = rawOrder.items || rawOrder.order_items
  if (rawItemsData) {
    parsedItems = typeof rawItemsData === 'string' 
      ? JSON.parse(rawItemsData) 
      : rawItemsData
  }
} catch (parseError) {
  console.error('Failed parsing items array JSON block:', parseError)
}
  if (orderError) {
    console.error('Failed to load order', orderId, orderError)
  }
  if (!rawOrder) {
    notFound()
  }

  // 2. 🌟 DATA MAPPING BRIDGE: Trims down structural joins and injects your real columns
  const order = {
    ...rawOrder,
    total_amount: rawOrder.total ?? rawOrder.total_amount ?? 0,
    shipping_cost: rawOrder.shipping_fee ?? rawOrder.shipping_cost ?? 0,
    order_status: rawOrder.status ?? rawOrder.order_status ?? 'pending',
    payment_status: rawOrder.payment_status ?? 'pending',
    order_items: parsedItems,
    profiles: {
      full_name: rawOrder.customer_name || 'Guest Buyer',
      email: rawOrder.customer_email || 'guest@boujeebazaar.in',
      phone: rawOrder.customer_phone || ''
    },
    // We map your single 'shipping_address' column into the exact object format the remaining UI expects!
    addresses: rawOrder.shipping_address ? {
      full_name: rawOrder.customer_name || 'Guest Buyer',
      address_line_1: rawOrder.shipping_address,
      city: '',
      state: '',
      postal_code: '',
      phone: rawOrder.customer_phone || ''
    } : null
  }

  // 3. SECURE INDEPENDENT PRODUCT LOOKUP FETCH
  const productIds = Array.from(new Set((order.order_items || []).map((item: any) => item.id || item.id || item.product_id).filter(Boolean)))
  let productsById: Record<string, { image_url: string; is_active: boolean }> = {}
  
  if (productIds.length > 0) {
    const { data: productsData } = await supabase
      .from('products')
      .select('id, available, image') // Maps your real columns from features list
      .in('id', productIds)

    productsById = (productsData || []).reduce((acc: any, p: any) => {
      acc[p.id] = {
        image_url: p.image || '/assets/img/placeholder.jpeg',
        is_active: p.available ?? true,
      }
      return acc
    }, {})
  }

  return (
    <div className="space-y-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Header Layout Banner Toolbar */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/orders"
          className="p-2 bg-white border border-stone-200 text-stone-600 rounded-xl hover:bg-stone-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-stone-900" style={{ fontFamily: 'Playfair Display, serif' }}>
            Order {order.order_number}
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Placed on {new Date(order.created_at).toLocaleString('en-IN', {
              day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
            })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details & Items */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Customer & Shipping Summary Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-stone-200/60 p-6">
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                <User className="w-5 h-5 text-stone-400" />
                Customer
              </h3>
              <div className="space-y-2 text-sm">
                <p className="font-medium text-stone-900">{order.profiles.full_name}</p>
                <p className="text-stone-600">{order.profiles.email}</p>
                {order.profiles.phone && <p className="text-stone-600">Phone: {order.profiles.phone}</p>}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200/60 p-6">
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                <MapPin className="w-5 h-5 text-stone-400" />
                Shipping Address
              </h3>
              {order.addresses ? (
                <div className="space-y-1 text-sm text-stone-600">
                  <p className="font-medium text-stone-900 mb-1">{order.addresses.full_name}</p>
                  <p className="leading-relaxed">{order.addresses.address_line_1}</p>
                  <p className="mt-2 pt-2 border-t border-stone-100">Contact: {order.addresses.phone}</p>
                </div>
              ) : (
                <p className="text-sm text-stone-500 italic">No address details available.</p>
              )}
            </div>
          </div>

          {/* Order Items Table Presentation Area */}
          <div className="bg-white rounded-2xl border border-stone-200/60 overflow-hidden shadow-xs">
            <div className="p-6 border-b border-stone-200/60 flex items-center gap-2">
              <Package className="w-5 h-5 text-stone-400" />
              <h3 className="text-lg font-bold text-stone-900" style={{ fontFamily: 'Playfair Display, serif' }}>Order Items</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider text-xs">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Product</th>
                    <th className="px-6 py-4 font-semibold">Variant</th>
                    <th className="px-6 py-4 font-semibold">Product ID</th>
                    <th className="px-6 py-4 font-semibold">Unit Price</th>
                    <th className="px-6 py-4 font-semibold">Qty</th>
                    <th className="px-6 py-4 font-semibold text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {(order.order_items || []).map((item: any) => {
                    const product = item.id || item.product_id ? productsById[item.id || item.product_id] : null
                    const href = product?.is_active ? `/shop/${item.id || item.product_id}` : null
                    const thumbnail = (
                      <div className="relative w-12 h-14 rounded-lg overflow-hidden shrink-0 border border-stone-200 bg-stone-100">
                        {product?.image_url ? (
                          <img src={product.image_url} alt={item.name } style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone-300 text-[10px] font-medium">IMG</div>
                        )}
                      </div>
                    )
                    return (
                      <tr key={item.id} className="hover:bg-stone-50/50 transition-colors">
                        <td className="px-6 py-4">
                          {href ? (
                            <Link href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                              {thumbnail}
                              <span className="font-medium text-stone-900 group-hover:text-stone-900 font-semibold transition-colors">
                                {item.name }
                              </span>
                            </Link>
                          ) : (
                            <div className="flex items-center gap-3">
                              {thumbnail}
                              <div>
                                <span className="font-medium text-stone-900">{item.name }</span>
                                <span className="block text-[11px] text-stone-400 font-medium">
                                  {product ? 'Inactive — not viewable' : 'Product no longer available'}
                                </span>
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-stone-600">{item.variant_name || 'Standard'}</td>
                        <td className="px-6 py-4 text-stone-400 text-xs">{item.id || item.product_id || '—'}</td>
                        <td className="px-6 py-4 text-stone-600">₹{(item.price || item.price_at_purchase || 0).toLocaleString('en-IN')}</td>
                        <td className="px-6 py-4 text-stone-600">{item.quantity}</td>
                        <td className="px-6 py-4 font-medium text-stone-900 text-right">₹{(((item.price || item.price_at_purchase || 0) * (item.quantity || 1)) || 0).toLocaleString('en-IN')}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Status Controls & Financial Summaries */}
        <div className="space-y-6">
          <OrderStatusManager
            orderId={order.id}
            initialOrderStatus={order.order_status || 'pending'}
            initialPaymentStatus={order.payment_status || 'pending'}
          />
          
          <div className="bg-white rounded-2xl border border-stone-200/60 p-6">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              <CreditCard className="w-5 h-5 text-stone-400" />
              Payment Summary
            </h3>
            
            <div className="space-y-3 text-sm">
                          <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-medium text-stone-900">₹{(order.subtotal || 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                {order.shipping_cost === 0 ? (
                  <span className="font-medium uppercase text-xs font-bold" style={{ color: '#c5a880' }}>Free</span>
                ) : (
                  <span className="font-medium text-stone-900">₹{order.shipping_cost}</span>
                )}
              </div>
              <div className="pt-3 border-t border-stone-200 flex justify-between items-center">
                <span className="font-bold text-stone-900">Total Amount</span>
                <span className="text-xl font-bold text-neutral-950">₹{(order.total_amount || 0).toLocaleString('en-IN')}</span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-stone-200 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Order Number</span>
                <span className="font-mono font-bold text-stone-900 bg-stone-100 px-2.5 py-1 rounded-lg text-xs border border-stone-200">{order.order_number}</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Payment Method</p>
                <p className="text-sm font-medium text-stone-900">{order.payment_method || 'Cash on Delivery'}</p>
              </div>
              {order.notes && (
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700">
                  <p className="font-semibold text-stone-500 uppercase text-[10px] tracking-wider mb-0.5">Online Txn Details</p>
                  <p className="font-mono text-xs text-stone-800 font-semibold">{order.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Timeline Historical Meta Triggers Panel */}
          <div className="bg-white rounded-2xl border border-stone-200/60 p-6">
            <h3 className="text-lg font-bold text-stone-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Timeline</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-500">Order Initialized</span>
                <span className="font-medium text-stone-900">
                  {order.created_at ? new Date(order.created_at).toLocaleString('en-IN', {
                    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                  }) : '--'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

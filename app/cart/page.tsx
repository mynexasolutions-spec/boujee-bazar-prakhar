'use client'

import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { getShippingSettings } from '@/actions/admin/shipping'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart()
  const { showToast } = useToast()
  const [shipping, setShipping] = useState<any>({
    flat_rate: 99,
    free_threshold: 1999,
    cod_charge: 50,
    online_discount: 0
  })

  useEffect(() => {
    getShippingSettings()
      .then((data) => setShipping(data))
      .catch((err) => console.error("Error loading cart shipping settings:", err))
  }, [])

  const flatRate = shipping?.flat_rate ?? 99
  const freeThreshold = shipping?.free_threshold ?? 1999
  const codCharge = shipping?.cod_charge ?? 50
  const onlineDiscount = shipping?.online_discount ?? 0

  const isFreeShipping = cartTotal >= freeThreshold
  const shippingCost = isFreeShipping ? 0 : flatRate
  const finalTotal = cartTotal + shippingCost

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50/50 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="eyebrow justify-center inline-flex items-center gap-2 text-[#c5a880] uppercase tracking-widest text-xs font-semibold">
              <span className="h-px w-6 bg-[#c5a880]/50" />
              Your Bag
              <span className="h-px w-6 bg-[#c5a880]/50" />
            </div>
            <h1 className="text-4xl font-display font-bold text-neutral-900 mt-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              Shopping Cart
            </h1>
            <p className="mt-2 text-neutral-500 text-sm">
              Review your minimal luxury jewelry pieces before checking out.
            </p>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[32px] border border-neutral-100 max-w-xl mx-auto shadow-sm">
              <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[#c5a880]">
                <i className="fa-solid fa-bag-shopping text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-neutral-800">Your cart is empty</h3>
              <p className="text-neutral-400 text-sm mt-1 max-w-xs mx-auto">
                Explore our catalog and add your favourite pieces to your bag.
              </p>
              <Link href="/shop" className="mt-6 inline-block bg-neutral-900 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-neutral-800 transition-colors">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Cart Items List */}
              <div className="lg:col-span-8 space-y-4">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="flex gap-4 p-4 rounded-2xl border border-neutral-100 bg-white shadow-sm hover:shadow-md transition-all relative">
                    <div className="relative w-20 h-24 rounded-xl overflow-hidden shrink-0 border border-neutral-100">
                      <Image
                        src={item.image_url || '/assets/img/placeholder.jpeg'}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div>
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="font-semibold text-neutral-800 text-[15px] leading-snug line-clamp-2">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => {
                              removeFromCart(item.cartItemId)
                              showToast('Item removed from cart', 'info')
                            }}
                            className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                            title="Remove item"
                          >
                            <i className="fa-regular fa-trash-can text-sm"></i>
                          </button>
                        </div>
                        <p className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold mt-1">
                          {item.category_name || 'Jewelry'} {item.variant_name && `• Size: ${item.variant_name}`}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-neutral-200 bg-white rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="px-2.5 py-1 text-neutral-500 hover:text-neutral-900 transition-colors text-sm"
                          >
                            <i className="fa-solid fa-minus text-xs"></i>
                          </button>
                          <span className="px-2 text-xs font-semibold text-neutral-850 min-w-[20px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="px-2.5 py-1 text-neutral-500 hover:text-neutral-900 transition-colors text-sm"
                          >
                            <i className="fa-solid fa-plus text-xs"></i>
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-display font-bold text-[#c5a880] text-sm md:text-base">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-neutral-900" style={{ fontFamily: 'Playfair Display, serif' }}>Order Summary</h3>
                
                <div className="space-y-3.5 text-sm text-neutral-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-neutral-950">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Shipping</span>
                    <span className="font-semibold text-neutral-950">
                      {isFreeShipping ? (
                        <span className="text-green-600 font-semibold uppercase tracking-wider text-xs">Free</span>
                      ) : (
                        `₹${flatRate}`
                      )}
                    </span>
                  </div>

                  {!isFreeShipping && (
                    <div className="p-3 bg-neutral-50 rounded-xl text-xs text-neutral-500 flex items-start gap-2">
                      <i className="fa-solid fa-circle-info text-neutral-400 mt-0.5"></i>
                      <span>Add ₹{(freeThreshold - cartTotal).toLocaleString('en-IN')} more to unlock free shipping!</span>
                    </div>
                  )}

                  {onlineDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Online payment discount</span>
                      <span>-{onlineDiscount}%</span>
                    </div>
                  )}
                  
                  <div className="border-t border-neutral-100 my-4 pt-4 flex justify-between items-baseline">
                    <span className="text-base font-semibold text-neutral-900">Total</span>
                    <div className="text-right">
                      <span className="font-display font-bold text-xl text-neutral-950">
                        ₹{finalTotal.toLocaleString('en-IN')}
                      </span>
                      <p className="text-[11px] text-neutral-400 mt-0.5">Inclusive of all taxes</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/checkout"
                    className="w-full block text-center py-4 !bg-[#DCB980] !text-black font-semibold rounded-full shadow-md hover:bg-[#c9a46a] transition-all flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout <i className="fa-solid fa-arrow-right text-xs"></i>
                  </Link>
                  
                  <Link
                    href="/shop"
                    className="w-full block text-center py-3 text-xs text-neutral-500 hover:text-neutral-900 font-semibold transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}

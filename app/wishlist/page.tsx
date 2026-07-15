'use client'

import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { useWishlist } from '@/context/WishlistContext'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { showToast } = useToast()

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image_url: item.image_url,
      category_name: item.category_name || 'Jewelry'
    })
    showToast(`${item.name} added to cart!`, 'success')
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="eyebrow justify-center inline-flex items-center gap-2 text-[#c5a880] uppercase tracking-widest text-xs font-semibold">
              <span className="h-px w-6 bg-[#c5a880]/50" />
              Your Curation
              <span className="h-px w-6 bg-[#c5a880]/50" />
            </div>
            <h1 className="text-4xl font-display font-bold text-neutral-900 mt-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              My Wishlist
            </h1>
            <p className="mt-2 text-neutral-500 text-sm">
              Keep track of your favorite anti-tarnish, waterproof jewelry pieces.
            </p>
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-20 bg-neutral-50 rounded-[32px] border border-neutral-100 max-w-xl mx-auto">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6 text-[#c5a880]">
                <i className="fa-regular fa-heart text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-neutral-800">Your wishlist is empty</h3>
              <p className="text-neutral-400 text-sm mt-1 max-w-xs mx-auto">
                Explore our catalog and save your must-have minimal luxury pieces.
              </p>
              <Link href="/shop" className="mt-6 inline-block bg-neutral-900 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-neutral-800 transition-colors">
                Explore Shop
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {wishlist.map((item) => (
                <div key={item.id} className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-md transition-all flex flex-col relative">
                  
                  {/* Remove Button */}
                  <button 
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-neutral-500 hover:text-red-500 shadow-sm transition-all"
                    title="Remove from wishlist"
                  >
                    <i className="fa-solid fa-xmark text-sm"></i>
                  </button>

                  <Link href={`/shop/${item.id}`} className="relative aspect-[4/5] overflow-hidden block bg-neutral-50">
                    <Image
                      src={item.image_url || '/assets/img/placeholder.jpeg'}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 280px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex-1">
                      <Link href={`/shop/${item.id}`} className="hover:text-[#c5a880] transition-colors">
                        <h3 className="font-semibold text-neutral-800 text-[14px] leading-snug line-clamp-2">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-[11px] text-neutral-400 mt-1 uppercase tracking-wider">{item.category_name || 'Jewelry'}</p>
                    </div>

                    <div className="mt-2 flex items-center gap-2 mb-4">
                      <span className="font-bold text-neutral-900 text-sm">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full text-center rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold py-3 transition-colors flex items-center justify-center gap-2"
                    >
                      <i className="fa-solid fa-bag-shopping"></i> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}

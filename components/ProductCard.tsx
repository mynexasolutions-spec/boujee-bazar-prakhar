'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useWishlist } from '@/context/WishlistContext'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'

interface ProductCardProps {
  id?: string
  image: string
  name: string
  price: number
  rating?: number
  reviewCount?: number
  alt?: string
  originalPrice?: number
  badge?: string
  category_name?: string
  colorCount?: number
}

export default function ProductCard({
  id = 'default',
  image,
  name,
  price,
  rating = 5,
  reviewCount = 0,
  alt = name,
  originalPrice,
  badge,
  category_name = "Jewelry",
  colorCount
}: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { showToast } = useToast()
  
  const favorited = isInWishlist(id)

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist({
      id,
      name,
      price,
      image_url: image
    })
    showToast(favorited ? `Removed ${name} from wishlist.` : `Saved ${name} to wishlist!`, 'success')
  }

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addToCart({
      id,
      name,
      price,
      image_url: image,
      category_name: category_name
    });

    if (typeof window !== 'undefined') {
      const currentItem = {
        id,
        cartItemId: id + '-init',
        name,
        price,
        image: image,
        quantity: 1,
        category_name: category_name
      };

      const encodedData = encodeURIComponent(JSON.stringify([currentItem]));
      document.cookie = `boujee-cart-token=${encodedData}; path=/; max-age=604800;`;
      
      localStorage.setItem('cart', JSON.stringify([currentItem]));
      localStorage.setItem('gulshan-cart', JSON.stringify([currentItem]));
      localStorage.setItem('boujee-cart', JSON.stringify([currentItem]));
    }

    window.location.href = '/checkout';
  }

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-neutral-100 flex flex-col transition-all duration-300 relative">
      
      {/* Wishlist Heart Icon Toggle Button */}
      <button 
        onClick={handleWishlistToggle}
        className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-neutral-600 shadow-sm transition-all"
        title="Save to wishlist"
      >
        <i className={`fa-heart text-sm ${favorited ? "fa-solid text-red-500 animate-heartbeat" : "fa-regular"}`}></i>
      </button>

      {/* Media Frame Asset Anchor */}
      <Link href={`/shop/${id}`} className="relative aspect-[4/5] overflow-hidden block bg-neutral-50">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 50vw, 320px"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {badge && (
          <span className="absolute top-3 left-3 bg-neutral-900 text-white text-[9px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-md shadow-sm">
            {badge}
          </span>
        )}
        <span className="absolute bottom-3 right-3 bg-[#f5a24a] text-white backdrop-blur-xs text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-md shadow-md">
          {category_name}
        </span>
      </Link>

      {/* Meta Info Frame Content Footer Block */}
      <div className="p-3 flex flex-col flex-1 bg-white">
        <div className="flex-1">
          <Link href={`/shop/${id}`} className="hover:text-neutral-600 transition-colors">
            <h3 className="text-sm font-semibold text-neutral-800 line-clamp-2 leading-snug">
              {name}
            </h3>
          </Link>
          {colorCount && colorCount > 1 && (
            <p className="mt-1 text-[11px] font-medium text-[#c5a880]">
              {colorCount} tones available
            </p>
          )}
        </div>

        {/* Price Row Display element */}
        <div className="mt-3 flex items-baseline gap-1.5">
          <span className="text-sm font-bold text-neutral-900">
            ₹{price.toLocaleString('en-IN')}
          </span>
          {originalPrice && (
            <span className="text-[11px] text-neutral-400 line-through">
              ₹{originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Buy Now layout buttons */}
        <div className="mt-3 space-y-2">
          <button
            onClick={handleAddToCart}
            className="w-full text-center rounded-xl bg-neutral-900 text-white text-xs font-semibold py-2.5 hover:bg-neutral-800 transition-colors flex items-center justify-center shadow-xs"
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  )
}

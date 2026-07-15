'use client'

import React from 'react'
import Link from 'next/link'
import { useWishlist } from '@/context/WishlistContext'
import { useToast } from '@/context/ToastContext'

interface ProductCardProps {
  id?: string
  image: string
  name: string
  price: number
  rating: number
  reviewCount: number
  alt?: string
}

export default function ProductCard({
  id = 'default',
  image,
  name,
  price,
  rating,
  reviewCount,
  alt = name,
}: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlist()
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

  const renderStars = () => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fa-${i < Math.floor(rating) ? 'solid' : 'regular'} fa-star`}
          style={{ color: i < Math.floor(rating) ? '#FFD700' : '#ccc', marginRight: '2px' }}
        ></i>
      )
    }
    return stars
  }

  return (
    <div className="product-card relative">
      {/* Product Image Wrapper */}
      <Link href={`/shop/${id}`} className="block">
        <div className="product-img-wrapper">
          <img src={image} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <button 
            className="wishlist-btn"
            onClick={handleWishlistToggle}
            aria-label="Add to wishlist"
            style={{ zIndex: 10 }}
          >
            <i className={`fa-heart ${favorited ? 'fa-solid text-red-500' : 'fa-regular'}`} style={{ color: favorited ? '#ef4444' : '' }}></i>
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="product-info">
        <Link href={`/shop/${id}`} className="hover:text-[#c5a880] transition-colors">
          <h3 className="product-name">{name}</h3>
        </Link>
        <p className="product-price">₹{price.toLocaleString('en-IN')}</p>

        {/* Product Rating */}
        <div className="product-rating">
          {renderStars()}
          <span>({reviewCount})</span>
        </div>
      </div>
    </div>
  )
}

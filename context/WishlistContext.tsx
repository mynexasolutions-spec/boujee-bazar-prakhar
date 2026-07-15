'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type WishlistItem = {
  id: string
  name: string
  price: number
  image_url: string
  category_name?: string
}

type WishlistContextType = {
  wishlist: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string) => void
  toggleWishlist: (item: WishlistItem) => void
  isInWishlist: (id: string) => boolean
  clearWishlist: () => void
  wishlistCount: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])

  // Load wishlist from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedWishlist = localStorage.getItem('boujee-wishlist')
      if (savedWishlist) {
        try {
          setWishlist(JSON.parse(savedWishlist))
        } catch (e) {
          console.error('Failed to load wishlist', e)
        }
      }
    }
  }, [])

  // Save wishlist to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('boujee-wishlist', JSON.stringify(wishlist))
    }
  }, [wishlist])

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev
      return [...prev, item]
    })
  }

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((i) => i.id !== id))
  }

  const toggleWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      const exists = prev.some((i) => i.id === item.id)
      if (exists) {
        return prev.filter((i) => i.id !== item.id)
      }
      return [...prev, item]
    })
  }

  const isInWishlist = (id: string) => {
    return wishlist.some((i) => i.id === id)
  }

  const clearWishlist = () => {
    setWishlist([])
  }

  const wishlistCount = wishlist.length

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

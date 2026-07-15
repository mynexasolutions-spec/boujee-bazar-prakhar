'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type Product = {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category?: string
  tag?: string
}

export default function RecentlyViewed({ currentProductId }: { currentProductId: string }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // 1. Get recently viewed list from localStorage
    const saved = localStorage.getItem('boujee-recently-viewed')
    let ids: string[] = saved ? JSON.parse(saved) : []

    // 2. Filter out current product
    const filteredIds = ids.filter(id => id !== currentProductId).slice(0, 4)

    // 3. Save current product as the first item for future visits
    const updatedIds = [currentProductId, ...ids.filter(id => id !== currentProductId)].slice(0, 8)
    localStorage.setItem('boujee-recently-viewed', JSON.stringify(updatedIds))

    if (filteredIds.length === 0) {
      setLoading(false)
      return
    }

    // 4. Fetch details of those products
    const fetchRecentlyViewed = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('products')
          .select('id, name, price, originalPrice, image, category, tag')
          .in('id', filteredIds)
          .eq('available', true)

        if (error) throw error

        if (data) {
          // Sort items back to match the order of filteredIds
          const sorted = filteredIds
            .map(id => data.find(p => p.id === id))
            .filter((p): p is Product => !!p)
          setProducts(sorted)
        }
      } catch (err) {
        console.error('Failed to fetch recently viewed products', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentlyViewed()
  }, [currentProductId])

  if (loading || products.length === 0) return null

  return (
    <div className="mt-16 pt-10 border-t border-neutral-100">
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="eyebrow justify-center inline-flex items-center gap-2 text-[#c5a880] uppercase tracking-widest text-xs font-semibold">
          <span className="h-px w-6 bg-[#c5a880]/50" />
          Based on your visits
          <span className="h-px w-6 bg-[#c5a880]/50" />
        </div>
        <h2 className="text-3xl font-display font-bold text-neutral-900 mt-3" style={{ fontFamily: 'Playfair Display, serif' }}>
          Recently Viewed
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-md transition-all flex flex-col">
            <Link href={`/shop/${p.id}`} className="relative aspect-[4/5] overflow-hidden block bg-neutral-50">
              <Image
                src={p.image || '/assets/img/placeholder.jpeg'}
                alt={p.name}
                fill
                sizes="(max-width: 768px) 50vw, 280px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {p.tag && (
                <span className="absolute top-3 left-3 bg-[#c5a880] text-white text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-sm">
                  {p.tag}
                </span>
              )}
            </Link>

            <div className="p-4 flex flex-col flex-1">
              <div className="flex-1">
                <Link href={`/shop/${p.id}`} className="hover:text-[#c5a880] transition-colors">
                  <h3 className="font-semibold text-neutral-800 text-[14px] leading-snug line-clamp-2">
                    {p.name}
                  </h3>
                </Link>
                <p className="text-[11px] text-neutral-400 mt-1 uppercase tracking-wider">{p.category || 'Jewelry'}</p>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <span className="font-bold text-neutral-900 text-sm">
                  ₹{p.price.toLocaleString('en-IN')}
                </span>
                {p.originalPrice && (
                  <span className="text-neutral-400 text-xs line-through">
                    ₹{p.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

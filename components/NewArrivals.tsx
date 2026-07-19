'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import ProductCard from './ProductCard'

interface Product {
  id: string
  name: string
  image: string
  price: number
  originalPrice?: number
  badge?: string
  category_name?: string
  colorCount?: number
  rating: number
  reviewCount: number
}

export default function NewArrivals({ products: dbProducts }: { products?: Product[] }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (dbProducts && dbProducts.length > 0) {
      setProducts(dbProducts)
      setLoading(false)
      return
    }

    const fetchNewArrivals = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('products')
          .select('id, name, price, originalPrice, image, tag')
          .eq('available', true)
          .limit(10)

        if (error) throw error

        if (data) {
          // Filter items with tag 'New' or custom mock new arrivals
          const filtered = data
            .filter((p: any) => p.tag?.toLowerCase() === 'new' || p.id.startsWith('n') || p.id === 'b2' || p.id === 'b3')
            .map((p: any) => ({
              id: p.id,
              name: p.name,
              image: p.image || '/assets/img/placeholder.jpeg',
              price: p.price,
              rating: 5.0,
              reviewCount: 30,
              badge: p.tag || 'New'
            }))
          
          if (filtered.length > 0) {
            setProducts(filtered.slice(0, 4))
          } else {
            // Mock fallback
            setProducts([
              {
                id: 'n1',
                name: 'Hypoallergenic Raw Textured Huggies',
                image: '/assets/img/demos_insta/demo_2.jpeg',
                price: 999,
                rating: 4.9,
                reviewCount: 21,
                badge: 'New'
              },
              {
                id: 'n2',
                name: 'Dainty Freshwater Pearl Link Bracelet',
                image: '/assets/img/demos_insta/demo_3.jpeg',
                price: 1599,
                rating: 5.0,
                reviewCount: 15,
                badge: 'Limited'
              },
              {
                id: 'n3',
                name: 'Sleek Tapered Roman Numeral Ring',
                image: '/assets/img/demos_insta/demo_4.jpeg',
                price: 1099,
                rating: 4.7,
                reviewCount: 18,
                badge: 'New'
              }
            ])
          }
        }
      } catch (err) {
        console.error('Failed to load new arrivals', err)
      } finally {
        setLoading(false)
      }
    }

    fetchNewArrivals()
  }, [])

  return (
    <section className="w-full py-16 md:py-20 bg-white overflow-hidden relative">
      <div className="w-full max-w-[1500px] mx-auto px-4 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center mb-12">
          <h2 className="text-[22px] md:text-[27px] font-[800] tracking-[2px] flex flex-wrap items-center justify-center gap-x-[10px] text-neutral-900 font-['Poppins'] uppercase text-center">
            NEW <span className="text-[#f5a24a] italic font-['Playfair_Display']">ARRIVALS</span> ✨
          </h2>
          <p className="mt-2 text-neutral-500 text-[14px] font-medium tracking-wide">Fresh pieces just landed, discover the latest trends.</p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Loading new arrivals...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 w-full">
          {products.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              rating={product.rating}
              reviewCount={product.reviewCount}
              originalPrice={product.originalPrice}
              category_name={product.category_name}
              badge={product.badge}
              colorCount={product.colorCount}
            />
          ))}
          </div>
        )}

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <a 
            href="/shop?filter=new-arrivals"
            className="px-8 py-3 bg-[#f5a24a] text-white font-bold text-[13px] tracking-widest uppercase hover:bg-[#e08e36] transition-colors shadow-md flex items-center justify-center rounded-sm" 
          >
            VIEW ALL
          </a>
        </div>
      </div>
    </section>
  )
}

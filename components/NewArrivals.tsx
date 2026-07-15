'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import ProductCard from './ProductCard'

interface Product {
  id: string
  name: string
  image: string
  price: number
  rating: number
  reviewCount: number
  badge?: string
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
    <section className="new-arrivals" style={{ padding: '60px 40px', margin: '20px 40px', background: '#faf8f5', borderRadius: '30px' }}>
      <div className="section-header" style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 className="section-title" style={{ margin: 0 }}>NEW ARRIVALS ✨</h2>
        <a href="/shop?filter=new-arrivals" className="view-all-link" style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--primary)' }}>
          VIEW ALL <i className="fa-solid fa-arrow-right"></i>
        </a>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading new arrivals...</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
          ))}
        </div>
      )}
    </section>
  )
}

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

export default function SaleSection({ products: dbProducts }: { products?: Product[] }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (dbProducts && dbProducts.length > 0) {
      setProducts(dbProducts)
      setLoading(false)
      return
    }

    const fetchSaleProducts = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('products')
          .select('id, name, price, originalPrice, image, tag')
          .eq('available', true)
          .limit(20)

        if (error) throw error

        if (data) {
          // Filter items where originalPrice exists and is greater than price, or tag is sale
          const filtered = data
            .filter((p: any) => (p.originalPrice && p.originalPrice > p.price) || p.tag?.toLowerCase() === 'sale')
            .map((p: any) => ({
              id: p.id,
              name: p.name,
              image: p.image || '/assets/img/placeholder.jpeg',
              price: p.price,
              rating: 5.0,
              reviewCount: 45,
              badge: p.tag || 'Sale'
            }))
          
          if (filtered.length > 0) {
            setProducts(filtered.slice(0, 4))
          } else {
            // Mock fallback
            setProducts([
              {
                id: 'b1',
                name: 'Minimalist Stackable Wave Band',
                image: '/assets/img/pr_1.jpeg',
                price: 1199,
                rating: 5.0,
                reviewCount: 128,
                badge: 'Sale'
              },
              {
                id: 'b2',
                name: 'Classic 18k Gold Plated Herringbone Choker',
                image: '/assets/img/pr_3.jpeg',
                price: 1499,
                rating: 4.9,
                reviewCount: 94,
                badge: 'Hot'
              },
              {
                id: 'b4',
                name: 'Anti-Tarnish Chunky Croissant Hoops',
                image: '/assets/img/slider_1.jpeg',
                price: 1299,
                rating: 4.8,
                reviewCount: 76,
                badge: 'Sale'
              }
            ])
          }
        }
      } catch (err) {
        console.error('Failed to load sale products', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSaleProducts()
  }, [])

  return (
    <section className="sale-section" style={{ padding: '60px 40px', margin: '20px 40px', background: '#fff', borderRadius: '30px' }}>
      <div className="section-header" style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 className="section-title" style={{ margin: 0 }}>SALE OFFERS ✨</h2>
        <a href="/shop?filter=sale" className="view-all-link" style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--primary)' }}>
          VIEW ALL <i className="fa-solid fa-arrow-right"></i>
        </a>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading sale offers...</p>
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

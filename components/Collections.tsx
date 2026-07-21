'use client'

import React, { useRef } from 'react'
import { useRouter } from 'next/navigation'

interface Category {
  id: string
  name: string
  image_url?: string
  image?: string
}

export default function Collections({
  categories = [],
}: {
  categories?: Category[]
}) {
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)

  // Fallback collections (used when database is empty)
  const fallbackCollections: Category[] = [
    {
      id: '1',
      name: 'Rings',
      image:
        'https://images.pexels.com/photos/177332/pexels-photo-177332.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '2',
      name: 'Earrings',
      image:
        'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '3',
      name: 'Necklaces',
      image:
        'https://images.pexels.com/photos/248077/pexels-photo-248077.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '4',
      name: 'Bracelets',
      image:
        'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '5',
      name: 'Anklets',
      image:
        'https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '6',
      name: 'Accessories',
      image:
        'https://images.pexels.com/photos/3310695/pexels-photo-3310695.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '7',
      name: 'Watches',
      image:
        'https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ]

  // Use database categories if available, otherwise fallback
  const collections =
    categories && categories.length > 0 ? categories : fallbackCollections

  const handleCollectionClick = (id: string) => {
    router.push(`/shop?category=${id}`)
  }

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -300,
      behavior: 'smooth',
    })
  }

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 300,
      behavior: 'smooth',
    })
  }

  // Floral mask
  const scallopedMask = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M 50 5 C 65 -5, 80 10, 85 20 C 100 20, 105 40, 95 50 C 105 60, 100 80, 85 80 C 80 90, 65 105, 50 95 C 35 105, 20 90, 15 80 C 0 80, -5 60, 5 50 C -5 40, 0 20, 15 20 C 20 10, 35 -5, 50 5 Z" /></svg>')`

  return (
    <section className="w-full py-16 md:py-20 bg-white overflow-hidden relative">
      <div className="w-full max-w-[1500px] mx-auto px-4 md:px-12">
        {/* Section Title */}
        <div className="flex flex-col items-center justify-center mb-12">
          <h2 className="text-[22px] md:text-[27px] font-[800] tracking-[2px] flex flex-wrap items-center justify-center gap-x-[10px] text-neutral-900 font-['Poppins'] uppercase text-center">
            SHOP BY{' '}
            <span className="text-[#f5a24a] italic font-['Playfair_Display']">
              COLLECTION
            </span>{' '}
            ✨
          </h2>
        </div>

        {/* Slider */}
        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-md border border-neutral-100 flex items-center justify-center text-neutral-600 hover:text-[#f5a24a] z-20 transition-colors"
            aria-label="Scroll left"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-md border border-neutral-100 flex items-center justify-center text-neutral-600 hover:text-[#f5a24a] z-20 transition-colors"
            aria-label="Scroll right"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-8 md:gap-14 items-center overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 px-4 md:px-12 w-full"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
              maskImage:
                'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            }}
          >
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {collections.map((collection) => (
              <div
                key={collection.id}
                className="relative w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] md:w-[200px] md:h-[200px] flex-shrink-0 cursor-pointer group snap-center"
                onClick={() => handleCollectionClick(collection.id)}
              >
                {/* Image */}
                <div
                  className="w-full h-full bg-neutral-100 transition-transform duration-500 group-hover:scale-105"
                  style={{
                    WebkitMaskImage: scallopedMask,
                    WebkitMaskSize: 'contain',
                    WebkitMaskPosition: 'center',
                    WebkitMaskRepeat: 'no-repeat',
                    maskImage: scallopedMask,
                    maskSize: 'contain',
                    maskPosition: 'center',
                    maskRepeat: 'no-repeat',
                  }}
                >
                  <img
                    src={
                      collection.image_url ||
                      collection.image ||
                      '/assets/img/placeholder.jpeg'
                    }
                    alt={collection.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Banner */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[28px] sm:h-[34px] md:h-[48px] bg-[#f5a24a]/90 flex items-center justify-center shadow-sm z-10 transition-transform duration-500 group-hover:scale-110">
                  <span
                    className="font-['Playfair_Display'] italic text-white text-[14px] sm:text-[16px] md:text-[24px] tracking-wide"
                    style={{
                      textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                    }}
                  >
                    {collection.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <button
            className="px-8 py-3 bg-[#f5a24a] text-white font-bold text-[13px] tracking-widest uppercase hover:bg-[#e08e36] transition-colors shadow-md flex items-center justify-center rounded-sm"
            onClick={() => router.push('/shop')}
          >
            VIEW ALL COLLECTIONS
          </button>
        </div>
      </div>
    </section>
  )
}
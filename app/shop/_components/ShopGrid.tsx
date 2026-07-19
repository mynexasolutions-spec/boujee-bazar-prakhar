'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useToast } from '@/context/ToastContext'
import { useRouter, useSearchParams } from 'next/navigation'

type Product = {
  id: string
  name: string
  price: number
  oldPrice?: number
  originalPrice?: number
  image_url: string
  category_id: string
  category_name?: string
  subcategory?: string
  badge?: string
  rating: number
  colorCount?: number
}

type Category = {
  id: string
  name: string
}

type ShopGridProps = {
  initialProducts: Product[]
  categories: Category[]
  selectedCategory: string
}

export default function ShopGrid({ initialProducts, categories, selectedCategory }: ShopGridProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    selectedCategory ? [selectedCategory.trim().toLowerCase()] : []
  )
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [maxPrice, setMaxPrice] = useState<number>(15000)
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { showToast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const filterParam = searchParams ? searchParams.get('filter') : null

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 16

  // Build a map of categories and their subcategories from the products list
  const categoryMap = useMemo(() => {
    const map: Record<string, { name: string, subcategories: Set<string> }> = {}
    
    // Initialize with categories from DB
    categories.forEach(c => {
      map[c.id.toLowerCase()] = { name: c.name, subcategories: new Set() }
    })
    
    // Populate subcategories from products
    initialProducts.forEach(p => {
      const catId = p.category_id?.trim().toLowerCase()
      const subcat = p.subcategory?.trim()
      if (catId) {
        if (!map[catId]) {
          map[catId] = { name: p.category_name || catId, subcategories: new Set() }
        }
        if (subcat) {
          map[catId].subcategories.add(subcat)
        }
      }
    })
    return map
  }, [initialProducts, categories])

  useEffect(() => {
    if (selectedCategory) {
      setSelectedCategories([selectedCategory.trim().toLowerCase()])
      // Auto-expand the selected category
      setExpandedCategories(prev => [...new Set([...prev, selectedCategory.trim().toLowerCase()])])
    } else {
      setSelectedCategories([])
    }
  }, [selectedCategory])

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategories, maxPrice, filterParam])

  const toggleCategory = (id: string) => {
    const targetId = id.trim().toLowerCase()
    setSelectedCategories(prev => 
      prev.includes(targetId) ? prev.filter(c => c !== targetId) : [...prev, targetId]
    )
  }

  const toggleAccordion = (id: string) => {
    const targetId = id.trim().toLowerCase()
    setExpandedCategories(prev => 
      prev.includes(targetId) ? prev.filter(c => c !== targetId) : [...prev, targetId]
    )
  }

  // Filter products by category, subcategory, type, and max price threshold safely
  const filteredProducts = initialProducts.filter(p => {
    const itemCatId = p.category_id?.trim().toLowerCase()
    const itemSubcat = p.subcategory?.trim().toLowerCase()

    // 1. Category / Subcategory Matching
    if (selectedCategories.length > 0) {
      // Check if product's category OR subcategory is in selectedCategories
      const isMatched = selectedCategories.some(
        (cat) => cat === itemCatId || cat === itemSubcat
      )
      if (!isMatched) return false
    }

    // 2. Filter Param Matching (New Arrivals, Best Sellers, Sale)
    if (filterParam) {
      const type = filterParam.toLowerCase()
      if (type === 'new-arrivals') {
        const isNew = p.badge?.toLowerCase() === 'new' || p.id.startsWith('n')
        if (!isNew) return false
      } else if (type === 'best-sellers' || type === 'bestsellers') {
        const isBest = p.badge?.toLowerCase() === 'bestseller' || p.badge?.toLowerCase() === 'hot' || p.id.startsWith('b')
        if (!isBest) return false
      } else if (type === 'sale') {
        const isSale = (p.originalPrice && p.originalPrice > p.price) || p.badge?.toLowerCase() === 'sale'
        if (!isSale) return false
      }
    }

    // 3. Price Threshold
    if (p.price > maxPrice) return false

    return true
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleWishlistToggle = (p: Product, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist({
      id: p.id,
      name: p.name,
      price: p.price,
      image_url: p.image_url,
      category_name: p.category_name
    })
    const saved = isInWishlist(p.id)
    showToast(saved ? `Removed ${p.name} from wishlist.` : `Saved ${p.name} to wishlist!`, 'success')
  }

  const FilterContent = (
    <div className="space-y-8">
      {/* Category Checkboxes & Accordion */}
      <div>
        <h3 className="font-display font-bold text-lg text-neutral-900 mb-4 border-b border-neutral-100 pb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
          Categories
        </h3>
        <div className="space-y-2">
          {Object.entries(categoryMap).map(([catId, catData]) => {
            const isChecked = selectedCategories.includes(catId)
            const isExpanded = expandedCategories.includes(catId)
            const hasSubcategories = catData.subcategories.size > 0

            return (
              <div key={catId} className="flex flex-col">
                <div className="flex items-center justify-between group">
                  <label className="flex items-center gap-3 cursor-pointer select-none py-1.5 flex-1">
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={isChecked}
                      onChange={() => toggleCategory(catId)}
                    />
                    <div 
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-all shadow-sm flex-shrink-0 ${
                        isChecked 
                          ? 'bg-neutral-900 border-neutral-900' 
                          : 'bg-white border-neutral-200 group-hover:border-neutral-900'
                      }`}
                    >
                      {isChecked && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-[15px] font-medium transition-colors line-clamp-1 ${isChecked ? 'text-neutral-900 font-semibold' : 'text-neutral-600 group-hover:text-neutral-900'}`}>
                      {catData.name}
                    </span>
                  </label>
                  
                  {hasSubcategories && (
                    <button 
                      onClick={() => toggleAccordion(catId)}
                      className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors"
                    >
                      <svg 
                        className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Subcategories */}
                {hasSubcategories && isExpanded && (
                  <div className="pl-8 pt-1 pb-2 space-y-2 border-l-2 border-neutral-100 ml-2.5 mt-1 animate-in slide-in-from-top-2 fade-in duration-200">
                    {Array.from(catData.subcategories).map(subcat => {
                      const subcatId = subcat.toLowerCase()
                      const isSubcatChecked = selectedCategories.includes(subcatId)
                      return (
                        <label key={subcat} className="flex items-center gap-3 cursor-pointer group select-none py-1">
                          <input 
                            type="checkbox" 
                            className="hidden" 
                            checked={isSubcatChecked}
                            onChange={() => toggleCategory(subcat)}
                          />
                          <div 
                            className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-all shadow-sm flex-shrink-0 ${
                              isSubcatChecked 
                                ? 'bg-neutral-800 border-neutral-800' 
                                : 'bg-white border-neutral-200 group-hover:border-neutral-800'
                            }`}
                          >
                            {isSubcatChecked && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className={`text-[14px] transition-colors ${isSubcatChecked ? 'text-neutral-900 font-semibold' : 'text-neutral-500 group-hover:text-neutral-900'}`}>
                            {subcat}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-4 border-b border-neutral-100 pb-3">
          <h3 className="font-display font-bold text-lg text-neutral-900" style={{ fontFamily: 'Playfair Display, serif' }}>Max Budget</h3>
          <span className="font-bold text-neutral-900">₹{maxPrice.toLocaleString('en-IN')}</span>
        </div>
        <input 
          type="range" 
          min="500" 
          max="15000" 
          step="100" 
          value={maxPrice} 
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full cursor-pointer accent-neutral-900"
        />
        <div className="flex justify-between text-[11px] text-neutral-400 mt-3 font-bold tracking-wider">
          <span>₹500</span>
          <span>₹15,000</span>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Filter Drawer Overlay Canvas */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[100] flex lg:hidden">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="relative mr-auto w-[85%] max-w-sm h-full bg-white p-6 overflow-y-auto flex flex-col shadow-2xl">
            <div className="flex items-center justify-between mb-8 border-b border-neutral-100 pb-4">
              <h2 className="font-display font-bold text-xl text-neutral-900" style={{ fontFamily: 'Playfair Display, serif' }}>Filters</h2>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 bg-neutral-50 rounded-full text-neutral-500 hover:bg-neutral-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            {FilterContent}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
        
        {/* Desktop Fixed Left Sidebar Filter Panel */}
        <div className="hidden lg:block lg:col-span-1 bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm h-fit sticky top-[100px] max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
          {FilterContent}
        </div>

        {/* Dynamic Jewelry Product Grid Canvas Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <p className="text-[15px] font-medium text-neutral-500">
              Showing <span className="text-neutral-900 font-bold">{filteredProducts.length}</span> pieces
            </p>
            {/* Mobile Filter Trigger Button */}
            <button 
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2 bg-neutral-900 text-white rounded-full text-sm font-semibold flex items-center gap-2 shadow-md hover:bg-neutral-800 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-neutral-400 bg-white rounded-2xl border border-neutral-100 shadow-sm">
              No luxury pieces match your current filter constraints.
            </div>
          ) : (
            <>
              {/* Changed from md:grid-cols-3 to xl:grid-cols-4 for larger screens */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {currentProducts.map((p) => {
                  const catName = p.category_name || (categories.find(c => c.id === p.category_id)?.name) || "Jewelry"
                  const itemStrikePrice = p.originalPrice || p.oldPrice
                  const favorited = isInWishlist(p.id)
                  
                  return (
                    <div key={p.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-neutral-100 flex flex-col transition-all duration-300 relative">
                      
                      {/* Wishlist Heart Icon Toggle Button */}
                      <button 
                        onClick={(e) => handleWishlistToggle(p, e)}
                        className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-neutral-600 shadow-sm transition-all"
                        title="Save to wishlist"
                      >
                        <i className={`fa-heart text-sm ${favorited ? "fa-solid text-red-500 animate-heartbeat" : "fa-regular"}`}></i>
                      </button>

                      {/* Media Frame Asset Anchor */}
                      <Link href={`/shop/${p.id}`} className="relative aspect-[4/5] overflow-hidden block bg-neutral-50">
                        <Image
                          src={p.image_url}
                          alt={p.name}
                          fill
                          sizes="(max-width: 768px) 50vw, 320px"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        {p.badge && (
                          <span className="absolute top-3 left-3 bg-neutral-900 text-white text-[9px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-md shadow-sm">
                            {p.badge}
                          </span>
                        )}
                        <span className="absolute bottom-3 right-3 bg-[#f5a24a] text-white backdrop-blur-xs text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-md shadow-md">
                          {catName}
                        </span>
                      </Link>

                      {/* Meta Info Frame Content Footer Block */}
                      <div className="p-3 flex flex-col flex-1 bg-white">
                        <div className="flex-1">
                          <Link href={`/shop/${p.id}`} className="hover:text-neutral-600 transition-colors">
                            <h3 className="text-sm font-semibold text-neutral-800 line-clamp-2 leading-snug">
                              {p.name}
                            </h3>
                          </Link>
                          {p.colorCount && p.colorCount > 1 && (
                            <p className="mt-1 text-[11px] font-medium text-[#c5a880]">
                              {p.colorCount} tones available
                            </p>
                          )}
                        </div>

                        {/* Price Row Display element */}
                        <div className="mt-3 flex items-baseline gap-1.5">
                          <span className="text-sm font-bold text-neutral-900">
                            ₹{p.price.toLocaleString('en-IN')}
                          </span>
                          {itemStrikePrice && (
                            <span className="text-[11px] text-neutral-400 line-through">
                              ₹{itemStrikePrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        {/* Buy Now layout buttons */}
                        <div className="mt-3 space-y-2">
                          <button
                            onClick={async () => {
                              addToCart({
                                id: p.id,
                                name: p.name,
                                price: p.price,
                                image_url: p.image_url,
                                category_name: catName
                              });

                              if (typeof window !== 'undefined') {
                                const currentItem = {
                                  id: p.id,
                                  cartItemId: p.id + '-init',
                                  name: p.name,
                                  price: p.price,
                                  image: p.image_url,
                                  quantity: 1,
                                  category_name: catName
                                };

                                const encodedData = encodeURIComponent(JSON.stringify([currentItem]));
                                document.cookie = `boujee-cart-token=${encodedData}; path=/; max-age=604800;`;
                                
                                localStorage.setItem('cart', JSON.stringify([currentItem]));
                                localStorage.setItem('gulshan-cart', JSON.stringify([currentItem]));
                                localStorage.setItem('boujee-cart', JSON.stringify([currentItem]));
                              }

                              window.location.href = '/checkout';
                            }}
                            className="w-full text-center rounded-xl bg-neutral-900 text-white text-xs font-semibold py-2.5 hover:bg-neutral-800 transition-colors flex items-center justify-center shadow-xs"
                          >
                            Buy now
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12 mb-4">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                          currentPage === page 
                            ? 'bg-neutral-900 text-white' 
                            : 'text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
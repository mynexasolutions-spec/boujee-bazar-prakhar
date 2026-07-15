import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductDetailActions from './_components/ProductDetailActions'
import ProductGallery from './_components/ProductGallery'
import ProductReviews from './_components/ProductReviews'
import RecentlyViewed from './_components/RecentlyViewed'
import Products from '@/components/Products'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { createClient } from "@/lib/supabase/server"

export const metadata = {
  title: 'Product Details | The Boujee Bazaar',
  description: 'Minimal, luxury, anti-tarnish jewelry designed to elevate your everyday statements.',
}

export default async function ProductDetailPage({ params }: { params: any }) {
  const supabase = await createClient();
  const { id } = await params;

  // 1. Fetch product with standard jewelry columns
  const { data: productData } = await supabase
    .from("products")
    .select(`
      id, 
      name, 
      price, 
      originalPrice,
      image,
      images,
      category,
      subcategory,
      description,
      sizes,
      colors,
      tag,
      available
    `)
    .eq("id", id)
    .single();

  if (!productData || !productData.available) notFound();

  // Compile image list
  let images: string[] = []
  if (productData.images) {
    if (Array.isArray(productData.images)) {
      images = productData.images
    } else if (typeof productData.images === 'string') {
      images = productData.images.split(',').map((img: string) => img.trim())
    }
  }
  if (images.length === 0 && productData.image) {
    images = [productData.image]
  }
  if (images.length === 0) {
    images = ['/assets/img/placeholder.jpeg']
  }

  // Build variants list from sizes if product_variants table is not used
  let variants: any[] = []
  if (productData.sizes) {
    const sizeList = typeof productData.sizes === 'string' 
      ? productData.sizes.split(',') 
      : Array.isArray(productData.sizes) ? productData.sizes : []
    
    variants = sizeList.map((size: string, idx: number) => ({
      id: `${productData.id}-${size.trim()}`,
      variant_name: size.trim(),
      price: productData.price,
      original_price: productData.originalPrice || null,
      stock_quantity: 20
    }))
  }

  // Fallback variant if none
  if (variants.length === 0) {
    variants = [{
      id: `${productData.id}-standard`,
      variant_name: 'Standard',
      price: productData.price,
      original_price: productData.originalPrice || null,
      stock_quantity: 20
    }]
  }

  // Fetch similar products
  const { data: similarProductsData } = await supabase
    .from("products")
    .select("id, name, price, originalPrice, image, category, tag")
    .eq("available", true)
    .eq("category", productData.category)
    .neq("id", productData.id)
    .limit(4);

  const similarProducts = (similarProductsData || []).map((p: any) => ({
    id: p.id,
    name: p.name,
    category_id: p.category?.toLowerCase() || 'jewelry',
    category_name: p.category || 'Jewelry',
    image_url: p.image || "/assets/img/placeholder.jpeg",
    price: p.price || 0,
    originalPrice: p.originalPrice || undefined,
    badge: p.tag || undefined,
    rating: 5.0,
    colorCount: p.colors ? p.colors.split(',').length : 1
  }));

  // Fetch Reviews (Fallback to empty)
  const reviews: any[] = [];

  const categoryName = productData.category || 'Jewelry';

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8">

          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium mb-8">
            <Link href="/" className="hover:text-[#c5a880] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/shop" className="hover:text-[#c5a880] transition-colors">Shop</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/shop?category=${productData.category?.toLowerCase()}`} className="hover:text-[#c5a880] transition-colors capitalize">
              {categoryName}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-neutral-900 font-semibold truncate max-w-[200px]">{productData.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: Product Image Gallery */}
            <ProductGallery images={images} productName={productData.name} badge={productData.tag} />

            {/* Right: Product Details & Purchase Form */}
            <div className="space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#c5a880] font-bold">
                  {categoryName} {productData.subcategory && `• ${productData.subcategory}`}
                </span>
                <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-neutral-900 mt-2 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {productData.name}
                </h1>
                
                <div className="mt-3 flex items-center gap-1.5 text-sm text-neutral-500">
                  <div className="flex text-[#c5a880]">★★★★★</div>
                  <span className="font-semibold text-neutral-800">5.0 ★</span>
                  <span className="text-neutral-200">|</span>
                  <span>Waterproof & Anti-Tarnish</span>
                </div>
              </div>

              {/* Purchase Actions client-side wrapper (includes dynamic price and Add to cart) */}
              <ProductDetailActions 
                product={{
                  id: productData.id,
                  name: productData.name,
                  image_url: images[0],
                  category_name: categoryName,
                  variants: variants
                }}
              />

              {productData.description && (
                <div className="font-body text-neutral-600 text-sm leading-relaxed pt-2">
                  <h3 className="font-semibold text-neutral-900 mb-2">Description</h3>
                  <p className="whitespace-pre-wrap">{productData.description}</p>
                </div>
              )}

              {/* Secure Checkout Trust Badge */}
              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Secure Payment Options</span>
                <div className="flex gap-3 text-neutral-400 text-xl">
                  <i className="fa-brands fa-cc-visa" title="Visa"></i>
                  <i className="fa-brands fa-cc-mastercard" title="Mastercard"></i>
                  <i className="fa-brands fa-cc-rupay" title="Rupay"></i>
                  <i className="fa-solid fa-credit-card" title="UPI & Net Banking"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <div className="mt-20 pt-10 border-t border-neutral-100">
              <div className="text-center max-w-xl mx-auto mb-10">
                <div className="eyebrow justify-center inline-flex items-center gap-2 text-[#c5a880] uppercase tracking-widest text-xs font-semibold">
                  <span className="h-px w-6 bg-[#c5a880]/50" />
                  Explore styles
                  <span className="h-px w-6 bg-[#c5a880]/50" />
                </div>
                <h2 className="text-3xl font-display font-bold text-neutral-900 mt-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                  You Might Also Like
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {similarProducts.map((p) => (
                  <div key={p.id} className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-md transition-all flex flex-col">
                    <Link href={`/shop/${p.id}`} className="relative aspect-[4/5] overflow-hidden block bg-neutral-50">
                      <Image
                        src={p.image_url}
                        alt={p.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 280px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex-1">
                        <Link href={`/shop/${p.id}`} className="hover:text-[#c5a880] transition-colors">
                          <h3 className="font-semibold text-neutral-800 text-[14px] leading-snug line-clamp-2">
                            {p.name}
                          </h3>
                        </Link>
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
          )}

          {/* Recently Viewed Products */}
          <RecentlyViewed currentProductId={productData.id} />

        </div>
      </main>
      <Footer />
    </>
  )
}

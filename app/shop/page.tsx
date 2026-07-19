// import Header from '@/components/Header'
// import Footer from '@/components/Footer'
// import ShopGrid from './_components/ShopGrid'
// import { createClient } from "@/lib/supabase/server";
// import Image from 'next/image'

// export const metadata = {
//   title: 'Shop Collection | Boujee Bazaar',
//   description: 'Browse our complete premium collection of modest necklaces, rings, earrings, bracelet etc.',
// }

// export default async function ShopPage({
//   searchParams,
// }: {
//   searchParams: { category?: string; search?: string; featured?: string }
// }) {
//   const supabase = await createClient();

//   const resolvedSearchParams = await searchParams;
//   const searchQuery = resolvedSearchParams.search || '';
//   const featuredOnly = resolvedSearchParams.featured === 'true';

//   let productsQuery = supabase
//     .from("products")
//      .select(`
//     id, 
//     name, 
//     price, 
//     originalPrice,  // 👈 Matches your database column from the image!
//     image,          // 👈 Main item image from your image!
//     category,
//     subcategory,
//     description,
//     sizes,
//     colors,
//     available
//   `)
//   .eq("available", true);
//     // .order('created_at', { ascending: false });

//   if (searchQuery) {
//     productsQuery = productsQuery.ilike('name', `%${searchQuery}%`);
//   }

//   if (featuredOnly) {
//     productsQuery = productsQuery.eq('is_featured', true);
//   }

//   const { data: productsData } = await productsQuery;

//   const { data: categoriesData } = await supabase
//     .from("categories")
//     .select("*")
//     .eq("is_active", true);

//   const colorGroupCounts = (productsData || []).reduce((acc: any, p: any) => {
//     if (p.color_group_id) acc[p.color_group_id] = (acc[p.color_group_id] || 0) + 1;
//     return acc;
//   }, {});

//   const products = (productsData || []).map((p: any) => ({
//     id: p.id,
//     name: p.name,
//     slug: p.slug,
//     category_id: p.category_id,
//     image_url: p.product_images?.[0]?.image_url || p.featured_image_url || "/image.png",
//     price: p.product_variants?.[0]?.price || p.price || 0,
//     originalPrice: p.product_variants?.[0]?.original_price || p.originalPrice || undefined,
//     // badge: p.badge,
//     rating: p.rating || 5,
//     colorCount: p.color_group_id ? colorGroupCounts[p.color_group_id] || 1 : 1,
//   }));

//   const categories = categoriesData || [];
//   const selectedCategory = resolvedSearchParams.category || ''

//   return (
//     <>
//       <Header />
//       <main className="min-h-screen bg-cream pt-[72px] md:pt-[84px]">
        
//         {/* Shop Hero Banner */}
//         <section className="relative w-full h-[250px] md:h-[340px] bg-emerald-deep flex items-center justify-center overflow-hidden border-b border-cream-line">
//           <Image
//             src="/assets/img/insta_img/insta_7.png"
//             alt="Boujee Bajaar Special Collection"
//             fill
//             className="object-cover opacity-80 mix-blend-luminosity"
//             priority
//           />
//           <div className="absolute inset-0 bg-gradient-to-tr from-ink/90 via-emerald-deep/60 to-ink/90" />
          
//           <div className="relative z-10 text-center px-5">
//             <div className="eyebrow justify-center inline-flex items-center gap-2 mb-3 text-gold-light">
//               <span className="h-px w-6 bg-gold" />
//               Complete Collection
//               <span className="h-px w-6 bg-gold" />
//             </div>
//             <h1 className="font-display font-bold text-3xl md:text-5xl text-cream tracking-wide">
//               Shop the Drop
//             </h1>
//             {/* <p className="mt-4 text-cream/70 font-body text-sm md:text-base max-w-lg mx-auto">
//               Timeless silhouettes designed with maximum drape, elegance, and comfort.
//             </p> */}
//           </div>
//         </section>

//         <div className="max-w-wrap mx-auto px-5 md:px-8 py-10 md:py-16">

//           <ShopGrid 
//             initialProducts={products} 
//             categories={categories} 
//             selectedCategory={selectedCategory} 
//           />

//         </div>
//       </main>
//       <Footer />
//     </>
//   )
// }
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ShopGrid from './_components/ShopGrid'
import { createClient } from "@/lib/supabase/server";
import Image from 'next/image'

export const metadata = {
  title: 'Shop Collection | The Boujee Bazaar',
  description: 'Browse our complete premium collection of anti-tarnish, waterproof necklaces, rings, earrings, bracelets etc.',
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: any // Using any for loose structural resolution compatibility with Next.js versions
}) {
  const supabase = await createClient();

  // Explicitly resolve searchParams safely
  const resolvedSearchParams = typeof searchParams?.then === 'function' ? await searchParams : searchParams;
  const searchQuery = resolvedSearchParams?.search || '';
  const featuredOnly = resolvedSearchParams?.featured === 'true';
  const selectedCategory = resolvedSearchParams?.category || '';

  // 1. QUERY LIVE CATALOG MATCHING YOUR EXACT JEWELRY COLUMNS
  let productsQuery = supabase
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
      available,
      created_at
    `)
    .eq("available", true);

  if (searchQuery) {
    productsQuery = productsQuery.ilike('name', `%${searchQuery}%`);
  }

  if (featuredOnly) {
    productsQuery = productsQuery.eq('is_featured', true);
  }

  const { data: productsData } = await productsQuery;

  // 2. FETCH ACTIVE CATEGORIES CORRESPONDING TO YOUR REAL SCHEMA FIELDS
  const { data: categoriesData } = await supabase
    .from("categories")
    .select("id, name, slug, image, description, sort_order")
    .order('sort_order', { ascending: true });

  // 3. ✅ MAP DATA UNIFORMLY UNTO YOUR BRAND NEW JEWELRY SHAPES
  const products = (productsData || []).map((p: any) => ({
    id: p.id,
    name: p.name,
    slug: p.id, // Bypasses missing slug strings with standard reference ids
    category_id: p.category?.trim().toLowerCase() || '',
    category_name: p.category || 'Jewelry',
    subcategory: p.subcategory?.trim().toLowerCase() || '',
    image_url: p.image || '/assets/img/placeholder.jpeg',
    price: p.price || 0,
    originalPrice: p.originalPrice || undefined,
    badge: p.tag || undefined, // Populates 'tag' into product grid tags badges
    rating: 5.0, // Fixed baseline aesthetic metric
    colorCount: Array.isArray(p.colors) 
  ? p.colors.length 
  : p.colors && typeof p.colors === 'string'
    ? p.colors.split(',').length
    : 1, // Counts color strings split by commas dynamically
  }));

  // Normalize categories parameters to keep child state tracking from breaking
  const categories = (categoriesData || []).map((c: any) => ({
    id: c.name.trim().toLowerCase(),
    name: c.name,
    image: c.image || '/assets/img/placeholder.jpeg',
    description: c.description || ''
  }));

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-[72px] md:pt-[84px]">
        
        {/* Luxury Shop Hero Banner Frame */}
        <section className="relative w-full h-[250px] md:h-[340px] flex items-center justify-center overflow-hidden border-b border-neutral-100 bg-neutral-900">
          <Image
            src="/assets/img/slider_1.jpeg" // Using a stronger image for banner
            alt="The Boujee Bazaar Premium Jewelry Collection"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60" />
          
          <div className="relative z-10 text-center px-5">
            <div className="eyebrow justify-center inline-flex items-center gap-2 mb-3 text-[#c5a880] uppercase tracking-widest text-xs font-semibold">
              <span className="h-px w-6 bg-[#c5a880]/50" />
              Minimal & Luxury Aesthetics
              <span className="h-px w-6 bg-[#c5a880]/50" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-6xl text-white tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>
              Shop the Drop
            </h1>
            <p className="mt-3 text-neutral-300 font-body text-xs md:text-sm max-w-md mx-auto leading-relaxed">
              Anti-tarnish • Waterproof • Hypoallergenic jewelry pieces engineered to shine every single day.
            </p>
          </div>
        </section>

        {/* Dynamic Interactive Filter Grid Workspace */}
        <div className="w-full px-5 md:px-10 py-10 md:py-16">
          <ShopGrid 
            initialProducts={products} 
            categories={categories} 
            selectedCategory={selectedCategory.trim().toLowerCase()} 
          />
        </div>
      </main>
      <Footer />
    </>
  )
}

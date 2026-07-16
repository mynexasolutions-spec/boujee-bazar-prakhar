// import Header from "@/components/Header";
// import Hero from "@/components/Hero";
// import TrustMarquee from "@/components/TrustMarquee";
// import Story from "@/components/Story";
// import Categories from "@/components/Categories";
// import Products from "@/components/Products";
// import LuxeSalwarKameez from "@/components/LuxeSalwarKameez";
// import WhyUs from "@/components/WhyUs";
// import BrandBanner from "@/components/BrandBanner";
// import Lookbook from "@/components/Lookbook";
// import Testimonials from "@/components/Testimonials";
// import Contact from "@/components/Contact";
// import Footer from "@/components/Footer";
// import FloatingWhatsApp from "@/components/FloatingWhatsApp";
// import PakistaniEditBanner from "@/components/PakistaniEditBanner";
// import { createClient } from "@/lib/supabase/server";

// export default async function Home() {
//   const supabase = await createClient();

//   // Fetch active hero slides
//   const { data: heroSlides } = await supabase
//     .from("hero_slides")
//     .select("*")
//     .eq("is_active", true)
//     .order("created_at", { ascending: false });

//   // Fetch active categories
//   const { data: categoriesData } = await supabase
//     .from("categories")
//     .select("*")
//     .eq("is_active", true);

//   // Fetch product counts per category, and color-group sizes for "N colors available" badges
//   const { data: allProducts } = await supabase
//     .from("products")
//     .select("category_id, color_group_id")
//     .eq("is_active", true);

//   const productCounts = (allProducts || []).reduce((acc: any, p: any) => {
//     acc[p.category_id] = (acc[p.category_id] || 0) + 1;
//     return acc;
//   }, {});

//   const colorGroupCounts = (allProducts || []).reduce((acc: any, p: any) => {
//     if (p.color_group_id) acc[p.color_group_id] = (acc[p.color_group_id] || 0) + 1;
//     return acc;
//   }, {});

//   const categories = (categoriesData || []).map((c: any) => ({
//     ...c,
//     count: `${productCounts[c.id] || 0} styles`
//   }));

//   // Fetch featured products (is_featured = true or just active)
//   // For now, let's fetch active products. If is_featured exists, filter by it.
//   const { data: products } = await supabase
//     .from("products")
//     .select(`
//       id, name, slug, category_id, is_featured, is_active, color_group_id,
//       product_images ( image_url ),
//       product_variants ( price, original_price )
//     `)
//     .eq("is_active", true)
//     .eq("is_featured", true)
//     .order("created_at", { ascending: false })
//     .limit(10);

//   // Format products for the frontend component
//   const formattedProducts = (products || []).map((p: any) => ({
//     id: p.id,
//     name: p.name,
//     category_id: p.category_id,
//     image_url: p.product_images?.[0]?.image_url || p.featured_image_url || "/image.png",
//     price: p.product_variants?.[0]?.price || p.price || 0,
//     originalPrice: p.product_variants?.[0]?.original_price || p.originalPrice || undefined,
//     badge: p.badge,
//     rating: p.rating || 5,
//     colorCount: p.color_group_id ? colorGroupCounts[p.color_group_id] || 1 : 1,
//   }));

//   // Fetch Luxe Salwar Kameez products for the dedicated homepage highlight
//   const { data: salwarKameezProducts } = await supabase
//     .from("products")
//     .select(`
//       id, name, price, originalPrice, badge, rating, featured_image_url, color_group_id,
//       product_images ( image_url ),
//       product_variants ( price, original_price )
//     `)
//     .eq("category_id", "salwar_kameez")
//     .eq("is_active", true)
//     .order("created_at", { ascending: false })
//     .limit(10);

//   const formattedSalwarKameez = (salwarKameezProducts || []).map((p: any) => ({
//     id: p.id,
//     name: p.name,
//     image_url: p.product_images?.[0]?.image_url || p.featured_image_url || "/image.png",
//     price: p.product_variants?.[0]?.price || p.price || 0,
//     originalPrice: p.product_variants?.[0]?.original_price || p.originalPrice || undefined,
//     badge: p.badge,
//     rating: p.rating || 5,
//     colorCount: p.color_group_id ? colorGroupCounts[p.color_group_id] || 1 : 1,
//   }));

//   return (
//     <main className="overflow-x-hidden">
//       <Header />
//       <Hero slides={heroSlides || []} />
//       <TrustMarquee />
//       <Categories categories={categories || []} />
//       <Products products={formattedProducts} categories={categories || []} />
//       <PakistaniEditBanner />
//       <LuxeSalwarKameez products={formattedSalwarKameez} />
//       <WhyUs />
//       <BrandBanner />
//       <Story />
//       <Lookbook />
//       <Testimonials />
//       <Footer />
//       <FloatingWhatsApp />
//     </main>
//   );
// }

// app/page.tsx
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Collections from '@/components/Collections'
import NewArrivals from '@/components/NewArrivals'
import Products from '@/components/Products'
import SaleSection from '@/components/SaleSection'
import Features from '@/components/Features'
import Aboutp from '@/components/aboutp'
import Reviews from '@/components/Reviews'
import Instagram from '@/components/Instagram'
import Edition from '@/components/Edition'
import Newsletter from '@/components/Newsletter'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'The Boujee Bazaar | Minimal & Luxury Jewelry',
  description: 'Anti-tarnish, waterproof, hypoallergenic jewelry. MINIMAL. TIMELESS. YOU.',
  keywords: 'jewelry, boujee, gold, necklace, earrings, rings, bracelets',
}

export default async function Home() {
  const supabase = await createClient()

  // 1. Fetch active hero slides
  const { data: heroSlidesData } = await supabase
    .from('hero_slides')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  // 2. Fetch categories
  const { data: categoriesData } = await supabase
    .from('categories')
    .select('id, name, slug, image, description, sort_order')
    .order('sort_order', { ascending: true })

  // 3. Fetch products
  const { data: productsData } = await supabase
    .from('products')
    .select('id, name, price, originalPrice, image, category, subcategory, tag, available')
    .eq('available', true)

  const rawSlides = heroSlidesData || []
  const rawCategories = categoriesData || []
  const rawProducts = productsData || []

  // Map to unified shape for the landing page product cards
  const allMappedProducts = rawProducts.map((p: any) => ({
    id: p.id,
    name: p.name,
    image: p.image || '/assets/img/placeholder.jpeg',
    price: p.price || 0,
    originalPrice: p.originalPrice || undefined,
    rating: 5.0,
    reviewCount: 120,
    badge: p.tag || undefined,
    category_id: p.category?.trim().toLowerCase() || '',
    category_name: p.category || 'Jewelry',
    subcategory: p.subcategory?.trim().toLowerCase() || '',
  }))

  // Filter products for the specific sections
  const newArrivals = allMappedProducts.filter(p => p.badge?.toLowerCase() === 'new' || p.id.startsWith('n'))
  const bestSellers = allMappedProducts.filter(p => p.badge?.toLowerCase() === 'bestseller' || p.badge?.toLowerCase() === 'hot' || p.id.startsWith('b'))
  const saleProducts = allMappedProducts.filter(p => (p.originalPrice && p.originalPrice > p.price) || p.badge?.toLowerCase() === 'sale')

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-28">
        <Hero slides={rawSlides} />
        <Collections categories={rawCategories} />
        <NewArrivals products={newArrivals} />
        <Products products={bestSellers} />
        
        <Edition />
        {/* <SaleSection products={saleProducts} /> */}
        <Features />
        <Aboutp />
        <Reviews />
        <Instagram />
        <Newsletter />
        <FAQ />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}

// import { createClient } from "@/lib/supabase/server";

// export default async function Home() {
//   const supabase = await createClient();

//   // 1. FETCH LIVE SLIDES
//   const { data: heroSlides } = await supabase
//     .from("hero_slides")
//     .select("*")
//     .eq("is_active", true)
//     .order("created_at", { ascending: false });

//   // 2. FETCH ACTIVE CATEGORIES
//   const { data: categoriesData } = await supabase
//     .from("categories")
//     .select("*")
//     .eq("is_active", true);

//   // 3. FETCH FEATURED PRODUCTS FOR BESTSELLERS GRID
//   const { data: bestsellers } = await supabase
//     .from("products")
//     .select(`
//       id, name, slug, category_id, is_featured, is_active,
//       product_images ( image_url ),
//       product_variants ( price, original_price )
//     `)
//     .eq("is_active", true)
//     .eq("is_featured", true)
//     .order("created_at", { ascending: false })
//     .limit(8);

//   // 4. FETCH NEW ARRIVALS
//   const { data: newArrivals } = await supabase
//     .from("products")
//     .select(`
//       id, name, slug, category_id, is_active,
//       product_images ( image_url ),
//       product_variants ( price, original_price )
//     `)
//     .eq("is_active", true)
//     .order("created_at", { ascending: false })
//     .limit(6);

//   // Format products uniformly to prevent undefined properties from throwing errors
//   const formatItems = (list: any[] | null) => 
//     (list || []).map((p: any) => ({
//       id: p.id,
//       name: p.name,
//       image_url: p.product_images?.[0]?.image_url || "/assets/img/placeholder.jpeg",
//       price: p.product_variants?.[0]?.price || 0,
//       originalPrice: p.product_variants?.[0]?.original_price || undefined,
//     }));

//   const dynamicBestsellers = formatItems(bestsellers);
//   const dynamicNewArrivals = formatItems(newArrivals);

//   return (
//     <>
//       {/* Announcement Bar */}
//       <div className="announcement-bar">
//         <span>✨</span> FREE SHIPPING ON ALL ORDERS ABOVE ₹1499 <span>✨</span>
//       </div>

//       {/* Navigation */}
//       <header className="navbar" id="navbar">
//         <button className="mobile-menu-btn" aria-label="Menu" id="mobileMenuBtn">
//           <i className="fa-solid fa-bars"></i>
//         </button>
//         <div className="nav-links" id="navLinks">
//           <a href="#">Home</a>
//           <a href="#">Shop</a>
//           <a href="#">Collections</a>
//           <a href="#">About Us</a>
//         </div>
//         <div className="logo">
//           <div className="logo-top" style={{ fontWeight: 650 }}>
//             the <span className="highlight">boujee</span>
//           </div>
//           <div className="logo-bottom">bazaar<span class="highlight">.</span></div>
//         </div>
//         <div className="nav-icons">
//           <button aria-label="Search"><i className="fa-solid fa-magnifying-glass"></i></button>
//           <a href="/login" aria-label="Account" style={{ color: 'inherit' }}><i className="fa-regular fa-user"></i></a>
//           <button aria-label="Wishlist" className="icon-badge">
//             <i className="fa-regular fa-heart"></i>
//             <span className="badge">0</span>
//           </button>
//           <button aria-label="Cart" className="icon-badge">
//             <i className="fa-solid fa-bag-shopping"></i>
//             <span className="badge">0</span>
//           </button>
//         </div>
//       </header>

//       <main>
//         {/* Hero Section (Slider) */}
//         <section className="hero-slider">
//           <div className="slides-container" id="heroSlides">
//             {heroSlides && heroSlides.length > 0 ? (
//               heroSlides.map((slide: any, index: number) => (
//                 <div key={slide.id} className={`slide ${index === 0 ? 'active' : ''}`}>
//                   <div className="hero-content">
//                     <p className="hero-subtitle">{slide.subtitle || "MINIMAL. TIMELESS. YOU."}</p>
//                     <h1 className="hero-title">{slide.title}</h1>
//                     <p className="hero-desc">{slide.description}</p>
//                     <button className="btn-primary">SHOP NOW <span>✨</span></button>
//                   </div>
//                   <div className="hero-image">
//                     <div className="hero-overlay"></div>
//                     <img src={slide.image_url} alt={slide.title} />
//                   </div>
//                 </div>
//               ))
//             ) : (
//               /* Fallback Static Slide 1 if Database is Empty */
//               <div className="slide active">
//                 <div className="hero-content">
//                   <p className="hero-subtitle">MINIMAL. TIMELESS. YOU.</p>
//                   <h1 className="hero-title">Jewelry that <br /><span className="highlight-text">completes you.</span></h1>
//                   <p className="hero-desc">Anti-tarnish • Waterproof • Hypoallergenic <br />Made to shine, every single day.</p>
//                   <button className="btn-primary">SHOP NOW <span>✨</span></button>
//                 </div>
//                 <div className="hero-image">
//                   <div className="hero-overlay"></div>
//                   <img src="/assets/img/slider_1.jpeg" alt="Premium Jewelry Display" />
//                 </div>
//               </div>
//             )}
//           </div>
//           <div className="slider-controls">
//             {(heroSlides || [1, 2, 3]).map((_, index: number) => (
//               <button key={index} className={`slider-dot ${index === 0 ? 'active' : ''}`} data-index={index}></button>
//             ))}
//           </div>
//         </section>

//         {/* Shop by Collection */}
//         <section className="collections">
//           <h2 className="section-title">SHOP BY <span className="highlight-text">COLLECTION</span> ✨</h2>
//           <div className="collection-grid">
//             {categoriesData && categoriesData.length > 0 ? (
//               categoriesData.map((category: any) => (
//                 <div className="collection-item" key={category.id}>
//                   <div className="collection-img">
//                     <img src={category.image_url} alt={category.name} />
//                   </div>
//                   <span>{category.name}</span>
//                 </div>
//               ))
//             ) : (
//               /* Fallback Static Collections if Table is Empty */
//               <>
//                 <div className="collection-item">
//                   <div className="collection-img"><img src="https://pexels.com" alt="Rings" /></div>
//                   <span>Rings</span>
//                 </div>
//                 <div className="collection-item">
//                   <div className="collection-img"><img src="https://pexels.com" alt="Earrings" /></div>
//                   <span>Earrings</span>
//                 </div>
//               </>
//             )}
//             <div className="collection-item">
//               <div className="collection-img"><i className="fa-solid fa-gift gift-icon"></i></div>
//               <span>Boujee Bits</span>
//             </div>
//           </div>
//           <div className="view-all-container">
//             <button className="btn-secondary">VIEW ALL COLLECTIONS <i className="fa-solid fa-arrow-right"></i></button>
//           </div>
//         </section>

//         {/* Bestsellers Grid */}
//         <section className="bestsellers">
//           <div className="section-header">
//             <h2 className="section-title">BESTSELLERS ✨</h2>
//             <a href="#" className="view-all-link">VIEW ALL <i className="fa-solid fa-arrow-right"></i></a>
//           </div>
//           <div className="products-grid">
//             {dynamicBestsellers.length > 0 ? (
//               dynamicBestsellers.map((product) => (
//                 <div className="product-card" key={product.id}>
//                   <div className="product-img-wrapper">
//                     <img src={product.image_url} alt={product.name} />
//                     <button className="wishlist-btn"><i className="fa-regular fa-heart"></i></button>
//                   </div>
//                   <div className="product-info">
//                     <h3 className="product-name">{product.name}</h3>
//                     <p className="product-price">₹{product.price}</p>
//                     <div className="product-rating">
//                       <i className="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
//                       <span>(128)</span>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#666" }}>No bestsellers uploaded yet.</p>
//             )}
//           </div>
//         </section>

//         {/* New Arrivals Section */}
//         <section className="new-arrivals bestsellers">
//           <div className="section-header">
//             <h2 className="section-title left">NEW ARRIVALS ✨</h2>
//             <a href="#" class="view-all-link">SHOP NEW ARRIVALS <i class="fa-solid fa-arrow-right"></i></a>
//           </div>
//           <div className="products-grid">
//             {dynamicNewArrivals.length > 0 ? (
//               dynamicNewArrivals.map((product) => (
//                 <div className="product-card" key={product.id}>
//                   <div className="product-img-wrapper">
//                     <img src={product.image_url} alt={product.name} />
//                     <button className="wishlist-btn"><i className="fa-regular fa-heart"></i></button>
//                   </div>
//                   <div className="product-info">
//                     <h3 className="product-name">{product.name}</h3>
//                     <p className="product-price">₹{product.price}</p>
//                     <div className="product-rating">
//                       <i className="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
//                                             <span>(21)</span>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#666" }}>New pieces launching soon!</p>
//             )}
//           </div>
//         </section>

//         {/* Limited Edition Collection Banner */}
//         <section className="limited-edition hero-slider">
//           <div className="slides-container">
//             <div className="slide active">
//               <div className="hero-content">
//                 <p className="hero-subtitle">LIMITED EDITION</p>
//                 <h1 className="hero-title">
//                   The Celestial <br />
//                   <span className="highlight-text">Collection.</span>
//                 </h1>
//                 <p className="hero-desc">
//                   Inspired by the stars. Handcrafted for you.<br />
//                   Available for a limited time only.
//                 </p>
//                 <button className="btn-primary">SHOP THE DROP <span>✨</span></button>
//               </div>
//               <div className="hero-image">
//                 <div className="hero-overlay"></div>
//                 <img
//                   src="/assets/img/demos_insta/demo_9.jpeg"
//                   alt="Limited Edition Jewelry"
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Features Banner */}
//         <section className="features">
//           <div className="feature-item">
//             <i className="fa-solid fa-droplet feature-icon"></i>
//             <div className="feature-text">
//               <h4>ANTI-TARNISH</h4>
//               <p>Built to last, made to shine.</p>
//             </div>
//           </div>
//           <div className="feature-divider"></div>
//           <div className="feature-item">
//             <i className="fa-solid fa-shield-halved feature-icon"></i>
//             <div className="feature-text">
//               <h4>WATERPROOF</h4>
//               <p>Wear it anywhere, anytime.</p>
//             </div>
//           </div>
//           <div className="feature-divider"></div>
//           <div className="feature-item">
//             <i className="fa-solid fa-leaf feature-icon"></i>
//             <div className="feature-text">
//               <h4>HYPOALLERGENIC</h4>
//               <p>Gentle on your skin.</p>
//             </div>
//           </div>
//           <div className="feature-divider"></div>
//           <div className="feature-item">
//             <i className="fa-solid fa-truck-fast feature-icon"></i>
//             <div className="feature-text">
//               <h4>FAST SHIPPING</h4>
//               <p>Delivered with love.</p>
//             </div>
//           </div>
//         </section>

//         {/* Made For You Banner */}
//         <section className="made-for-you-modern">
//           <div className="mfy-modern-container">
//             <div className="mfy-modern-content">
//               <div className="mfy-modern-badge">ABOUT US</div>
//               <h2 className="mfy-modern-title">
//                 MADE FOR YOU, <br /><span className="highlight-text">BY US.</span> ✨
//               </h2>
//               <p className="mfy-modern-desc">
//                 The Boujee Bazaar is more than just jewelry. <br />
//                 It's a vibe. A feeling. A little luxury you deserve every day.
//               </p>
//               <button className="btn-primary mfy-modern-btn">
//                 DISCOVER OUR STORY <i className="fa-solid fa-arrow-right"></i>
//               </button>
//             </div>
//             <div className="mfy-modern-image-wrapper">
//               <div className="mfy-modern-image-backdrop"></div>
//               <img
//                 className="mfy-modern-img main-img"
//                 src="/assets/img/insta_img/insta_15.jpeg"
//                 alt="Packaging"
//               />
//               <div className="mfy-modern-floating-logo">
//                 <span>the<strong className="highlight-text">boujee</strong></span>
//                 <span>bazaar.</span>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Customer Reviews */}
//         <section className="customer-reviews bestsellers">
//           <h2 className="section-title text-center">
//             LOVED BY <span className="highlight-text">YOU</span> ✨
//           </h2>
//           <div className="reviews-slider-container">
//             <div className="reviews-track" id="reviewsTrack">
//               {/* Loop to render 5 duplicate static review cards quickly without code bloat */}
//               {[1, 2, 3, 4, 5].map((i) => (
//                 <div className="review-card" key={i}>
//                   <div className="review-rating">
//                     <i className="fa-solid fa-star"></i>
//                     <i className="fa-solid fa-star"></i>
//                     <i className="fa-solid fa-star"></i>
//                     <i className="fa-solid fa-star"></i>
//                     <i className="fa-solid fa-star"></i>
//                   </div>
//                   <p className="review-text">
//                     "Absolutely in love with the quality! I've been wearing my
//                     text necklaces every day in the shower and they haven't tarnished at
//                     all. Highly recommend!"
//                   </p>
//                   <div className="reviewer-info">
//                     <img src="/assets/img/demos_insta/demo_13.jpeg" alt="Sarah J." />
//                     <span>Sarah J.</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Trust & Security */}
//         <section className="trust-badges">
//           <div className="trust-item">
//             <i className="fa-solid fa-lock"></i>
//             <span>Secure Payments</span>
//           </div>
//           <div className="trust-item">
//             <i className="fa-solid fa-box-open"></i>
//             <span>Premium Packaging</span>
//           </div>
//           <div className="trust-item">
//             <i className="fa-solid fa-rotate-left"></i>
//             <span>Easy Returns</span>
//           </div>
//           <div className="trust-item">
//             <i className="fa-solid fa-gem"></i>
//             <span>Authentic Quality</span>
//           </div>
//           <div className="trust-item">
//             <i className="fa-solid fa-truck-fast"></i>
//             <span>Free Shipping</span>
//           </div>
//         </section>

//         {/* Instagram Gallery */}
//         <section className="instagram-gallery">
//           <h2 className="section-title text-center">
//             JOIN THE <span className="highlight-text">CLUB</span> ✨
//           </h2>
//           <p className="text-center" style={{ marginBottom: "30px" }}>
//             Tag @theboujeebazaar to be featured
//           </p>
//           <div className="ig-marquee">
//             <div className="ig-track">
//               {/* Maps through your image items for the animated row grid */}
//               {[1, 2, 3, 4, 5, 6].map((num) => (
//                 <div className="ig-item" key={num}>
//                   <img src={`/assets/img/demos_insta/demo_${num}.jpeg`} alt={`IG ${num}`} />
//                   <div className="ig-overlay">
//                     <i className="fa-brands fa-instagram"></i>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="view-all-container" style={{ marginTop: "30px" }}>
//             <button className="btn-secondary">
//               FOLLOW US <i className="fa-solid fa-arrow-right"></i>
//             </button>
//           </div>
//         </section>

//         {/* FAQ Section */}
//         <section className="faq-section">
//           <h2 className="section-title text-center">
//             FREQUENTLY ASKED <span className="highlight-text">QUESTIONS</span>
//           </h2>
//           <div className="faq-container">
//             <div className="faq-item">
//               <button className="faq-question">
//                 Is the jewelry waterproof?
//                 <i className="fa-solid fa-chevron-down"></i>
//               </button>
//               <div className="faq-answer">
//                 <p>
//                   Yes! Our pieces are designed to withstand everyday wear,
//                   including water exposure. However, for maximum longevity, we
//                   recommend avoiding harsh chemicals.
//                 </p>
//               </div>
//             </div>
//             <div className="faq-item">
//               <button className="faq-question">
//                 Is it anti-tarnish? <i className="fa-solid fa-chevron-down"></i>
//               </button>
//               <div className="faq-answer">
//                 <p>
//                   Absolutely. We use high-quality PVD plating which makes our
//                   jewelry highly resistant to tarnishing and fading.
//                 </p>
//               </div>
//             </div>
//             <div className="faq-item">
//               <button className="faq-question">
//                 What is your shipping time?
//                 <i className="fa-solid fa-chevron-down"></i>
//               </button>
//               <div className="faq-answer">
//                 <p>
//                   Standard shipping takes 3-5 business days. Express shipping
//                   options are available at checkout for 1-2 day delivery.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Dedicated Newsletter Section */}
//         <section className="newsletter-banner">
//           <div className="newsletter-content">
//             <h2>JOIN THE <span className="highlight-text">BOUJEE</span> FAMILY </h2> ✨
//             <p>
//               Subscribe to receive 10% off your first order, exclusive access to
//               new drops, and styling tips.
//             </p>
//             <form className="newsletter-form-large">
//               <input type="email" placeholder="Enter your email address" required />
//               <button type="submit" className="btn-primary">SUBSCRIBE</button>
//             </form>
//             </div>
//             </section>
//       </main>
//      {/* Footer */}
//       <footer className="footer">
//         <div className="footer-container">
//           <div className="footer-brand">
//             <div className="logo">
//               <div className="logo-top">the<span className="highlight">boujee</span></div>
//               <div className="logo-bottom">
//                 bazaar<span className="highlight">.</span>
//               </div>
//             </div>
//             <p>Minimal jewelry for the <br />maximal you. </p> ✨
//             <div className="social-icons">
//               <a href="#"><i className="fa-brands fa-instagram"></i></a>
//               <a href="#"><i className="fa-brands fa-pinterest-p"></i></a>
//               <a href="#"><i className="fa-brands fa-whatsapp"></i></a>
//             </div>
//           </div>
//           <div className="footer-links">
//             <h4>SHOP</h4>
//             <ul>
//               <li><a href="#">All Products</a></li>
//               <li><a href="#">Rings</a></li>
//               <li><a href="#">Earrings</a></li>
//               <li><a href="#">Necklaces</a></li>
//               <li><a href="#">Bracelets</a></li>
//               <li><a href="#">Boujee Bits</a></li>
//             </ul>
//           </div>
//           <div className="footer-links">
//             <h4>HELP</h4>
//             <ul>
//               <li><a href="#">FAQs</a></li>
//               <li><a href="#">Shipping & Delivery</a></li>
//               <li><a href="#">Returns & Exchanges</a></li>
//               <li><a href="#">Care Guide</a></li>
//               <li><a href="#">Contact Us</a></li>
//             </ul>
//           </div>
//           <div className="footer-links">
//             <h4>ABOUT</h4>
//             <ul>
//               <li><a href="#">Our Story</a></li>
//               <li><a href="#">Why Anti-Tarnish?</a></li>
//               <li><a href="#">Reviews</a></li>
//               <li><a href="#">Blogs</a></li>
//             </ul>
//           </div>
//           <div className="footer-newsletter">
//             <h4>NEWSLETTER</h4>
//             <p>Be the first to know about new <br />arrivals, offers & more!</p>
//             <form className="newsletter-form">
//               <input type="email" placeholder="Enter your email" required />
//               <button type="submit">
//                 <i className="fa-solid fa-arrow-right"></i>
//               </button>
//             </form>
//             <div className="payment-icons" style={{ marginTop: "15px", display: "flex", gap: "10px", fontSize: "1.5rem" }}>
//               <i className="fa-brands fa-cc-visa"></i>
//               <i className="fa-brands fa-cc-mastercard"></i>
//               <i className="fa-brands fa-cc-amex"></i>
//               <i className="fa-brands fa-cc-paypal"></i>
//             </div>
//           </div>
//         </div>
//         <div className="footer-bottom">
//           <p>&copy; 2024 The Boujee Bazaar. All rights reserved.</p>
//         </div>
//       </footer>
//     </>
//   );
// }
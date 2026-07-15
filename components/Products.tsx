// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";

// import Image from "next/image";
// import Reveal from "./Reveal";
// import { SITE } from "@/lib/data";
// import { useCart } from "@/context/CartContext";

// interface Product {
//   id: string;
//   name: string;
//   category_id: string;
//   image_url: string;
//   badge?: string;
//   rating?: number;
//   price: number;
//   originalPrice?: number;
//   colorCount?: number;
// }

// interface Category {
//   id: string;
//   name: string;
// }

// function formatINR(n: number) {
//   return `₹${n.toLocaleString("en-IN")}`;
// }

// export default function Products({ 
//   products = [], 
//   categories = [],
//   title = "This season's favourites",
//   subtitle = "A curated edit from our latest drop — message us on WhatsApp for sizing, fabric notes or a custom order."
// }: { 
//   products?: Product[], 
//   categories?: Category[],
//   title?: string,
//   subtitle?: string
// }) {
//   const { addToCart } = useCart();
//   const router = useRouter();

//   return (
//     <section id="products" className="relative py-12 md:py-16 bg-cream">
//       <div className="max-w-wrap mx-auto px-5 md:px-8">
//         <Reveal className="text-center max-w-xl mx-auto">
//           <div className="eyebrow justify-center inline-flex items-center gap-2">
//             <span className="h-px w-6 bg-gold" />
//             Featured Pieces
//             <span className="h-px w-6 bg-gold" />
//           </div>
//           <h2 className="section-heading mt-4">{title}</h2>
//           <p className="section-sub mt-4">
//             {subtitle}
//           </p>
//         </Reveal>
 
//         <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-6">
//           {products.slice(0, 10).map((p, i) => {
//             const categoryName = categories.find(c => c.id === p.category_id)?.name || p.category_id || "Uncategorized";
//             return (
//               <Reveal key={p.id} delay={(i % 5) as any} className="flex-none w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(20%-1.2rem)]">
//                 <div className="lift group bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-cream-line/80 h-full flex flex-col">
//                   <div className="relative aspect-[4/5] overflow-hidden bg-cream-deep/20">
//                     <Image
//                       src={p.image_url}
//                       alt={p.name}
//                       fill
//                       sizes="(max-width: 768px) 50vw, 280px"
//                       className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
//                     />
//                     {p.badge && (
//                       <span className="absolute top-3 left-3 bg-emerald text-cream text-[9px] md:text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-sm">
//                         {p.badge}
//                       </span>
//                     )}
//                     <span className="absolute bottom-3 right-3 bg-gold text-cream text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded shadow-sm">
//                       {categoryName}
//                     </span>
//                   </div>
//                   <div className="p-3 md:p-4 flex flex-col flex-1">
//                     <div className="flex-1">
//                       <Link href={`/shop/${p.id}`} className="hover:text-emerald transition-colors">
//                         <h3 className="font-display font-semibold text-ink text-[13px] md:text-[15px] leading-snug line-clamp-2">
//                           {p.name}
//                         </h3>
//                       </Link>
//                       {p.colorCount && p.colorCount > 1 && (
//                         <p className="mt-1 text-[11px] font-semibold text-emerald">
//                           {p.colorCount} colors available
//                         </p>
//                       )}
//                     </div>
//                   <div className="mt-2 flex items-center gap-2">
//                     <span className="font-display font-bold text-ink text-[14px] md:text-base">
//                       {formatINR(p.price)}
//                     </span>
//                     {p.originalPrice && (
//                       <span className="text-ink/40 text-[12px] line-through">
//                         {formatINR(p.originalPrice)}
//                       </span>
//                     )}
//                   </div>
//                   <div className="mt-3 grid grid-cols-1 gap-2">
//                     <button
//                       onClick={() => addToCart({
//                         id: p.id,
//                         name: p.name,
//                         price: p.price,
//                         image_url: p.image_url,
//                         category_name: categoryName
//                       })}
//                       className="w-full text-center rounded-lg border border-emerald/50 text-emerald text-[13px] md:text-sm font-bold py-2.5 hover:bg-emerald hover:border-emerald hover:text-cream transition-colors flex items-center justify-center"
//                     >
//                       Add to cart
//                     </button>
//                     <button
//                       onClick={() => {
//                         addToCart({
//                           id: p.id,
//                           name: p.name,
//                           price: p.price,
//                           image_url: p.image_url,
//                           category_name: categoryName
//                         });
//                         router.push('/checkout');
//                       }}
//                       className="w-full text-center rounded-lg bg-emerald text-cream text-[13px] md:text-sm font-bold py-2.5 hover:bg-emerald-deep transition-colors flex items-center justify-center shadow-sm"
//                     >
//                       Buy now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </Reveal>
//           );
//           })}
//         </div>

//         <Reveal className="mt-12 text-center">
//           <Link
//             href="/shop"
//             className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-emerald text-cream font-body font-semibold text-[15px] tracking-wide shadow-card hover:bg-emerald-deep transition-colors"
//           >
//             View Full Catalogue
//           </Link>
//         </Reveal>
//       </div>
//     </section>
//   );
// }

// components/Products.tsx
'use client'

import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

interface Product {
  id: string
  name: string
  image: string
  price: number
  rating: number
  reviewCount: number
}

export default function Products({ products: dbProducts }: { products?: Product[] }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Mock products from index.html
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Elegant Gold Necklace',
      image: 'assets/img/pr_1.jpeg',
      price: 1299,
      rating: 5,
      reviewCount: 128,
    },
    {
      id: '2',
      name: 'Pearl Drop Earrings',
      image: 'assets/img/pr_2.jpeg',
      price: 799,
      rating: 5,
      reviewCount: 96,
    },
    {
      id: '4',
      name: 'Vintage Gold Ring',
      image: 'assets/img/pr_4.jpeg',
      price: 599,
      rating: 4.5,
      reviewCount: 87,
    },
    {
      id: '5',
      name: 'Diamond Solitaire Ring',
      image: 'assets/img/pr_5.jpeg',
      price: 1499,
      rating: 5,
      reviewCount: 42,
    },
    {
      id: '6',
      name: 'Classic Layered Chain',
      image: 'assets/img/pr_6.jpeg',
      price: 899,
      rating: 4.8,
      reviewCount: 65,
    },
    {
      id: '7',
      name: 'Rose Gold Cuff Bracelet',
      image: 'assets/img/pr_7.jpeg',
      price: 999,
      rating: 4.6,
      reviewCount: 19,
    },
    {
      id: '8',
      name: 'Dainty Heart Pendant',
      image: 'assets/img/pr_8.jpeg',
      price: 899,
      rating: 5,
      reviewCount: 34,
    },
  ]

  useEffect(() => {
    if (dbProducts && dbProducts.length > 0) {
      setProducts(dbProducts)
    } else {
      setProducts(mockProducts)
    }
    setLoading(false)
  }, [dbProducts])

  return (
    <section className="bestsellers">
      {/* Section Header - from index.html */}
      <div className="section-header">
        <h2 className="section-title">BESTSELLERS ✨</h2>
        <a href="#" className="view-all-link">
          VIEW ALL <i className="fa-solid fa-arrow-right"></i>
        </a>
      </div>

      {/* Products Grid - from index.html */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading products...</p>
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


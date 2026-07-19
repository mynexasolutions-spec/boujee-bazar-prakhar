// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { navLinks, SITE } from "@/lib/data";
// import { createClient } from "@/lib/supabase/client";
// import { useCart } from "@/context/CartContext";
// import { useWishlist } from "@/context/WishlistContext";
// import CartDrawer from "./CartDrawer";
// import { Search, Truck, Banknote, CreditCard, Heart, ShoppingBag, User, LogOut, ShieldAlert } from "lucide-react";
// import { useRouter, usePathname } from "next/navigation";
// import { getShippingSettings } from "@/actions/admin/shipping";

// export default function Header() {
//   const [scrolled, setScrolled] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [mobileCollectionOpen, setMobileCollectionOpen] = useState(false);
//   const [cartOpen, setCartOpen] = useState(false);
//   const { cartCount } = useCart();
//   const { wishlistCount } = useWishlist();
//   const [user, setUser] = useState<any>(null);
//   const isAdmin = user && (user.email === 'admin@boujeebazaar.in' || user.user_metadata?.role === 'admin');
//   const [searchQuery, setSearchQuery] = useState("");
//   const router = useRouter();
//   const pathname = usePathname();
//   const [shipping, setShipping] = useState<any>(null);

//   useEffect(() => {
//     getShippingSettings()
//       .then((data) => setShipping(data))
//       .catch((err) => console.error("Error loading header shipping settings:", err));
//   }, []);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
//       setOpen(false);
//     }
//   };

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 12);
//     onScroll();
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     const checkUserSession = () => {
//       const value = `; ${document.cookie}`
//       const parts = value.split(`; gulshan-user-session=`)
//       if (parts.length === 2) {
//         const val = parts.pop()?.split(';').shift()
//         if (val) {
//           try {
//             const session = JSON.parse(decodeURIComponent(val))
//             setUser({ id: session.id, email: session.email, user_metadata: { role: session.role, full_name: session.full_name } })
//             return
//           } catch (e) {}
//         }
//       }

//       const mockAdmin = document.cookie.includes('mock-admin-logged-in=true')
//       if (mockAdmin) {
//         setUser({ id: 'mock-admin-id', email: 'admin@boujeebazaar.in', user_metadata: { role: 'admin' } })
//         return
//       }

//       setUser(null)
//     }

//     const supabase = createClient();
//     if (supabase) {
//       supabase.auth.getUser().then(({ data }) => {
//         if (data?.user) {
//           setUser(data.user);
//         }
//       }).catch(() => { });
//     }

//     window.addEventListener('gulshan-login-status-change', checkUserSession)
//     return () => {
//       window.removeEventListener('gulshan-login-status-change', checkUserSession)
//     }
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "";
//   }, [open]);

//   // Premium jewelry categories list for navbar dropdown
//   const jewelryCategories = [
//     { id: "necklaces", name: "Necklaces & Pendants" },
//     { id: "earrings", name: "Earrings" },
//     { id: "rings", name: "Rings" },
//     { id: "bracelets", name: "Bracelets & Bangles" },
//     { id: "anklets", name: "Anklets" },
//     { id: "watches", name: "Watches" }
//   ];

//   return (
//     <>
//       <header
//         className={`fixed top-0 inset-x-0 z-[99999] transition-all duration-300 ${open
//             ? "bg-[#FBF7F0]"
//             : scrolled
//               ? "bg-cream/90 backdrop-blur-md shadow-[0_4px_24px_-8px_rgba(33,29,25,0.15)]"
//               : "bg-transparent"
//           }`}
//       >
//         <div className="w-full bg-[#1E3B2E] text-cream text-[9px] sm:text-xs py-2 px-3 flex flex-row items-center justify-center gap-1.5 sm:gap-6 border-b border-cream-line/10 shrink-0 text-center font-medium font-body whitespace-nowrap overflow-hidden">
//           <span className="flex items-center gap-1"><Truck className="w-3 h-3 sm:w-4 sm:h-4 text-gold" /> Free Shipping above ₹{shipping?.free_threshold ?? '1,499'}</span>
//           <span className="text-white/20">|</span>
//           <span className="flex items-center gap-1">
//             <Banknote className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
//             <span className="inline sm:hidden">COD: ₹{shipping?.cod_charge ?? '49'}</span>
//             <span className="hidden sm:inline">COD Charge: ₹{shipping?.cod_charge ?? '49'}</span>
//           </span>
//           <span className="text-white/20">|</span>
//           <span className="flex items-center gap-1">
//             <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
//             <span className="inline sm:hidden">{shipping?.online_discount ?? '5'}% Off Online</span>
//             <span className="hidden sm:inline">{shipping?.online_discount ?? '5'}% Off on Online Payments</span>
//           </span>
//         </div>
        
//         <div className="max-w-wrap mx-auto px-5 md:px-8 flex items-center justify-between h-[72px] md:h-[84px]">
//           {/* Mobile hamburger — left side on mobile only */}
//           <button
//             aria-label={open ? "Close menu" : "Open menu"}
//             onClick={() => setOpen((v) => !v)}
//             className={`lg:hidden relative h-10 w-10 flex items-center justify-center text-[#211D19] shrink-0 transition-all ${scrolled
//                 ? "bg-transparent border-transparent shadow-none"
//                 : "bg-white/95 border border-cream-line/60 rounded-full shadow-sm hover:bg-cream"
//               }`}
//           >
//             <span className="sr-only">Menu</span>
//             {open ? (
//               <svg className="w-[22px] h-[22px] text-[#211D19]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             ) : (
//               <svg className="w-[22px] h-[22px] text-[#211D19]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             )}
//           </button>

//           <a href="/" className="logo">
//   <div className="logo-top" style={{ fontWeight: 650 }}>
//     the <span className="highlight">boujee</span>
//   </div>
//   <div className="logo-bottom">
//     bazaar<span className="highlight">.</span>
//   </div>
// </a>

//           <div className="nav-links">
//             {navLinks.map((link) => {
//               if (link.label === "Shop") {
//                 return (
//                   <div key={link.href} className="relative group py-2">
//                     <a
//                       href={link.href}
//                       className="font-body text-[16px] font-semibold text-ink hover:text-emerald transition-colors flex items-center gap-1"
//                     >
//                       {link.label}
//                       <svg className="w-4 h-4 text-ink/40 group-hover:text-emerald transition-transform group-hover:rotate-180 duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//                       </svg>
//                     </a>

//                     {/* Dropdown Menu */}
//                     <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[540px] bg-white border border-cream-line rounded-2xl shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 p-6 z-50">
//                       <div className="grid grid-cols-2 gap-x-8 gap-y-6">
//                         <div>
//                           <p className="px-1 mb-2 text-[11px] font-bold uppercase tracking-wider text-ink/40">Categories</p>
//                           <div className="grid grid-cols-2 gap-x-4 gap-y-1">
//                             {jewelryCategories.map((cat: any) => (
//                               <a
//                                 key={cat.id}
//                                 href={`/shop?category=${cat.id}`}
//                                 className="block px-3 py-2 rounded-lg text-sm font-semibold text-ink/75 hover:bg-cream hover:text-emerald transition-colors"
//                               >
//                                 {cat.name}
//                               </a>
//                             ))}
//                           </div>
//                         </div>

//                         <div>
//                           <p className="px-1 mb-2 text-[11px] font-bold uppercase tracking-wider text-ink/40">Discover</p>
//                           <div className="space-y-2">
//                             <a
//                               href="/shop?filter=new-arrivals"
//                               className="block p-3 rounded-xl bg-cream/60 hover:bg-cream transition-colors"
//                             >
//                               <span className="text-[10px] font-bold uppercase tracking-wider text-gold">New</span>
//                               <p className="font-display font-semibold text-ink text-sm mt-0.5">New Arrivals</p>
//                             </a>
//                             <a
//                               href="/shop?filter=best-sellers"
//                               className="block p-3 rounded-xl bg-cream/60 hover:bg-cream transition-colors"
//                             >
//                               <span className="text-[10px] font-bold uppercase tracking-wider text-gold">Curated</span>
//                               <p className="font-display font-semibold text-ink text-sm mt-0.5">Featured Pieces</p>
//                             </a>
//                           </div>
//                         </div>
//                       </div>

//                       <a
//                         href="/shop"
//                         className="mt-5 block text-center px-4 py-2.5 rounded-xl bg-[#1E3B2E] text-cream text-sm font-bold hover:bg-[#13261e] transition-colors"
//                       >
//                         Shop All
//                       </a>
//                     </div>
//                   </div>
//                 )
//               }
//               return (
//                 <a
//                   key={link.href}
//                   href={link.href}
//                   className="font-body text-[16px] font-semibold text-ink hover:text-emerald transition-colors relative group"
//                 >
//                   {link.label}
//                   <span className="absolute left-0 -bottom-1.5 h-[1.5px] w-0 bg-gold group-hover:w-full transition-all duration-300" />
//                 </a>
//               )
//             })}
//           </div>

//           <div className="hidden lg:flex items-center gap-6">
//             <form onSubmit={handleSearch} className="relative hidden xl:block">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-48 bg-[#FBF7F0] border border-[#e6e2db] rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-gold transition-all"
//               />
//               <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/50 hover:text-gold transition-colors">
//                 <Search className="w-4 h-4" />
//               </button>
//             </form>

//             <a
//               href="/wishlist"
//               className="text-[#211D19] hover:text-gold relative transition-all"
//               title="Wishlist"
//             >
//               <Heart className="w-[22px] h-[22px]" />
//               {wishlistCount > 0 && (
//                 <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-emerald text-cream text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm">
//                   {wishlistCount}
//                 </span>
//               )}
//             </a>

//             <button
//               onClick={() => setCartOpen(true)}
//               className="relative flex items-center justify-center h-11 w-11 rounded-full bg-gold text-white shadow-md hover:bg-emerald hover:scale-105 transition-all shrink-0"
//               title="Shopping Cart"
//             >
//               <ShoppingBag className="w-[20px] h-[20px]" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald text-cream text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm animate-scale-up">
//                   {cartCount}
//                 </span>
//               )}
//             </button>

//             {user && (
//               <div className="flex items-center gap-4 shrink-0">
//                 {isAdmin && (
//                   <a
//                     href="/admin"
//                     title="Admin Dashboard"
//                     className="text-[#211D19] hover:text-gold transition-colors p-1 shrink-0"
//                   >
//                     <ShieldAlert className="w-[22px] h-[22px]" />
//                   </a>
//                 )}
//                 <a
//                   href="/profile"
//                   title="Manage Profile"
//                   className="text-[#211D19] hover:text-gold transition-colors p-1 shrink-0"
//                 >
//                   <User className="w-[22px] h-[22px]" />
//                 </a>
//               </div>
//             )}
//             {user ? (
//               <button
//                 onClick={async () => {
//                   const supabase = createClient();
//                   await supabase.auth.signOut();
//                   localStorage.removeItem('gulshan-customer-profile');
//                   setUser(null);
//                   window.location.reload();
//                 }}
//                 className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-emerald text-cream font-body font-semibold text-sm tracking-wide hover:bg-[#13261e] transition-colors shadow-card"
//               >
//                 Logout
//               </button>
//             ) : (
//               <a
//                 href="/login"
//                 className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-emerald text-cream font-body font-semibold text-sm tracking-wide hover:bg-[#13261e] transition-colors shadow-card"
//               >
//                 Login/Register
//               </a>
//             )}
//           </div>

//           {/* Mobile cart / icons — right side on mobile only */}
//           <div className="lg:hidden flex items-center gap-4">
//             <a
//               href="/wishlist"
//               className="text-[#211D19] hover:text-gold relative transition-all"
//               title="Wishlist"
//             >
//               <Heart className="w-[20px] h-[20px]" />
//               {wishlistCount > 0 && (
//                 <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-emerald text-cream text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm">
//                   {wishlistCount}
//                 </span>
//               )}
//             </a>
            
//             <button
//               onClick={() => setCartOpen(true)}
//               className="relative h-10 w-10 flex items-center justify-center rounded-full bg-gold text-white shadow-md hover:bg-emerald transition-all shrink-0"
//               title="Shopping Cart"
//             >
//               <ShoppingBag className="w-[18px] h-[18px]" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald text-cream text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm">
//                   {cartCount}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile menu panel */}
//         <div
//           className={`lg:hidden fixed inset-x-0 top-[72px] bottom-0 bg-[#FBF7F0] z-[9999] transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] ${open ? "block opacity-100 pointer-events-auto" : "hidden opacity-0 pointer-events-none"
//             }`}
//         >
//           <nav className="flex flex-col px-6 pt-8 gap-1">
//             {navLinks.map((link, i) => {
//               if (link.label === "Shop") {
//                 return (
//                   <div key={link.href} className="border-b border-cream-line py-3.5">
//                     <button
//                       onClick={() => setMobileCollectionOpen(!mobileCollectionOpen)}
//                       className="w-full flex items-center justify-between font-display text-2xl font-semibold text-ink text-left"
//                     >
//                       <span>{link.label}</span>
//                       <svg className={`w-6 h-6 text-gold transition-transform duration-200 ${mobileCollectionOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//                       </svg>
//                     </button>

//                     {mobileCollectionOpen && (
//                       <div className="pl-4 mt-3 space-y-4 animate-fade-in flex flex-col">
//                         <div className="grid grid-cols-2 gap-x-4 gap-y-3">
//                           {jewelryCategories.map((cat: any) => (
//                             <a
//                               key={cat.id}
//                               href={`/shop?category=${cat.id}`}
//                               onClick={() => setOpen(false)}
//                               className="text-base font-semibold text-ink/75 hover:text-emerald"
//                             >
//                               {cat.name}
//                             </a>
//                           ))}
//                         </div>
//                         <div className="flex flex-col gap-3 pt-3 border-t border-cream-line/60">
//                           <a
//                             href="/shop?filter=new-arrivals"
//                             onClick={() => setOpen(false)}
//                             className="text-lg font-semibold text-ink/85 hover:text-emerald"
//                           >
//                             New Arrivals
//                           </a>
//                           <a
//                             href="/shop?filter=best-sellers"
//                             onClick={() => setOpen(false)}
//                             className="text-lg font-semibold text-ink/85 hover:text-emerald"
//                           >
//                             Featured Pieces
//                           </a>
//                           <a
//                             href="/shop"
//                             onClick={() => setOpen(false)}
//                             className="text-lg font-bold text-emerald"
//                           >
//                             Shop All
//                           </a>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )
//               }
//               return (
//                 <a
//                   key={link.href}
//                   href={link.href}
//                   onClick={() => setOpen(false)}
//                   className="font-display text-2xl font-semibold text-ink py-3.5 border-b border-cream-line"
//                   style={{ transitionDelay: `${i * 40}ms` }}
//                 >
//                   {link.label}
//                 </a>
//               )
//             })}
            
//             {user && (
//               <>
//                 {isAdmin && (
//                   <a
//                     href="/admin"
//                     onClick={() => setOpen(false)}
//                     className="font-display text-2xl font-semibold text-gold py-3.5 border-b border-cream-line flex items-center justify-between"
//                   >
//                     <span>Admin Dashboard</span>
//                     <ShieldAlert className="w-6 h-6 text-gold" />
//                   </a>
//                 )}
//                 <a
//                   href="/profile"
//                   onClick={() => setOpen(false)}
//                   className="font-display text-2xl font-semibold text-gold py-3.5 border-b border-cream-line flex items-center justify-between"
//                   >
//                   <span>Manage Profile</span>
//                   <User className="w-6 h-6 text-gold" />
//                 </a>
//               </>
//             )}
//             {user ? (
//               <button
//                 onClick={async () => {
//                   const supabase = createClient();
//                   await supabase.auth.signOut();
//                   localStorage.removeItem('gulshan-customer-profile');
//                   setUser(null);
//                   setOpen(false);
//                   window.location.reload();
//                 }}
//                 className="mt-7 inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-emerald text-cream font-body font-semibold text-base shadow-card"
//               >
//                 Logout
//               </button>
//             ) : (
//               <a
//                 href="/login"
//                 onClick={() => setOpen(false)}
//                 className="mt-7 inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#1E3B2E] text-cream font-body font-semibold text-base shadow-card"
//               >
//                 Login/Register
//               </a>
//             )}
//             <div className="mt-8 text-sm text-ink/60 font-body">
//               <p>{SITE.phone}</p>
//               <p className="mt-1">{SITE.email}</p>
//             </div>
//           </nav>
//         </div>
//       </header>
//       <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} shipping={shipping} />
//     </>
//   );
// }
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { navLinks, SITE } from "@/lib/data";
import { createClient } from "@/lib/supabase/client";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import CartDrawer from "./CartDrawer";
import { Search, Heart, ShoppingBag, User, LogOut, ShieldAlert, ChevronDown, Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { getShippingSettings } from "@/actions/admin/shipping";
import { getCompleteStoreConfig } from "@/actions/admin/announcements";
import LimitedEdition from "./Edition"; 
export default function Header() {
  
  const [announcement, setAnnouncement] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileCollectionOpen, setMobileCollectionOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [user, setUser] = useState<any>(null);
  
  const isAdmin = user && (user.email === 'admin@boujeebazaar.in' || user.user_metadata?.role === 'admin');
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const [shipping, setShipping] = useState<any>(null);

  useEffect(() => {
  async function loadHeaderData() {
    try {
      const [shippingData, announcementData] = await Promise.all([
        getShippingSettings(),
        getCompleteStoreConfig(),
      ]);

      setShipping(shippingData);
      setAnnouncement(announcementData);
    } catch (err) {
      console.error(err);
    }
  }

  loadHeaderData();
}, []);
useEffect(() => {
  console.log("Announcement Data:", announcement);
}, [announcement]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setOpen(false);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const checkUserSession = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; boujee-user-session=`); // ✅ UPDATED: Re-mapped over to your jewelry brand tracking token keys
    if (parts.length === 2) {
      const val = parts.pop()?.split(';').shift();
      if (val) {
        try {
          const session = JSON.parse(decodeURIComponent(val));
          setUser({ 
            id: session.id, 
            email: session.email, 
            user_metadata: { role: session.role, full_name: session.full_name } 
          });
          return;
        } catch (e) {}
      }
    }
    const mockAdmin = document.cookie.includes('mock-admin-logged-in=true');
    if (mockAdmin) {
      setUser({ id: 'mock-admin-id', email: 'admin@boujeebazaar.in', user_metadata: { role: 'admin' } });
      return;
    }
    setUser(null);
  };

  useEffect(() => {
    checkUserSession();
    const supabase = createClient();
    if (supabase) {
      supabase.auth.getUser().then(({ data }) => {
        if (data?.user) setUser(data.user);
      }).catch(() => {});
    }
    window.addEventListener('boujee-login-status-change', checkUserSession); // ✅ UPDATED: Sync layout changes natively
    return () => {
      window.removeEventListener('boujee-login-status-change', checkUserSession);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const jewelryCategories = [
    { id: "necklaces", name: "Necklaces & Pendants" },
    { id: "earrings", name: "Earrings" },
    { id: "rings", name: "Rings" },
    { id: "bracelets", name: "Bracelets & Bangles" },
    { id: "anklets", name: "Anklets" },
    { id: "watches", name: "Watches" }
  ];

  const isHome = pathname === '/';

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-[99999] transition-all duration-300 ${
        open ? "bg-white" : scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100" : isHome ? "bg-transparent" : "bg-white border-b border-neutral-100"
      }`} style={{ fontFamily: 'Poppins, sans-serif' }}>
        
        {/* 🌟 UI MATCH: Top Announcement Bar styled with minimal black backgrounds from your HTML */}
        {announcement?.global_settings?.announcement_active && (
  <div className="w-full bg-neutral-900 text-white text-[10px] sm:text-xs py-2.5 px-4 text-center font-semibold tracking-widest uppercase flex items-center justify-center gap-2">
    <span>✨</span>
    <span>{announcement.global_settings.announcement_message}</span>
    <span>✨</span>
  </div>
)}
        {/* Main Navbar Core */}
        <div className="w-full px-5 md:px-10 flex items-center justify-between h-[72px] md:h-[84px] relative">
          {/* Mobile hamburger — Left side on mobile viewports */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden relative h-10 w-10 flex items-center justify-center text-neutral-900 shrink-0 border border-neutral-100 rounded-full bg-white/80 shadow-xs hover:bg-neutral-50 transition-all"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Nav Links Desktop Left Row Layout */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.label === "Shop") {
                return (
                  <div key={link.href} className="relative group py-4">
                    <a href={link.href} className="text-[14px] font-semibold tracking-wide text-neutral-800 hover:text-[#c5a880] transition-colors flex items-center gap-1 uppercase">
                      {link.label} <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-300" />
                    </a>
                    {/* Dropdown Menu Container Panel Block */}
                    <div className="absolute top-full left-0 mt-1 w-[480px] bg-white border border-neutral-100 rounded-2xl shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 p-6 z-50 grid grid-cols-2 gap-6">
                      <div>
                        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Categories</p>
                        <div className="flex flex-col gap-1">
                          {jewelryCategories.map((cat: any) => (
                            <a key={cat.id} href={`/shop?category=${cat.id}`} className="block py-1.5 rounded-lg text-xs font-semibold text-neutral-600 hover:text-[#c5a880] transition-colors">
                              {cat.name}
                            </a>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Discover</p>
                        <div className="space-y-2.5">
                          <a href="/shop?filter=new-arrivals" className="block p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100/70 transition-colors">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-[#c5a880]">New Drop</span>
                            <p className="font-semibold text-neutral-800 text-xs mt-0.5" style={{ fontFamily: 'Playfair Display, serif' }}>New Arrivals</p>
                          </a>
                          <a href="/shop?filter=best-sellers" className="block p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100/70 transition-colors">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-[#c5a880]">Curated</span>
                            <p className="font-semibold text-neutral-800 text-xs mt-0.5" style={{ fontFamily: 'Playfair Display, serif' }}>Featured Pieces</p>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <a key={link.href} href={link.href} className="text-[14px] font-semibold tracking-wide text-neutral-800 hover:text-[#c5a880] transition-colors relative group uppercase">
                  {link.label}
                  <span className="absolute left-0 -bottom-1 h-[1.5px] w-0 bg-[#c5a880] group-hover:w-full transition-all duration-300" />
                </a>
              );
            })}
          </div>

          {/* 🌟 UI MATCH: Centered Logo Element layout from your HTML spec sheet */}
          <a 
            href="/" 
            className="flex items-center justify-center select-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-12 md:h-16 w-36 md:w-48 hover:opacity-90 transition-opacity"
          >
            <Image
              src="/assets/img/boujee-bazaar-logo.png" // 👈 Set your exact path string here (e.g. "/assets/img/logo.png" or your live Cloudinary URL link string)
              alt="The Boujee Bazaar Premium Luxury Fine Jewelry Logo"
              fill
              sizes="(max-width: 768px) 144px, 192px"
              className="object-contain"
              priority
            />
          </a>

          {/* Nav Icons Right Row Desktop Layout */}
          <div className="hidden lg:flex items-center gap-5">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search jewels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-44 bg-neutral-100 border border-neutral-300 rounded-full py-1.5 pl-4 pr-9 text-xs focus:outline-none focus:ring-1 focus:ring-[#c5a880] focus:border-[#c5a880] transition-all placeholder:text-neutral-500 font-medium text-neutral-900 shadow-inner"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#c5a880] transition-colors">
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
            <a href="/wishlist" className="text-neutral-800 hover:text-[#c5a880] relative transition-colors p-1" title="Wishlist">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-neutral-900 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </a>

            {/* Shopping Bag Counter styled with your minimal black/gold counters */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center justify-center h-10 w-10 rounded-full bg-neutral-900 text-white shadow-md hover:bg-neutral-800 transition-all shrink-0"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#c5a880] text-neutral-900 text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {user && (
              <div className="flex items-center gap-3 shrink-0 pl-1 border-l border-neutral-100">
                
                <a href="/profile" title="Manage Profile" className="text-neutral-800 hover:text-[#c5a880] transition-colors p-1">
                  <User className="w-5 h-5" />
                </a>
              </div>
            )}

            {user ? (
              <button
                onClick={async () => {
                  const supabase = createClient();
                  await supabase.auth.signOut();
                  localStorage.removeItem('boujee-customer-profile');
                  setUser(null);
                  window.location.reload();
                }}
                className="px-5 py-1.5 rounded-full border border-neutral-900 text-neutral-900 text-xs font-semibold hover:bg-neutral-50 transition-colors"
              >
                Logout
              </button>
            ) : (
              <a href="/login" className="px-5 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-xs">
                Login
              </a>
            )}
          </div>

          {/* Mobile cart / icons — Right side on mobile viewports only */}
          <div className="lg:hidden flex items-center gap-3">
            <a href="/wishlist" className="text-neutral-900 hover:text-[#c5a880] relative p-1" title="Wishlist">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-neutral-900 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </a>
            
            <button
              onClick={() => setCartOpen(true)}
              className="relative h-9 w-10 flex items-center justify-center rounded-full bg-neutral-900 text-white shadow-sm shrink-0"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#c5a880] text-neutral-900 text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile slide-out drawer navigational panel menu */}
        <div className={`lg:hidden fixed inset-x-0 top-[108px] bottom-0 bg-white z-50 border-t border-neutral-100 transition-all duration-300 ${
          open ? "block opacity-100 pointer-events-auto" : "hidden opacity-0 pointer-events-none"
        }`}>
          <nav className="flex flex-col px-6 pt-4 gap-1 overflow-y-auto max-h-[calc(100vh-120px)]">
            {navLinks.map((link, i) => {
              if (link.label === "Shop") {
                return (
                  <div key={link.href} className="border-b border-neutral-100 py-3">
                    <button
                      onClick={() => setMobileCollectionOpen(!mobileCollectionOpen)}
                      className="w-full flex items-center justify-between text-lg font-bold text-neutral-900 text-left"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className={`w-5 h-5 text-[#c5a880] transition-transform duration-200 ${mobileCollectionOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileCollectionOpen && (
                      <div className="pl-3 mt-2.5 space-y-3 flex flex-col animate-fade-in">
                        <div className="grid grid-cols-2 gap-3">
                          {jewelryCategories.map((cat: any) => (
                            <a key={cat.id} href={`/shop?category=${cat.id}`} onClick={() => setOpen(false)} className="text-xs font-semibold text-neutral-600 hover:text-[#c5a880]">
                              {cat.name}
                            </a>
                          ))}
                        </div>
                        <div className="flex flex-col gap-2 pt-2 border-t border-neutral-50">
                          <a href="/shop?filter=new-arrivals" onClick={() => setOpen(false)} className="text-xs font-bold text-neutral-800">New Arrivals</a>
                          <a href="/shop?filter=best-sellers" onClick={() => setOpen(false)} className="text-xs font-bold text-neutral-800">Featured Pieces</a>
                          <a href="/shop" onClick={() => setOpen(false)} className="text-xs font-bold text-[#c5a880] uppercase tracking-wider">Shop All Collections</a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-lg font-bold text-neutral-900 py-3 border-b border-neutral-100 font-display" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {link.label}
                </a>
              );
            })}
            
            {user && (
              <div className="flex flex-col border-b border-neutral-100 py-1">
                {isAdmin && (
                  <a href="/admin" onClick={() => setOpen(false)} className="text-sm font-semibold text-[#c5a880] py-2.5 flex items-center justify-between">
                    <span>Admin Dashboard</span> <ShieldAlert className="w-4 h-4" />
                  </a>
                )}
                <a href="/profile" onClick={() => setOpen(false)} className="text-sm font-semibold text-[#c5a880] py-2.5 flex items-center justify-between">
                  <span>Manage Profile</span> <User className="w-4 h-4" />
                </a>
              </div>
            )}

            <div className="pt-4 flex flex-col gap-4">
              {user ? (
                <button
                  onClick={async () => {
                    const supabase = createClient();
                    await supabase.auth.signOut();
                    localStorage.removeItem('boujee-customer-profile');
                    setUser(null);
                    setOpen(false);
                    window.location.reload();
                  }}
                  className="w-full py-2.5 rounded-xl border border-neutral-900 text-neutral-900 text-xs font-bold shadow-xs"
                >
                  Logout
                </button>
              ) : (
                <a href="/login" onClick={() => setOpen(false)} className="w-full py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-bold text-center shadow-xs">
                  Login / Register
                </a>
              )}
              <div className="text-center text-[11px] text-neutral-400 mt-2 space-y-0.5">
                <p>{SITE.phone}</p>
                <p>{SITE.email}</p>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} shipping={shipping} />
    </>
  );
}

// import type { Metadata } from "next";
// import { Plus_Jakarta_Sans, Bricolage_Grotesque } from "next/font/google";
// import "./globals.css";
// import { CartProvider } from "@/context/CartContext";
// import { ToastProvider } from "@/context/ToastContext";

// const jakarta = Plus_Jakarta_Sans({
//   subsets: ["latin"],
//   variable: "--jakarta",
//   weight: ["400", "500", "600", "700", "800"],
//   display: "swap",
// });

// const bricolage = Bricolage_Grotesque({
//   subsets: ["latin"],
//   variable: "--bricolage",
//   weight: ["500", "600", "700", "800"],
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: "Gulshan Modest | Modest Fashion, Quietly Elevated",
//   description:
//     "Gulshan Modest crafts abayas, hijabs and modest essentials with botanical detailing, premium fabric and timeless silhouettes. Shop the new collection online, across Delhi NCR and pan-India.",
//   keywords: [
//     "Gulshan Modest",
//     "modest fashion",
//     "abaya",
//     "hijab",
//     "modest wear India",
//   ],
//   icons: {
//     icon: '/logo-dark.webp',
//     apple: '/logo-dark.webp',
//   },
//   openGraph: {
//     title: "Gulshan Modest | Modest Fashion, Quietly Elevated",
//     description:
//       "Abayas, hijabs and modest essentials crafted with botanical detailing and premium fabric.",
//     type: "website",
//   },
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" className={`${jakarta.variable} ${bricolage.variable}`}>
//       <body className="font-body bg-cream text-ink antialiased">
//         <ToastProvider>
//           <CartProvider>
//             {children}
//           </CartProvider>
//         </ToastProvider>
//       </body>
//     </html>
//   );
// }

// app/layout.tsx
import type { Metadata } from 'next'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { ToastProvider } from '@/context/ToastContext'
// import { AuthProvider } from '@/context/AuthContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Boujee Bazaar',
  description: 'Minimal & Luxury Jewelry - Anti-tarnish, waterproof, hypoallergenic jewelry for the modern woman',
  robots: 'index, follow',
  openGraph: {
    title: 'The Boujee Bazaar',
    description: 'Premium minimal jewelry for everyday wear',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        {/* Preconnect for Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        
        {/* Google Fonts - Boujee fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;0,800;1,400&family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />

        {/* Font Awesome Icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>

      <body className="overflow-x-hidden w-full antialiased bg-white">
         {/* <AuthProvider>  */}
          <ToastProvider>
            <WishlistProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </WishlistProvider>
          </ToastProvider>
         {/* </AuthProvider> */}
      </body>
    </html>
  )
}

// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "The Boujee Bazaar | Minimal & Luxury Jewelry",
//   description: "Anti-tarnish • Waterproof • Hypoallergenic jewelry.",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <head>
//         {/* Google Fonts */}
//         <link rel="preconnect" href="https://googleapis.com" />
//         <link rel="preconnect" href="https://gstatic.com" crossOrigin="anonymous" />
//         <link
//           href="https://googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;0,800;1,400&family=Playfair+Display:ital,wght@0,600;0,800;1,600&display=swap"
//           rel="stylesheet"
//         />
//         {/* Font Awesome Icons */}
//         <link
//           rel="stylesheet"
//           href="https://cloudflare.com"
//         />
//         {/* Your Boujee Bazaar Global Stylesheet */}
//         <link rel="stylesheet" href="/assets/css/style.css" />
//       </head>
//       <body>
//         {children}
//       </body>
//     </html>
//   );
// }

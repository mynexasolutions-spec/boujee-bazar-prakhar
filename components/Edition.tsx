'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function LimitedEdition() {
  return (
    // Limited Edition Collection Banner Container adapted for your dropdown grid tree
    <div className="limited-edition hero-slider w-full overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-900 text-white shadow-md">
      <div className="slides-container w-full">
        <div className="slide active grid grid-cols-12 items-center relative min-h-[220px]">
          
          {/* Left Text Block Side Panel Frame (Takes up 7 grid column slots) */}
          <div className="hero-content col-span-7 p-5 z-10 text-left space-y-2.5">
            <p className="hero-subtitle text-[10px] font-bold tracking-[0.25em] text-[#c5a880] uppercase">
              LIMITED EDITION
            </p>
            <h1 className="hero-title font-bold text-lg md:text-xl text-white leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              The Celestial <br />
              <span className="highlight-text text-[#c5a880] italic">Collection.</span>
            </h1>
            <p className="hero-desc text-[11px] text-neutral-300 leading-relaxed max-w-[190px]">
              Inspired by the stars. Handcrafted for you.<br />
              Available for a limited time only.
            </p>
            <Link 
              href="/shop?collection=celestial"
              className="btn-primary inline-flex items-center gap-1.5 px-4 py-2 mt-1.5 bg-white text-neutral-900 text-[10px] font-bold rounded-lg uppercase tracking-wider hover:bg-neutral-100 transition-colors shadow-sm shrink-0"
            >
              SHOP THE DROP <span className="text-xs">✨</span>
            </Link>
          </div>

          {/* Right Image Frame Container Panel Block (Takes up 5 grid column slots) */}
          <div className="hero-image col-span-5 relative h-full min-h-[220px] w-full bg-neutral-800 shrink-0">
            <div className="hero-overlay absolute inset-0 bg-gradient-to-r from-neutral-900 via-transparent to-transparent z-10 pointer-events-none" />
            <Image
              src="/assets/img/demos_insta/demo_9.jpeg" // 👈 Safely points to your native local asset image path
              alt="Limited Edition Jewelry Celestial Drop Collection"
              fill
              sizes="(max-width: 1024px) 150px, 240px"
              className="object-cover object-center"
              priority
            />
          </div>

        </div>
      </div>
    </div>
  )
}

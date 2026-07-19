'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function About() {
  return (
    <section className="w-full px-5 md:px-10 pb-16 md:pb-24 bg-[#FFFdf9]">
      <div className="w-full max-w-[1500px] mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          
          {/* Left: Image with rounded corners */}
          <div className="relative w-full aspect-[4/3] md:aspect-[3/2] rounded-[32px] overflow-hidden shadow-sm">
            <Image
              src="/assets/img/about-us.webp"
              alt="The Boujee Bazaar packaging and jewelry"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Right: Content */}
          <div className="flex flex-col items-start pl-0 md:pl-4">
            <div className="flex flex-col items-start justify-center mb-5">
              <h2 className="text-[22px] md:text-[32px] font-[800] tracking-[2px] flex flex-wrap items-center justify-start gap-x-[10px] text-neutral-900 font-['Poppins'] uppercase text-left">
                MADE FOR YOU, <span className="text-[#f5a24a] italic font-['Playfair_Display']">BY US.</span> ✨
              </h2>
            </div>
            
            <p className="mt-5 text-[15px] md:text-[16px] text-neutral-600 font-medium leading-[1.7] max-w-md tracking-wide">
              The Boujee Bazaar is more than just jewelry. <br className="hidden md:block" />
              It's a vibe. A feeling. A little luxury you <br className="hidden md:block" />
              deserve every day.
            </p>
            
            <Link 
              href="/about" 
              className="mt-8 bg-black text-white rounded-full px-8 py-3.5 font-bold text-[12px] md:text-[13px] tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all shadow-md group"
            >
              ABOUT US
              {/* Four point star / sparkle icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1 group-hover:rotate-45 transition-transform duration-300">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}

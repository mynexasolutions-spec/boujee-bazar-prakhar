'use client'

import React from 'react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#FBF7F0] pt-16 pb-8 border-t border-neutral-200" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="w-full px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Brand & Socials - spans 2 columns on large screens to give logo space */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <div className="flex flex-col items-start select-none">
              {/* If you want to use the image logo instead, replace this with the Image tag */}
              <div className="text-3xl font-bold tracking-tight text-neutral-900 leading-none" style={{ fontFamily: 'Playfair Display, serif' }}>
                the<span className="text-[#c5a880]">boujee</span>
              </div>
              <div className="text-3xl font-bold tracking-tight text-neutral-900 leading-none ml-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                bazaar<span className="text-[#c5a880]">.</span>
              </div>
            </div>
            
            <p className="mt-5 text-neutral-600 text-[15px] leading-relaxed max-w-xs text-left">
              Minimal jewelry for the <br />maximal you. ✨
            </p>
            
            <div className="mt-6 flex items-center gap-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:bg-[#c5a880] hover:text-white hover:border-[#c5a880] transition-colors">
                <i className="fa-brands fa-instagram text-lg"></i>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:bg-[#c5a880] hover:text-white hover:border-[#c5a880] transition-colors">
                <i className="fa-brands fa-pinterest-p text-lg"></i>
              </a>
              <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:bg-[#c5a880] hover:text-white hover:border-[#c5a880] transition-colors">
                <i className="fa-brands fa-whatsapp text-lg"></i>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-widest mb-5">SHOP</h4>
            <ul className="space-y-3.5">
              <li><a href="/shop" className="text-[14px] text-neutral-600 hover:text-[#c5a880] transition-colors font-medium">All Products</a></li>
              <li><a href="/shop?category=rings" className="text-[14px] text-neutral-600 hover:text-[#c5a880] transition-colors font-medium">Rings</a></li>
              <li><a href="/shop?category=earrings" className="text-[14px] text-neutral-600 hover:text-[#c5a880] transition-colors font-medium">Earrings</a></li>
              <li><a href="/shop?category=necklaces" className="text-[14px] text-neutral-600 hover:text-[#c5a880] transition-colors font-medium">Necklaces</a></li>
              <li><a href="/shop?category=watches" className="text-[14px] text-neutral-600 hover:text-[#c5a880] transition-colors font-medium">Watches</a></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-widest mb-5">HELP & SUPPORT</h4>
            <ul className="space-y-3.5">
              <li><a href="/faq" className="text-[14px] text-neutral-600 hover:text-[#c5a880] transition-colors font-medium">FAQs</a></li>
              <li><a href="/about" className="text-[14px] text-neutral-600 hover:text-[#c5a880] transition-colors font-medium">About Us</a></li>
              <li><a href="/contact" className="text-[14px] text-neutral-600 hover:text-[#c5a880] transition-colors font-medium">Contact Us</a></li>
              <li><a href="/track-order" className="text-[14px] text-neutral-600 hover:text-[#c5a880] transition-colors font-medium">Track Your Order</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-widest mb-5">LEGAL</h4>
            <ul className="space-y-3.5">
              <li><a href="/policies/shipping" className="text-[14px] text-neutral-600 hover:text-[#c5a880] transition-colors font-medium">Shipping Policy</a></li>
              <li><a href="/policies/return-exchange" className="text-[14px] text-neutral-600 hover:text-[#c5a880] transition-colors font-medium">Return & Exchange Policy</a></li>
              <li><a href="/policies/privacy" className="text-[14px] text-neutral-600 hover:text-[#c5a880] transition-colors font-medium">Privacy Policy</a></li>
              <li><a href="/policies/terms" className="text-[14px] text-neutral-600 hover:text-[#c5a880] transition-colors font-medium">Terms & Conditions</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section with Newsletter and Copyright */}
        <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-widest mb-2">NEWSLETTER</h4>
            <p className="text-[14px] text-neutral-600 mb-4 font-medium">Be the first to know about new arrivals!</p>
            <form className="flex w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                required 
                className="flex-1 bg-white border border-neutral-300 rounded-l-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#c5a880] focus:border-[#c5a880]"
              />
              <button 
                type="submit"
                className="bg-[#c5a880] text-white px-5 py-2.5 rounded-r-md hover:bg-[#b09672] transition-colors flex items-center justify-center"
              >
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </form>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <h4 className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">SECURE PAYMENTS</h4>
            <div className="flex gap-3 text-3xl text-neutral-400">
              <i className="fa-brands fa-cc-visa" title="Visa"></i>
              <i className="fa-brands fa-cc-mastercard" title="Mastercard"></i>
              <i className="fa-brands fa-cc-paypal" title="PayPal"></i>
              <i className="fa-solid fa-credit-card" title="Banking"></i>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-[13px] text-neutral-400 font-medium">
          <p>&copy; {new Date().getFullYear()} The Boujee Bazaar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

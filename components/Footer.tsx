'use client'

import React from 'react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="logo">
            <div className="logo-top">the<span className="highlight">boujee</span></div>
            <div className="logo-bottom">bazaar<span className="highlight">.</span></div>
          </div>
          <p style={{ marginTop: "15px" }}>Minimal jewelry for the <br />maximal you. ✨</p>
          <div className="social-icons" style={{ marginTop: "15px", display: "flex", gap: "15px" }}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-pinterest-p"></i></a>
            <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer"><i className="fa-brands fa-whatsapp"></i></a>
          </div>
        </div>

        <div className="footer-links">
          <h4>SHOP</h4>
          <ul>
            <li><a href="/shop">All Products</a></li>
            <li><a href="/shop?category=rings">Rings</a></li>
            <li><a href="/shop?category=earrings">Earrings</a></li>
            <li><a href="/shop?category=necklaces">Necklaces</a></li>
            <li><a href="/shop?category=watches">Watches</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>HELP & SUPPORT</h4>
          <ul>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/track-order">Track Your Order</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>LEGAL</h4>
          <ul>
            <li><a href="/policies/shipping">Shipping Policy</a></li>
            <li><a href="/policies/return-exchange">Return & Exchange Policy</a></li>
            <li><a href="/policies/privacy">Privacy Policy</a></li>
            <li><a href="/policies/terms">Terms & Conditions</a></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4>NEWSLETTER</h4>
          <p>Be the first to know about new arrivals!</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit"><i className="fa-solid fa-arrow-right"></i></button>
          </form>
          
          <h4 style={{ marginTop: '20px', fontSize: '10px' }}>SECURE PAYMENTS</h4>
          <div className="payment-icons" style={{ marginTop: "10px", display: "flex", gap: "10px", fontSize: "1.5rem", color: "#666" }}>
            <i className="fa-brands fa-cc-visa" title="Visa"></i>
            <i className="fa-brands fa-cc-mastercard" title="Mastercard"></i>
            <i className="fa-brands fa-cc-rupay" title="Rupay"></i>
            <i className="fa-solid fa-credit-card" title="UPI / Banking"></i>
          </div>
        </div>
      </div>
      <div className="footer-bottom" style={{ borderTop: "1px solid #eee", marginTop: "40px", paddingTop: "20px", textAlign: "center", fontSize: "0.9rem", color: "#999" }}>
        <p>&copy; {new Date().getFullYear()} The Boujee Bazaar. All rights reserved.</p>
      </div>
    </footer>
  );
}

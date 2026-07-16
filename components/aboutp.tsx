// components/About.tsx

'use client'
import Link from 'next/link'
export default function About() {
  return (
    <section className="made-for-you-modern">
      <div className="mfy-modern-container">
        {/* About Content - from index.html */}
        <div className="mfy-modern-content">
          <div className="mfy-modern-badge">ABOUT US</div>
          <h2 className="mfy-modern-title">
            MADE FOR YOU, <br />
            <span className="highlight-text">BY US.</span> ✨
          </h2>
          <p className="mfy-modern-desc">
            The Boujee Bazaar is more than just jewelry. <br />
            It's a vibe. A feeling. A little luxury you deserve every day.
          </p>
          <Link 
  href="/about" 
  className="btn-primary mfy-modern-btn inline-flex items-center gap-2"
>
  DISCOVER OUR STORY <i className="fa-solid fa-arrow-right"></i>
</Link>
        </div>

        {/* About Image - from index.html */}
        <div className="mfy-modern-image-wrapper">
          <div className="mfy-modern-image-backdrop"></div>
          <img
            className="mfy-modern-img main-img"
            src="assets/img/insta_img/insta_15.jpeg"
            alt="Packaging"
          />
          <div className="mfy-modern-floating-logo">
            <span>
              the<strong className="highlight-text">boujee</strong>
            </span>
            <span>bazaar.</span>
          </div>
        </div>
      </div>
    </section>
  )
}

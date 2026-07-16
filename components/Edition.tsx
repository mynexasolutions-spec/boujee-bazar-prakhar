'use client'

import { useRouter } from 'next/navigation'

export default function LimitedEdition() {
  const router = useRouter()

  const handleNavigation = () => {
    // Smoothly routes shoppers straight to your curated celestial collection page
    router.push('/shop?collection=celestial')
  }

  return (
    // 🌟 EXACT STRUCTURE MATCH: Restored your clean class tokens natively
    <section className="limited-edition hero-slider w-full select-none">
      <div className="slides-container">
        <div className="slide active">
          
          {/* Left Text Block Curation Details Panel */}
          <div className="hero-content">
            <p className="hero-subtitle">LIMITED EDITION</p>
            <h1 className="hero-title">
              The Celestial <br />
              <span className="highlight-text">Collection.</span>
            </h1>
            <p className="hero-desc">
              Inspired by the stars. Handcrafted for you.<br />
              Available for a limited time only.
            </p>
            <button 
              type="button"
              onClick={handleNavigation}
              className="btn-primary"
            >
              SHOP THE DROP <span>✨</span>
            </button>
          </div>

          {/* Right Floating Image Cover Frame */}
          <div className="hero-image">
            <div className="hero-overlay"></div>
            <img
              src="/assets/img/demos_insta/demo_9.jpeg" // Points directly to your local file system image asset path
              alt="Limited Edition Jewelry Celestial Drop Collection"
              loading="eager"
            />
          </div>

        </div>
      </div>
    </section>
  )
}

'use client'

import { useRouter } from 'next/navigation'

interface LimitedEditionProps {
  // ✅ Accepts your standalone database banner string prop
  bannerUrl?: string 
}

export default function LimitedEdition({ bannerUrl }: LimitedEditionProps) {
  const router = useRouter()

  const handleNavigation = () => {
    router.push('/shop?collection=celestial')
  }

  // Fallback to local asset if database value isn't loaded or configured yet
  const resolvedImage = bannerUrl || "/assets/img/demos_insta/demo_9.jpeg"

  return (
    <section className="limited-edition hero-slider select-none">
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
              src={resolvedImage} // ✅ Bound directly to your live database URL
              alt="Limited Edition Jewelry Celestial Drop Collection"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

        </div>
      </div>
    </section>
  )
}

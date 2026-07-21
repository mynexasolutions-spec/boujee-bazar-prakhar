'use client'

import { useState, useEffect } from 'react'

interface HeroSlide {
  subtitle: string
  title: string
  highlight: string
  description: string
  cta: string
  image: string
  altImage?: string
  button_link?: string
}

export default function Hero({ slides: dbSlides }: { slides?: any[] }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Hardcoded fallback slides
  const fallbackSlides: HeroSlide[] = [
    {
      subtitle: 'MINIMAL. TIMELESS. YOU.',
      title: 'Jewelry that ',
      highlight: 'completes you.',
      description: 'Anti-tarnish • Waterproof • Hypoallergenic Made to shine, every single day.',
      cta: 'SHOP NOW ✨',
      image: 'assets/img/slider_1.jpeg',
    },
    {
      subtitle: 'LUXURY. BEAUTY. FOREVER.',
      title: 'Shine with ',
      highlight: 'elegance.',
      description: '18k Gold Plated • Premium Quality Designed for the modern woman.',
      cta: 'DISCOVER MORE ✨',
      image: 'assets/img/pr_1.jpeg',
      altImage: 'Elegant Gold Necklace',
    },
    {
      subtitle: 'BOLD. CHIC. CONFIDENT.',
      title: 'Perfect for ',
      highlight: 'every occasion.',
      description: 'Handcrafted • Ethical • Sustainable Express your unique style.',
      cta: 'SHOP NEW ARRIVALS ✨',
      image: 'assets/img/pr_3.jpeg',
      altImage: 'Premium Earrings',
    },
  ]

  // ✅ FIXED: Added missing array structures and map parameters loop handlers cleanly
  const slides: HeroSlide[] = dbSlides && dbSlides.length > 0
    ? dbSlides.map((slide: any, idx: number) => {
        const textVariations = [
          {
            subtitle: 'MINIMAL. TIMELESS. YOU.',
            title: 'Jewelry that ',
            highlight: 'completes you.',
            description: 'Anti-tarnish • Waterproof • Hypoallergenic. Made to shine, every single day.'
          },
          {
            subtitle: 'LUXURY. BEAUTY. FOREVER.',
            title: 'Shine with ',
            highlight: 'elegance.',
            description: '18k Gold Plated • Premium Quality. Designed for the modern woman.'
          },
          {
            subtitle: 'BOLD. CHIC. CONFIDENT.',
            title: 'Perfect for ',
            highlight: 'every occasion.',
            description: 'Handcrafted • Ethical • Sustainable. Express your unique style.'
          }
        ]

        const currentVariation = textVariations[idx % textVariations.length]

        return {
          subtitle: slide.subtitle || currentVariation.subtitle,
          title: slide.title 
            ? slide.title.split(' ').slice(0, -1).join(' ') + ' ' 
            : currentVariation.title,
          highlight: slide.title 
            ? slide.title.split(' ').slice(-1)[0] 
            : currentVariation.highlight,
          description: slide.description || currentVariation.description,
          cta: slide.button_text || 'SHOP NOW ✨',
          image: slide.url || slide.image_url || 'assets/img/slider_1.jpeg',
          button_link: slide.button_link || '/shop'
        }
      })
    : fallbackSlides

  // Auto slide every 5 seconds
  useEffect(() => {
    if (slides.length <= 1) return
    const sliderInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(sliderInterval)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const handleCtaClick = (link?: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = link || '/shop'
    }
  }

  return (
    <section className="hero-slider">
      {/* Slides Container */}
      <div 
        className="slides-container" 
        id="heroSlides"
        style={{
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`slide ${idx === currentSlide ? 'active' : ''}`}
            style={{ minWidth: '100%' }}
          >
            <div className="hero-content">
              <p className="hero-subtitle">{slide.subtitle}</p>
              <h1 className="hero-title">
                {slide.title}
                <br />
                <span className="highlight-text">{slide.highlight}</span>
              </h1>
              <p className="hero-desc">
                {slide.description}
              </p>
              <button className="btn-primary" onClick={() => handleCtaClick(slide.button_link)}>
                {slide.cta}
              </button>
            </div>

            <div className="hero-image">
              <div className="hero-overlay"></div>
              <img
                src={slide.image}
                alt={slide.altImage || slide.title}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Slider Controls / Dots */}
      {slides.length > 1 && (
        <div className="slider-controls">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`slider-dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            ></button>
          ))}
        </div>
      )}
    </section>
  )
}

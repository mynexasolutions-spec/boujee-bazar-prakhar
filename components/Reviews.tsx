// components/Reviews.tsx
'use client'

interface Review {
  text: string
  reviewer: string
  image: string
}

export default function Reviews() {
  // Reviews data from index.html
  const reviews: Review[] = [
    {
      text: 'Absolutely in love with the quality! I\'ve been wearing my necklaces every day in the shower and they haven\'t tarnished at all. Highly recommend!',
      reviewer: 'Sarah J.',
      image: 'assets/img/demos_insta/demo_13.jpeg',
    },
    {
      text: 'The packaging is so luxurious, it feels like opening a high-end designer piece. The jewelry itself is stunning and so comfortable to wear.',
      reviewer: 'Priya M.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      text: 'Customer service was amazing when I needed to exchange a ring size. The new ring arrived so quickly and fits perfectly. Great brand!',
      reviewer: 'Emily R.',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      text: 'I get so many compliments on my earrings. They look so expensive but were actually so affordable. Very happy!',
      reviewer: 'Chloe B.',
      image: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      text: 'Obsessed with the new drop! The rings stack perfectly and the anti-tarnish feature actually works.',
      reviewer: 'Nina K.',
      image: 'https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      text: 'I bought a set for my best friend\'s birthday and she literally cried. The personalized note was such a sweet touch!',
      reviewer: 'Ava T.',
      image: 'https://images.pexels.com/photos/3310695/pexels-photo-3310695.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
  ]

  return (
    <section className="w-full py-16 md:py-20 bg-white overflow-hidden relative">
      <div className="w-full max-w-[1500px] mx-auto px-4 md:px-12">
        <div className="flex flex-col items-center justify-center mb-12">
          <h2 className="text-[22px] md:text-[27px] font-[800] tracking-[2px] flex flex-wrap items-center justify-center gap-x-[10px] text-neutral-900 font-['Poppins'] uppercase text-center">
            LOVED BY <span className="text-[#f5a24a] italic font-['Playfair_Display']">YOU</span> ✨
          </h2>
        </div>

        {/* Reviews Slider Container - from index.html */}
        <div className="reviews-slider-container">
          <div className="reviews-track" id="reviewsTrack">
            {/* Original Reviews */}
            {reviews.map((review, idx) => (
              <div key={idx} className="review-card">
                {/* Review Rating - from index.html */}
                <div className="review-rating">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>

                {/* Review Text - from index.html */}
                <p className="review-text">"{review.text}"</p>

                {/* Reviewer Info - from index.html */}
                <div className="reviewer-info">
                  <img src={review.image} alt={review.reviewer} />
                  <span>{review.reviewer}</span>
                </div>
              </div>
            ))}

            {/* Duplicated Reviews for Infinite Loop - from index.html */}
            {reviews.map((review, idx) => (
              <div key={`dup-${idx}`} className="review-card">
                <div className="review-rating">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>

                <p className="review-text">"{review.text}"</p>

                <div className="reviewer-info">
                  <img src={review.image} alt={review.reviewer} />
                  <span>{review.reviewer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

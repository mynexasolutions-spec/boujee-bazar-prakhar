// components/Reviews.tsx
'use client'
import { UserCircle2 } from 'lucide-react'
interface Review {
  text: string
  reviewer: string
  // image: string
}

export default function Reviews() {
  // Reviews data from index.html
  const reviews: Review[] = [
  {
    text: "I ordered this necklace for my sister's birthday and it looked even better than the pictures. The finish is really premium and delivery was on time.",
    reviewer: "Ananya Sharma",
  },
  {
    text: "Honestly, I wasn't expecting this quality at this price. I've been wearing these earrings almost every day and they still look brand new.",
    reviewer: "Riya Gupta",
  },
  {
    text: "The bracelet is very elegant and lightweight. Perfect for office as well as family functions. Really happy with my purchase.",
    reviewer: "Sneha Verma",
  },
  {
    text: "Beautiful packaging and excellent quality. It feels like a premium brand. Will definitely order again.",
    reviewer: "Aditi Mehta",
  },
  {
    text: "Bought a ring for my wife on our anniversary and she absolutely loved it. The size was perfect and the design is very classy.",
    reviewer: "Rahul Agarwal",
  },
  {
    text: "Customer support was very helpful when I had a small query before ordering. The whole experience was smooth and hassle-free.",
    reviewer: "Karan Malhotra",
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
  <div className="reviewer-avatar">
    <UserCircle2 size={34} strokeWidth={1.8} />
  </div>
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
  <div className="reviewer-avatar">
    <UserCircle2 size={34} strokeWidth={1.8} />
  </div>
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

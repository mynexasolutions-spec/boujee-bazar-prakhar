// components/FAQ.tsx
'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  // FAQ items from index.html
  const faqs: FAQItem[] = [
    {
      question: 'Is the jewelry waterproof?',
      answer: 'Yes! Our pieces are designed to withstand everyday wear, including water exposure. However, for maximum longevity, we recommend avoiding harsh chemicals.',
    },
    {
      question: 'Is it anti-tarnish?',
      answer: 'Absolutely. We use high-quality PVD plating which makes our jewelry highly resistant to tarnishing and fading.',
    },
    {
      question: 'What is your shipping time?',
      answer: 'Standard shipping takes 3-5 business days. Express shipping options are available at checkout for 1-2 day delivery.',
    },
    {
      question: 'What is the return policy?',
      answer: 'We offer a 14-day hassle-free return policy. Items must be in their original condition and packaging.',
    },
    {
      question: 'Do you offer a warranty?',
      answer: 'Yes, all our pieces come with a 6-month warranty against manufacturing defects.',
    },
  ]

  // FAQ Accordion Logic (from script.js)
  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section className="w-full py-16 md:py-20 bg-[#faf8f5] overflow-hidden relative faq-section">
      <div className="w-full max-w-[1500px] mx-auto px-4 md:px-12">
        {/* Section Title */}
        <div className="flex flex-col items-center justify-center mb-12">
          <h2 className="text-[22px] md:text-[27px] font-[800] tracking-[2px] flex flex-wrap items-center justify-center gap-x-[10px] text-neutral-900 font-['Poppins'] uppercase text-center">
            FREQUENTLY ASKED <span className="text-[#f5a24a] italic font-['Playfair_Display']">QUESTIONS</span> ✨
          </h2>
        </div>

        {/* FAQ Container - from index.html */}
        <div className="faq-container">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-item">
              {/* FAQ Question Button - from index.html + script.js */}
              <button
                className={`faq-question ${expandedIndex === idx ? 'active' : ''}`}
                onClick={() => toggleFAQ(idx)}
              >
                {faq.question}
                <i
                  className="fa-solid fa-chevron-down"
                  style={{
                    transform:
                      expandedIndex === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                ></i>
              </button>

              {/* FAQ Answer - from index.html */}
              {expandedIndex === idx && (
                <div
                  className="faq-answer"
                  style={{
                    maxHeight: expandedIndex === idx ? '500px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease',
                  }}
                >
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

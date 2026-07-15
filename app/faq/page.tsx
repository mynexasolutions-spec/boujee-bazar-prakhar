import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'

export const metadata = {
  title: 'FAQ | The Boujee Bazaar',
  description: 'Frequently asked questions about anti-tarnish jewelry, shipping, returns, and orders.',
}

export default function FAQPage() {
  const faqs = [
    {
      q: "Is the jewelry really anti-tarnish and waterproof?",
      a: "Yes! Our minimal luxury jewelry is made from premium materials like 316L Stainless Steel and Sterling Silver, plated with 18k gold using Physical Vapor Deposition (PVD). This process makes them anti-tarnish, hypoallergenic, and completely waterproof, allowing you to wear them in the shower or during workouts without losing shine."
    },
    {
      q: "How long does shipping take?",
      a: "Standard Pan-India orders are processed within 2-3 business days. Once dispatched, deliveries to Delhi NCR take 1-2 days, other metro cities take 3-4 days, and the rest of India takes 5-7 days."
    },
    {
      q: "What is your return and exchange policy?",
      a: "We offer a 7-day return and exchange policy on all unused and unwashed items with their original packaging and tags intact. Custom or personalized pieces and clearance sale items are final sales and cannot be returned."
    },
    {
      q: "How can I track my order?",
      a: "Once your order is shipped, we will send you a tracking link via email and WhatsApp. You can also visit our Track Your Order page and enter your order number and email to check live updates."
    },
    {
      q: "Do you offer Cash on Delivery (COD)?",
      a: "No, currently we only support secure pre-paid transactions (UPI, credit/debit cards, Net Banking, and wallets) to provide seamless dispatch."
    },
    {
      q: "How should I care for my jewelry?",
      a: "While our pieces are waterproof and anti-tarnish, we recommend wiping them gently with a soft microfiber cloth after wear to keep dust away. Avoid exposing them to harsh chemicals, perfume, or chlorine for prolonged periods to ensure maximum longevity."
    }
  ]

  return (
    <main className="overflow-x-hidden pt-[72px] md:pt-[84px] bg-white min-h-screen flex flex-col font-body">
      <Header />
      
      <div className="flex-1 max-w-3xl mx-auto w-full px-5 py-16 md:py-24">
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="eyebrow justify-center inline-flex items-center gap-2 text-[#c5a880] uppercase tracking-widest text-xs font-semibold">
            <span className="h-px w-6 bg-[#c5a880]/50" />
            Common Inquiries
            <span className="h-px w-6 bg-[#c5a880]/50" />
          </div>
          <h1 className="text-4xl font-display font-bold text-neutral-900 mt-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-neutral-500 text-sm">
            Everything you need to know about our minimal luxury pieces and service.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <details key={idx} className="group bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden open:bg-neutral-50/50 transition-colors">
              <summary className="font-semibold text-neutral-800 text-[15px] px-6 py-5 cursor-pointer flex justify-between items-center outline-none list-none hover:text-[#c5a880] transition-colors">
                {faq.q}
                <span className="text-neutral-400 transition-transform group-open:rotate-180 group-open:text-[#c5a880]">
                  <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18"><polyline points="6 9 12 15 18 9"/></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-neutral-600 text-sm leading-relaxed border-t border-neutral-100/50 pt-4">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>

      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}

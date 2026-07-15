import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'

export const metadata = {
  title: 'Return & Exchange Policy | The Boujee Bazaar',
  description: 'Learn about our 7-day returns, exchanges, and cancellations for anti-tarnish luxury jewelry.',
}

export default function ReturnExchangePolicy() {
  return (
    <main className="overflow-x-hidden pt-[72px] md:pt-[84px] bg-white min-h-screen flex flex-col font-body">
      <Header />
      
      <div className="flex-1 max-w-3xl mx-auto w-full px-5 py-16 md:py-24">
        <h1 className="font-display font-semibold text-3xl md:text-4xl text-neutral-900 mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
          Return & Exchange Policy
        </h1>
        
        <div className="prose prose-neutral prose-sm md:prose-base text-neutral-600 max-w-none space-y-6">
          <p>Last updated: {new Date().toLocaleDateString('en-IN')}</p>
          
          <h3 className="font-display font-semibold text-xl text-neutral-900 mt-8 mb-4">1. Cancellations</h3>
          <p>
            Orders can be cancelled within 24 hours of placement for a full refund. To cancel your order, please contact our support team on WhatsApp or via email immediately. Once an order has been dispatched from our facility, it cannot be cancelled.
          </p>

          <h3 className="font-display font-semibold text-xl text-neutral-900 mt-8 mb-4">2. 7-Day Returns & Exchanges</h3>
          <p>
            We offer a 7-day return and exchange window for items that are completely unused, unwashed, and have all original tags and premium brand packaging intact. If 7 days have gone by since your purchase was delivered, unfortunately, we cannot offer you a refund or exchange.
          </p>
          <p>To initiate a return or exchange, please message us on WhatsApp with your order number and photo of the items.</p>

          <h3 className="font-display font-semibold text-xl text-neutral-900 mt-8 mb-4">3. Refunds</h3>
          <p>
            Once your return is received and inspected at our studio, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed and automatically applied to your original method of payment within 5-7 business days.
          </p>

          <h3 className="font-display font-semibold text-xl text-neutral-900 mt-8 mb-4">4. Non-Returnable Items</h3>
          <p>
            Customized items, personalized initials, and clearance/sale items are non-returnable and non-refundable unless they are received damaged or defective.
          </p>
        </div>
      </div>

      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}

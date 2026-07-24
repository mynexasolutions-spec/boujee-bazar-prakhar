import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Image from 'next/image'; // 🌟 Added native Next.js Image module import

export const metadata = {
  title: 'Contact Us | The Boujee Bazaar',
  description: 'Get in touch with The Boujee Bazaar for any queries, orders, or support.',
}

export default function ContactPage() {
  return (
    <main className="overflow-x-hidden pt-[72px] md:pt-[84px] bg-white min-h-screen flex flex-col font-body">
      <Header />
      
      {/* Luxury Hero Banner for Contact Page with Background Image Asset */}
      <section className="relative w-full py-20 md:py-28 bg-neutral-900 flex items-center justify-center overflow-hidden border-b border-neutral-100">
        
        {/* 🌟 IMAGE INJECTION: Renders background banner with protective layer masking */}
        <Image
          src="/assets/img/slider_1.jpeg" // Keeps your slider_1 or swap with your specific asset like contact_hero.jpeg
          alt="The Boujee Bazaar Premium Customer Concierge Hub"
          fill
          className="object-cover opacity-50" // Controlled opacity ensures text remains highly legible
          priority
        />
        
        {/* Ambient Dark Premium Editorial Linear Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-neutral-900/60 to-black/80" />
        
        <div className="relative z-10 text-center px-5">
          <div className="eyebrow justify-center inline-flex items-center gap-2 mb-3 text-[#c5a880] uppercase tracking-widest text-xs font-semibold">
            <span className="h-px w-6 bg-[#c5a880]/50" />
            Here to Help
            <span className="h-px w-6 bg-[#c5a880]/50" />
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-white tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            Contact Us
          </h1>
          <p className="mt-4 text-neutral-300 max-w-lg mx-auto text-sm md:text-base leading-relaxed font-medium">
            Have a question about our waterproof jewelry, custom charms, or an order? Reach out and we'll be happy to assist you.
          </p>
        </div>
      </section>

      <div className="flex-1 bg-white">
        <Contact />
      </div>
      
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}

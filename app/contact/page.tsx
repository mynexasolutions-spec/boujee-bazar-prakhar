import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata = {
  title: 'Contact Us | The Boujee Bazaar',
  description: 'Get in touch with The Boujee Bazaar for any queries, orders, or support.',
}

export default function ContactPage() {
  return (
    <main className="overflow-x-hidden pt-[72px] md:pt-[84px] bg-white min-h-screen flex flex-col font-body">
      <Header />
      
      {/* Hero Banner for Contact Page */}
      <section className="relative w-full py-16 md:py-24 bg-neutral-900 flex items-center justify-center overflow-hidden border-b border-neutral-100">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 opacity-90" />
        
        <div className="relative z-10 text-center px-5">
          <div className="eyebrow justify-center inline-flex items-center gap-2 mb-3 text-[#c5a880] uppercase tracking-widest text-xs font-semibold">
            <span className="h-px w-6 bg-[#c5a880]/50" />
            Here to Help
            <span className="h-px w-6 bg-[#c5a880]/50" />
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-white tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            Contact Us
          </h1>
          <p className="mt-4 text-neutral-300 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
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

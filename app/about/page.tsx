import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Story from "@/components/Story";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Image from "next/image";

export const metadata = {
  title: 'Our Story | The Boujee Bazaar',
  description: 'Discover the curation behind The Boujee Bazaar. Minimal, luxury, anti-tarnish jewelry designed to elevate your everyday statements.',
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Header />

<main className="flex-1 overflow-x-hidden pt-[72px] md:pt-[84px]">
  {/* Luxury Hero Banner */}
  <section className="relative w-full h-[250px] md:h-[340px] flex items-center justify-center overflow-hidden border-b border-neutral-100 bg-neutral-900">
    <Image
      src="/assets/img/insta_img/insta_2.png" // Replace with your preferred image
      alt="The Boujee Bazaar Story"
      fill
      priority
      className="object-cover opacity-70"
    />

    {/* Dark overlay + subtle luxury gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/40 via-transparent to-neutral-950/60" />

    <div className="relative z-10 text-center px-5 max-w-2xl mx-auto">
      <div className="inline-flex items-center gap-3 mb-4 text-[#c5a880] uppercase tracking-widest text-xs font-semibold">
        <span className="h-px w-6 bg-[#c5a880]/40" />
        Crafted To Last
        <span className="h-px w-6 bg-[#c5a880]/40" />
      </div>

      <h1
        className="text-4xl md:text-6xl font-bold text-white tracking-wide leading-tight"
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        The Boujee Story
      </h1>

      <p className="mt-4 text-neutral-300 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
        Redefining jewelry essentials. Waterproof, hypoallergenic statement
        bands and minimal layerings curated for effortless luxury.
      </p>
    </div>
  </section>

        {/* Core Presentation Content Container Block */}
        <div className="w-full">
          {/* 
            This dynamically invokes your global Story component. 
            Note: Remember to review components/Story.tsx next to ensure any 
            inner texts match these minimal luxury jewelry definitions!
          */}
          <Story />
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

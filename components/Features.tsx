'use client'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

export default function Features() {
  const features: Feature[] = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-neutral-800">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-4.478 6.096-7.5 10.354-7.5 13.5a7.5 7.5 0 1015 0c0-3.146-3.022-7.404-7.5-13.5z" />
        </svg>
      ),
      title: 'ANTI-TARNISH',
      description: 'Built to last, made to shine.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-neutral-800">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
      title: 'WATERPROOF',
      description: 'Wear it anywhere, anytime.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-neutral-800">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
        </svg>
      ),
      title: 'HYPOALLERGENIC',
      description: 'Gentle on your skin.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-neutral-800">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
      ),
      title: 'FAST SHIPPING',
      description: 'Delivered with love.',
    },
  ]

  return (
    <section className="w-full px-5 md:px-10 py-12 md:py-16 bg-[#FFFdf9]">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#FFF3E8] rounded-[32px] px-8 py-10 md:py-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          {features.map((feature, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center md:items-start md:flex-row gap-4 md:gap-5 w-full relative">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-transparent border-[1.5px] border-neutral-800">
                {feature.icon}
              </div>
              <div className="text-center md:text-left flex flex-col gap-1">
                <h4 className="text-[13px] md:text-[14px] font-bold text-neutral-900 tracking-wider font-['Poppins']">
                  {feature.title}
                </h4>
                <p className="text-[12px] md:text-[13px] text-neutral-600 font-medium tracking-wide">
                  {feature.description}
                </p>
              </div>
              
              {/* Divider for desktop */}
              {idx < features.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-neutral-200/60"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

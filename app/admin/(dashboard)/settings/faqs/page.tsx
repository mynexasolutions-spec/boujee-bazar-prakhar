// import { getGlobalFaqs } from '@/actions/global_faqs'
// import { GlobalFaqsEditor } from '@/components/admin/GlobalFaqsEditor'

// export const metadata = {
//   title: 'Global FAQs | The Boujee Bazaar Admin',
// }

// export default async function GlobalFaqsPage() {
//   const { data: initialFaqs } = await getGlobalFaqs()

//   return (
//     <div>
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-900">Global FAQs</h1>
//         <p className="mt-1 text-sm text-gray-500">
//           Manage the universal frequently asked questions that apply to your store.
//         </p>
//       </div>

//       <div className="bg-white p-6 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
//         <GlobalFaqsEditor initialFaqs={initialFaqs || []} />
//       </div>
//     </div>
//   )
// }
import { getGlobalFaqs } from '@/actions/global_faqs'
import { GlobalFaqsEditor } from '@/components/admin/GlobalFaqsEditor'

export const metadata = {
  title: 'Global FAQs | The Boujee Bazaar Admin',
}

export default async function GlobalFaqsPage() {
  // Fetch your data payload response safely
  const response = await getGlobalFaqs()
  
  // ✅ FIXED: Add a strict data array fallback extractor to prevent undefined crashes
  const initialFaqs = response?.success && Array.isArray(response.data) ? response.data : []

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Global FAQs</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage the universal frequently asked questions that apply live to your storefront viewport.
        </p>
      </div>

      <div className="bg-white p-6 border border-stone-200/60 sm:rounded-xl shadow-sm">
        <GlobalFaqsEditor initialFaqs={initialFaqs} />
      </div>
    </div>
  )
}


// import { getInquiries } from '@/actions/admin/inquiries'
// import { InquiriesList } from './_components/InquiriesList'

// export const metadata = {
//   title: 'Contact Inquiries | Admin Dashboard',
// }

// export default async function AdminInquiriesPage() {
//   const inquiries = await getInquiries()
//   const unreadCount = inquiries.filter(i => i.status === 'unread').length

//   return (
//     <div className="space-y-8">
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-stone-900 flex items-center gap-3">
//             Contact Inquiries
//             {unreadCount > 0 && (
//               <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
//                 {unreadCount} New
//               </span>
//             )}
//           </h1>
//           <p className="text-sm text-stone-500 mt-1">
//             Manage messages sent from the storefront contact page.
//           </p>
//         </div>
//       </div>

//       <InquiriesList initialInquiries={inquiries} />
//     </div>
//   )
// }
import { getInquiries } from '@/actions/admin/inquiries'
import { InquiriesList } from './_components/InquiriesList'

export const metadata = {
  title: 'Contact Inquiries | Admin Dashboard',
}

export default async function AdminInquiriesPage() {
  // 1. Fetch raw inquiries from your actions layer
  const rawInquiries = await getInquiries()
  
  // 2. ✅ FIXED: Add a strict array guarantee to prevent the '.filter is not a function' crash
  const inquiries = Array.isArray(rawInquiries) ? rawInquiries : []

  // 3. 🌟 FIXED: Map tracking logic to your real schema 'read' boolean column from Page 3
  const unreadCount = inquiries.filter(i => i.read === false || i.status === 'unread').length

  return (
    <div className="space-y-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 flex items-center gap-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Contact Inquiries
            {unreadCount > 0 && (
              // Swapped Gulshan's bright orange styling tokens for a minimal luxury amber/gold shade
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold uppercase tracking-wider">
                {unreadCount} New
              </span>
            )}
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Manage messages sent from the storefront contact page.
          </p>
        </div>
      </div>

      {/* Renders your inquiry overview presentation list */}
      <InquiriesList initialInquiries={inquiries} />
    </div>
  )
}

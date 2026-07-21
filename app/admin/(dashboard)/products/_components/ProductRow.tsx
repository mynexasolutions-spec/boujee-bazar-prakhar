// 'use client'

// import Link from 'next/link'
// import { Pencil, Trash2 } from 'lucide-react'
// import { deleteProduct } from '@/actions/products'
// import { useState, useTransition } from 'react'

// interface ProductWithCategory {
//   id: string
//   name: string
//   slug: string
//   short_description: string | null
//   featured_image_url?: string | null
//   image_url?: string | null
//   badge?: string | null
//   is_active: boolean
//   created_at: string
//   categories: { name: string } | null
// }

// export default function ProductRow({
//   product,
// }: {
//   product: ProductWithCategory
// }) {
//   const [isPending, startTransition] = useTransition()
//   const [deleted, setDeleted] = useState(false)

//   if (deleted) return null

//   const displayImage = product.image_url || product.featured_image_url

//   return (
//     <tr className="hover:bg-stone-50/50 transition-colors">
//       <td className="px-6 py-3.5">
//         <div className="flex items-center gap-3">
//           {displayImage ? (
//             <img
//               src={displayImage}
//               alt={product.name}
//               className="w-10 h-10 rounded-lg object-cover bg-stone-100"
//             />
//           ) : (
//             <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-400 text-xs font-medium">
//               IMG
//             </div>
//           )}
//           <div>
//             <p className="text-sm font-medium text-stone-900">{product.name}</p>
//             <p className="text-xs text-stone-400 mt-0.5">/{product.slug}</p>
//           </div>
//         </div>
//       </td>
//       <td className="px-6 py-3.5">
//         {product.categories ? (
//           <span className="text-sm text-stone-600">
//             {product.categories.name}
//           </span>
//         ) : (
//           <span className="text-xs text-stone-400 italic">Uncategorized</span>
//         )}
//       </td>
//       <td className="px-6 py-3.5">
//         {product.badge ? (
//           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
//             {product.badge}
//           </span>
//         ) : (
//           <span className="text-xs text-stone-400 italic">None</span>
//         )}
//       </td>
//       <td className="px-6 py-3.5">
//         <span
//           className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//             product.is_active
//               ? 'bg-green-100 text-green-700'
//               : 'bg-stone-100 text-stone-500'
//           }`}
//         >
//           {product.is_active ? 'Active' : 'Inactive'}
//         </span>
//       </td>
//       <td className="px-6 py-3.5 text-sm text-stone-500">
//         {new Date(product.created_at).toLocaleDateString('en-IN', {
//           day: 'numeric',
//           month: 'short',
//           year: 'numeric',
//         })}
//       </td>
//       <td className="px-6 py-3.5">
//         <div className="flex items-center justify-end gap-1">
//           <Link
//             href={`/admin/products/${product.id}/edit`}
//             className="p-2 rounded-lg text-stone-400 hover:text-orange-600 hover:bg-orange-50 transition-colors"
//           >
//             <Pencil className="w-4 h-4" />
//           </Link>
//           <button
//             disabled={isPending}
//             onClick={() => {
//               if (
//                 confirm(
//                   'Are you sure? This will also delete all variants, images, and FAQs for this product.'
//                 )
//               ) {
//                 startTransition(async () => {
//                   const result = await deleteProduct(product.id)
//                   if (result.success) setDeleted(true)
//                 })
//               }
//             }}
//             className="p-2 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
//           >
//             <Trash2 className="w-4 h-4" />
//           </button>
//         </div>
//       </td>
//     </tr>
//   )
// }

'use client'

import Link from 'next/link'
import { Pencil, Trash2, Loader2, AlertTriangle } from 'lucide-react' // 💡 Added AlertTriangle icon import
import { deleteProduct, updateProductPlacementStatus } from '@/actions/products'
import { useState, useTransition } from 'react'

export default function ProductRow({
  product,
}: {
  product: any 
}) {
  const [isPending, startTransition] = useTransition()
  const [isToggling, startToggleTransition] = useTransition()
  const [deleted, setDeleted] = useState(false)

  // Local state variables to provide instant UI feedback on click checkbox toggles
  const [newArrival, setNewArrival] = useState(product.is_new_arrival ?? false)
  const [bestSeller, setBestSeller] = useState(product.is_best_seller ?? false)

  if (deleted) return null

  const displayImage = product.image || product.featured_image_url
  
  // ✅ 1. Safe parsing of the inventory stock level parameter
  const stockLevel = product.stock !== null && product.stock !== undefined ? Number(product.stock) : 99

  const handleToggleStatus = (field: 'is_new_arrival' | 'is_best_seller', currentVal: boolean, setStatus: (v: boolean) => void) => {
    const newVal = !currentVal
    setStatus(newVal) // Instant local state switch for optimistic UI feedback

    startTransition(async () => {
      // Corrected from startToggleTransition to use standard component pending state hooks cleanly
      const res = await updateProductPlacementStatus(product.id, field, newVal)
      if (!res.success) {
        setStatus(currentVal) // Revert back on database write failure
        alert(`Failed to save placement settings: ${res.error}`)
      }
    })
  }

  return (
    <tr className="hover:bg-stone-50/50 transition-colors">
      {/* Product Image & Title Info Column */}
      <td className="px-6 py-3.5">
        <div className="flex items-center gap-3">
          
          {/* ✅ 2. FIXED: Wrapped image block inside a relative anchor to enable absolute warning overlays */}
          <div className="relative w-10 h-10 shrink-0">
            {displayImage ? (
              <img
                src={displayImage}
                alt={product.name}
                className="w-10 h-10 rounded-lg object-cover bg-stone-100"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-400 text-xs font-medium">
                IMG
              </div>
            )}

            {/* ✅ 3. FIXED: Conditional rendering logic for low stock alert badge overlays */}
            {stockLevel < 5 ? (
              /* CRITICAL ALERT TIER: Stock under 5 triggers a bright red background mark */
              <div 
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 border-2 border-white rounded-full flex items-center justify-center shadow-sm animate-pulse z-10"
                title={`Critical Inventory: Only ${stockLevel} items remaining!`}
              >
                <AlertTriangle className="w-2.5 h-2.5 text-white stroke-[3]" />
              </div>
            ) : stockLevel < 10 ? (
              /* WARNING ALERT TIER: Stock between 5 and 9 triggers a warm yellow warning mark */
              <div 
                className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 border-2 border-white rounded-full flex items-center justify-center shadow-sm z-10"
                title={`Low Inventory Warning: Only ${stockLevel} items remaining.`}
              >
                <AlertTriangle className="w-2.5 h-2.5 text-white stroke-[3]" />
              </div>
            ) : null}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-stone-900">{product.name}</p>
              {/* Optional inline badge tracking the true remainder inside details row */}
              {stockLevel < 10 && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${stockLevel < 5 ? 'text-red-600 bg-red-50' : 'text-amber-600 bg-amber-50'}`}>
                  Qty: {stockLevel}
                </span>
              )}
            </div>
            <p className="text-xs text-stone-400 mt-0.5">/{product.slug || product.id.substring(0, 8)}...</p>
          </div>
        </div>
      </td>

      {/* Curation Column 1: New Arrival Status Toggle */}
      <td className="px-6 py-3.5 text-center">
        <label className="inline-flex items-center justify-center cursor-pointer p-1">
          <input
            type="checkbox"
            checked={newArrival}
            disabled={isPending}
            onChange={() => handleToggleStatus('is_new_arrival', newArrival, setNewArrival)}
            className="w-4 h-4 rounded-md border-stone-300 text-neutral-900 focus:ring-[#c5a880] focus:ring-opacity-20 cursor-pointer disabled:opacity-40 accent-stone-900"
          />
        </label>
      </td>

      {/* Curation Column 2: Best Seller Status Toggle */}
      <td className="px-6 py-3.5 text-center">
        <label className="inline-flex items-center justify-center cursor-pointer p-1">
          <input
            type="checkbox"
            checked={bestSeller}
            disabled={isPending}
            onChange={() => handleToggleStatus('is_best_seller', bestSeller, setBestSeller)}
            className="w-4 h-4 rounded-md border-stone-300 text-neutral-900 focus:ring-[#c5a880] focus:ring-opacity-20 cursor-pointer disabled:opacity-40 accent-stone-900"
          />
        </label>
      </td>

      {/* Dynamic Availability Status Indicator */}
      <td className="px-6 py-3.5">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            product.is_active
              ? 'bg-green-100 text-green-700'
              : 'bg-stone-100 text-stone-500'
          }`}
        >
          {product.is_active ? 'Active' : 'Inactive'}
        </span>
      </td>

      {/* Date Created Column with Indian Date Formats */}
      <td className="px-6 py-3.5 text-sm text-stone-500">
        {product.created_at ? (
          new Date(product.created_at).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        ) : (
          <span className="text-stone-300">--</span>
        )}
      </td>

      {/* Actions Modification Triggers */}
      <td className="px-6 py-3.5">
        <div className="flex items-center justify-end gap-1">
          {isPending && <Loader2 className="w-4 h-4 animate-spin text-stone-400 mr-2" />}
          <Link
            href={`/admin/products/${product.id}/edit`}
            className="p-2 rounded-lg text-stone-400 hover:text-neutral-800 hover:bg-stone-100 transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </Link>
          <button
            disabled={isPending}
            onClick={() => {
              if (
                confirm(
                  'Are you sure? This will remove this item from your online store catalog.'
                )
              ) {
                startTransition(async () => {
                  const result = await deleteProduct(product.id)
                  if (result.success) setDeleted(true)
                })
              }
            }}
            className="p-2 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

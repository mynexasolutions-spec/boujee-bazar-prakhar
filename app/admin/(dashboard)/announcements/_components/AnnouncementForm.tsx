// 'use client'

// import { useState, useTransition } from 'react'
// import { saveAnnouncement } from '@/actions/admin/announcements'
// import { Check, Loader2, Megaphone } from 'lucide-react'

// export function AnnouncementForm({ 
//   initialMessage, 
//   initialIsActive 
// }: { 
//   initialMessage: string
//   initialIsActive: boolean 
// }) {
//   const [message, setMessage] = useState(initialMessage)
//   const [isActive, setIsActive] = useState(initialIsActive)
  
//   const [isPending, startTransition] = useTransition()
//   const [error, setError] = useState<string | null>(null)
//   const [success, setSuccess] = useState(false)

//   const handleSave = () => {
//     if (!message.trim() && isActive) {
//       setError('Message cannot be empty when announcement is active.')
//       return
//     }

//     setError(null)
//     setSuccess(false)
    
//     startTransition(async () => {
//       const result = await saveAnnouncement(message, isActive)

//       if (result.error) {
//         setError(result.error)
//       } else {
//         setSuccess(true)
//         setTimeout(() => setSuccess(false), 3000)
//       }
//     })
//   }

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-stone-200/60 p-6 sm:p-8">
      
//       {error && (
//         <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm font-medium rounded-xl">
//           {error}
//         </div>
//       )}

//       <div className="space-y-6">
        
//         {/* Toggle */}
//         <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-200/60">
//           <div>
//             <h3 className="font-bold text-stone-900">Enable Announcement Banner</h3>
//             <p className="text-sm text-stone-500">Show this banner to all visitors at the top of the store.</p>
//           </div>
//           <label className="relative inline-flex items-center cursor-pointer">
//             <input 
//               type="checkbox" 
//               className="sr-only peer"
//               checked={isActive}
//               onChange={(e) => setIsActive(e.target.checked)}
//               disabled={isPending}
//             />
//             <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neutral-900"></div>
//           </label>
//         </div>

//         {/* Message Input */}
//         <div>
//           <label className="block text-sm font-bold text-stone-700 mb-2">
//             Announcement Message
//           </label>
//           <div className="relative">
//             <Megaphone className="absolute left-4 top-3.5 w-5 h-5 text-stone-400" />
//             <input
//               type="text"
//               maxLength={255}
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="e.g., Free Shipping on all orders over ₹500!"
//               disabled={isPending}
//               className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#c5a880]/20 focus:border-[#c5a880] transition-all placeholder:text-stone-400"
//             />
//           </div>
//           <p className="text-xs text-stone-500 mt-g2">Keep it short and engaging for the best results.</p>
//         </div>

//         {/* Save Button */}
//         <div className="pt-4 border-t border-stone-100 flex items-center gap-4">
//           <button
//             onClick={handleSave}
//             disabled={isPending}
//             className="px-6 py-2.5 bg-stone-900 text-white text-sm font-bold rounded-xl hover:bg-stone-800 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[120px]"
//           >
//             {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
//           </button>
          
//           {success && (
//             <span className="flex items-center gap-2 text-sm font-medium text-green-600">
//               <Check className="w-4 h-4" />
//               Saved successfully!
//             </span>
//           )}
//         </div>

//       </div>
//     </div>
//   )
// }
'use client'
import { Plus, X } from 'lucide-react'
import { CldUploadWidget } from 'next-cloudinary'

import { useEffect, useState, useTransition } from 'react'
import { saveCompleteStoreConfig } from '@/actions/admin/announcements'
import { Check, Loader2, Megaphone, Store, Truck, ShieldCheck, Mail, Phone, MapPin, Image as ImageIcon, Tag, Layers } from 'lucide-react'

export function AnnouncementForm({ initialData }: { initialData: any }) {
  const [globalSettings, setGlobalSettings] = useState({
    store_name: initialData?.global_settings?.store_name || 'The Boujee Bazar',
    store_email: initialData?.global_settings?.store_email ,
    store_phone: initialData?.global_settings?.store_phone || '',
    store_address: initialData?.global_settings?.store_address || '',
    shipping_flat_rate: initialData?.global_settings?.shipping_flat_rate ?? 99,
    shipping_threshold: initialData?.global_settings?.shipping_threshold ?? 999,
    announcement_message: initialData?.global_settings?.announcement_message || '',
    announcement_active: initialData?.global_settings?.announcement_active ?? false,
    enable_cod: initialData?.global_settings?.enable_cod ?? true,
  })
   // State to hold multiple announcements locally for the UI fields
  const [announcementList, setAnnouncementList] = useState<string[]>([''])
   useEffect(() => {
    if (initialData?.global_settings?.announcement_message) {
      const parsed = initialData.global_settings.announcement_message
        .split('•')
        .map((item: string) => item.trim())
        .filter((item: string) => item !== '')
      
      if (parsed.length > 0) {
        setAnnouncementList(parsed)
      }
    }
  }, [initialData])

  const [heroBgBanner, setHeroBgBanner] = useState({
    url: initialData?.hero_bg_banner?.url || ''
  })

  // Populates all 6 dynamic promotion cards seamlessly
  const [heroCards, setHeroCards] = useState<any[]>(
    Array.isArray(initialData?.hero_cards) ? initialData.hero_cards : [
      { image: '', label: 'Layered Necklace' },
      { image: '', label: 'Crystal Earrings' },
      { image: '', label: 'Stackable Rings' },
      { image: '', label: 'Charm Bracelet' },
      { image: '', label: 'Pearl Studs' },
      { image: '', label: 'Gold Bangle' }
    ]
  )

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleUpdateGlobal = (key: string, value: any) => {
    setGlobalSettings(prev => ({ ...prev, [key]: value }))
  }
    const handleAnnouncementItemChange = (index: number, value: string) => {
    const updated = [...announcementList]
    updated[index] = value
    setAnnouncementList(updated)
  }

  // Add a new empty input field for another announcement
  const addAnnouncementField = () => {
    setAnnouncementList([...announcementList, ''])
  }

  // Remove a specific announcement field from the UI
  const removeAnnouncementField = (index: number) => {
    if (announcementList.length === 1) {
      setAnnouncementList(['']) // Keep at least one empty box
    } else {
      setAnnouncementList(announcementList.filter((_, i) => i !== index))
    }
  }
  
  const handleUpdateCard = (index: number, field: 'image' | 'label', value: string) => {
    const updated = [...heroCards]
    if (!updated[index]) updated[index] = { image: '', label: '' }
    updated[index][field] = value
    setHeroCards(updated)
  }

  const handleSaveAllConfig = () => {
    // Clean items and join them back into a single string using " • " separator
    const cleanedItems = announcementList.map(item => item.trim()).filter(item => item !== '')
    const combinedMessage = cleanedItems.join(' • ')

    if (!combinedMessage && globalSettings.announcement_active) {
      setError('At least one announcement item is required while header banner is active.')
      return
    }

    setError(null)
    setSuccess(false)
    
    startTransition(async () => {
      // Package the combined string into global_settings payload before saving
      const updatedGlobalSettings = {
        ...globalSettings,
        announcement_message: combinedMessage
      }

      const result = await saveCompleteStoreConfig({
        global_settings: updatedGlobalSettings,
        hero_bg_banner: heroBgBanner,
        hero_cards: heroCards
      })

      if (result.error) {
        setError(result.error)
      } else {
        setSuccess(true)
        // Sync local settings object state with the new string representation
        setGlobalSettings(updatedGlobalSettings)
        setTimeout(() => setSuccess(false), 3000)
      }
    })
  }
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12" style={{ fontFamily: 'Poppins, sans-serif' }}>
      
      {error && (
        <div className="p-4 bg-red-50 text-red-700 text-sm font-medium rounded-xl border border-red-100 shadow-xs">
          {error}
        </div>
      )}

      {/* SECTION 1: Brand Info */}
      <div className="bg-white rounded-2xl border border-stone-200/60 p-6 md:p-8 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold uppercase text-stone-400 tracking-wider flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
          <Store className="w-4 h-4 text-[#c5a880]" /> Store Profile Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1.5">Brand Name</label>
            <input type="text" value={globalSettings.store_name} onChange={(e) => handleUpdateGlobal('store_name', e.target.value)} className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a880]/20 focus:border-[#c5a880] transition-all" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1.5">Support Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
              <input type="email" value={globalSettings.store_email} onChange={(e) => handleUpdateGlobal('store_email', e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a880]/20 focus:border-[#c5a880] transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1.5">Contact Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
              <input type="text" value={globalSettings.store_phone} onChange={(e) => handleUpdateGlobal('store_phone', e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a880]/20 focus:border-[#c5a880] transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1.5">Physical Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
              <input type="text" value={globalSettings.store_address} onChange={(e) => handleUpdateGlobal('store_address', e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a880]/20 focus:border-[#c5a880] transition-all" />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Shipping & Announcement Controls */}
      <div className="bg-white rounded-2xl border border-stone-200/60 p-6 md:p-8 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold uppercase text-stone-400 tracking-wider flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
          <Truck className="w-4 h-4 text-[#c5a880]" /> Announcement Controls
        </h3>

        <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-200/60">
          <div>
            <h4 className="font-bold text-stone-900 text-sm">Enable Top Announcement Banner</h4>
            <p className="text-xs text-stone-400 mt-0.5">Toggle global header bar visibility.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer select-none">
            <input type="checkbox" className="sr-only peer" checked={globalSettings.announcement_active} onChange={(e) => handleUpdateGlobal('announcement_active', e.target.checked)} disabled={isPending} />
            <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-stone-900"></div>
          </label>
        </div>

        {/* Dynamic Multi-Announcement Input List */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-stone-600">Announcement Messages</label>
          
          {announcementList.map((announcement, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Megaphone className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                <input 
                  type="text" 
                  value={announcement} 
                  onChange={(e) => handleAnnouncementItemChange(index, e.target.value)} 
                  placeholder="e.g., ✨ Anti-Tarnish Jewelry or 🚚 Free Shipping Above ₹1499" 
                  disabled={isPending} 
                  className="w-full pl-11 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#c5a880]/20 focus:border-[#c5a880] transition-all" 
                />
              </div>
              <button 
                type="button"
                onClick={() => removeAnnouncementField(index)}
                disabled={isPending}
                className="p-2.5 text-stone-400 hover:text-red-500 bg-stone-50 border border-stone-200 rounded-xl hover:bg-red-50/50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addAnnouncementField}
            disabled={isPending}
            className="mt-1 inline-flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-stone-300 hover:border-[#c5a880] rounded-xl text-xs font-semibold text-stone-600 hover:text-[#c5a880] transition-all bg-white"
          >
            <Plus className="w-3.5 h-3.5" /> Add Another Text Item
          </button>
        </div>
      </div>

      {/* SECTION 3: Hero Background Banner URL Configuration */}
      {/* SECTION 3: Hero Background Banner URL Configuration */}
<div className="bg-white rounded-2xl border border-stone-200/60 p-6 md:p-8 space-y-4 shadow-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
  <h3 className="text-sm font-bold uppercase text-stone-400 tracking-wider flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
    <ImageIcon className="w-4 h-4 text-[#c5a880]" /> Hero Background Banner (`hero_bg_banner`)
  </h3>
  
  <div>
    <label className="block text-xs font-semibold text-stone-600 mb-1.5">
      Collection Hero Image Cover <span className="text-red-500">*</span>
    </label>
    
    {heroBgBanner.url ? (
      /* ✅ ACTIVE PREVIEW BOX: Shows your dynamic uploaded PC asset with a reset handle button */
      <div className="space-y-3">
        <div className="relative w-full h-44 rounded-xl overflow-hidden bg-stone-50 border border-stone-200/60 shadow-inner group">
          <img 
            src={heroBgBanner.url} 
            alt="Hero Banner Preview" 
            className="w-full h-full object-cover" 
          />
          <button
            type="button"
            onClick={() => setHeroBgBanner({ url: '' })} // 💡 Clears out the image value instantly
            className="absolute top-3 right-3 p-1.5 bg-white/90 hover:bg-white text-stone-700 hover:text-red-600 rounded-lg shadow-md backdrop-blur-xs transition-all border border-stone-200/60 flex items-center justify-center"
            title="Remove Banner Image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[11px] text-stone-400 font-medium truncate bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-100">
          🔗 Live Path: {heroBgBanner.url}
        </p>
      </div>
    ) : (
      /* ✅ CLOUDINARY FILE SELECTOR: Hooks straight into your working api/cloudinary/sign route path */
      <CldUploadWidget 
        signatureEndpoint="/api/cloudinary/sign"
        options={{
          maxFiles: 1,
          resourceType: "image",
          clientAllowedFormats: ["jpg", "jpeg", "png", "webp"]
        }}
        onSuccess={(result: any) => {
          // Updates your parent state hook variable value context parameter instantly on upload completion
          setHeroBgBanner({ url: result.info.secure_url })
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="w-full h-36 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 text-stone-500 hover:bg-[#FBF7F0] hover:border-[#c5a880] hover:text-[#c5a880] transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-white border border-stone-200/60 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
              <ImageIcon className="w-5 h-5 text-stone-400" />
            </div>
            <span className="text-sm font-semibold mt-1">Click to upload banner from PC</span>
            <span className="text-xs text-stone-400 font-medium">Recommended size: 1200x500px or larger</span>
          </button>
        )}
      </CldUploadWidget>
    )}
  </div>
</div>


      {/* SECTION 4: Interactive 6 Home Curation Cards Config Grid
      <div className="bg-white rounded-2xl border border-stone-200/60 p-6 md:p-8 space-y-6 shadow-xs">
        <h3 className="text-sm font-bold uppercase text-stone-400 tracking-wider flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
          <Layers className="w-4 h-4 text-[#c5a880]" /> Promotional Grid Categories (`hero_cards`)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, idx) => {
            const currentCard = heroCards[idx] || { image: '', label: '' }
            return (
              <div key={idx} className="p-4 bg-stone-50/50 border border-stone-200/60 rounded-xl space-y-3 relative">
                <span className="absolute top-2 right-3 text-[10px] uppercase font-bold text-stone-300">Position #{idx+1}</span>
                <div>
                  <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">Card Title Label</label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-3 w-3.5 h-3.5 text-stone-400" />
                    <input type="text" value={currentCard.label} onChange={(e) => handleUpdateCard(idx, 'label', e.target.value)} placeholder="e.g. Stackable Rings" className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#c5a880]" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">Cloudinary/Unsplash Image URL</label>
                  <input type="text" value={currentCard.image || currentCard.image_url || ''} onChange={(e) => handleUpdateCard(idx, 'image', e.target.value)} placeholder="https://..." className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#c5a880]" />
                </div>
                {(currentCard.image || currentCard.image_url) && (
                  <div className="relative w-full h-24 rounded-lg overflow-hidden border border-stone-200 bg-white">
                    <img src={currentCard.image || currentCard.image_url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div> */}

      {/* Global Bottom Sticky Trigger Bar */}
      <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl flex items-center gap-4 justify-between sticky bottom-4 shadow-md backdrop-blur-md bg-white/90">
        <p className="text-xs text-stone-400 font-medium pl-2">Updates rows safely across keys concurrently.</p>
        <div className="flex items-center gap-4">
          {success && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
              <Check className="w-4 h-4" /> Config Synced Natively!
            </span>
          )}
          <button
            onClick={handleSaveAllConfig}
            disabled={isPending}
            className="px-6 py-2.5 bg-stone-900 text-white text-sm font-semibold rounded-xl hover:bg-neutral-800 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[145px]"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Store Curation'}
          </button>
        </div>
      </div>

    </div>
  )
  }

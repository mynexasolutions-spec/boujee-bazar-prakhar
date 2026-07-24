'use client'

import { useState, useTransition } from 'react'
import { markInquiryAsRead, deleteInquiry } from '@/actions/admin/inquiries'
import { Trash2, CheckCircle, Mail, MessageSquare, Phone, Tag } from 'lucide-react'

export function InquiriesList({ initialInquiries }: { initialInquiries: any[] }) {
  const [inquiries, setInquiries] = useState(initialInquiries)
  const [isPending, startTransition] = useTransition()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleMarkAsRead = (id: string) => {
    startTransition(async () => {
      const res = await markInquiryAsRead(id)
      if (res.success) {
        // 🌟 FIXED: Toggles database 'read' boolean parameter state instead of arbitrary strings
        setInquiries(inquiries.map(inq => inq.id === id ? { ...inq, read: true } : inq))
      }
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return
    startTransition(async () => {
      const res = await deleteInquiry(id)
      if (res.success) {
        setInquiries(inquiries.filter(inq => inq.id !== id))
        if (expandedId === id) setExpandedId(null)
      }
    })
  }

  if (inquiries.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
        <Mail className="w-12 h-12 text-stone-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-stone-900">No inquiries yet</h3>
        <p className="text-sm text-stone-500 mt-1">When customers contact you, their messages will appear here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {inquiries.map((inquiry) => {
        // 🌟 FIXED: read === false determines if an item is unread
        const isUnread = inquiry.read === false
        const isExpanded = expandedId === inquiry.id

        return (
          <div 
            key={inquiry.id} 
            className={`bg-white rounded-2xl border transition-all overflow-hidden ${
              isUnread ? 'border-orange-200 shadow-sm' : 'border-stone-200'
            }`}
          >
            {/* Header Row */}
            <div 
              className={`flex items-center justify-between p-5 cursor-pointer hover:bg-stone-50 transition-colors ${
                isUnread ? 'bg-orange-50/30' : ''
              }`}
              onClick={() => {
                setExpandedId(isExpanded ? null : inquiry.id)
                if (isUnread) handleMarkAsRead(inquiry.id)
              }}
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className={`p-2 rounded-full ${isUnread ? 'bg-orange-100 text-orange-600' : 'bg-stone-100 text-stone-400'}`}>
                  {isUnread ? <MessageSquare className="w-5 h-5 fill-current" /> : <Mail className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    {/* 🌟 FIXED: Changed split names back to your unified table 'name' field string */}
                    <p className={`text-sm truncate ${isUnread ? 'font-bold text-stone-900' : 'font-medium text-stone-700'}`}>
                      {inquiry.name || 'Premium Collector'}
                    </p>
                    {isUnread && (
                      <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-wider">
                        New
                      </span>
                    )}
                  </div>
                  <p className={`text-sm truncate mt-0.5 ${isUnread ? 'font-medium text-stone-800' : 'text-stone-500'}`}>
                    {inquiry.email}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 ml-4">
                <span className="text-xs text-stone-400 font-medium whitespace-nowrap">
                  {inquiry.created_at ? new Date(inquiry.created_at).toLocaleDateString('en-IN') : '--/--/----'}
                </span>
                <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                  {isUnread && (
                    <button
                      onClick={() => handleMarkAsRead(inquiry.id)}
                      disabled={isPending}
                      className="p-2 text-stone-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Mark as Read"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(inquiry.id)}
                    disabled={isPending}
                    className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="p-6 border-t border-stone-100 bg-stone-50/50 space-y-4">
                
                {/* 🌟 FIXED: Injected Subject and Phone details layout containers securely */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-stone-500 bg-white p-4 rounded-xl border border-stone-200/60 shadow-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#c5a880]" />
                    <span>Subject: <span className="text-stone-800 font-medium">{inquiry.subject || 'General Store Inquiry'}</span></span>
                  </div>
                  {inquiry.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#c5a880]" />
                      <span>Phone: <span className="text-stone-800 font-medium font-mono">{inquiry.phone}</span></span>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Message</h4>
                  <div className="bg-white p-5 rounded-xl border border-stone-200 text-sm text-stone-700 whitespace-pre-wrap leading-relaxed shadow-sm">
                    {inquiry.message}
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center pt-2">
                  <span className="text-[10px] font-mono text-stone-400 select-all uppercase">ID: {inquiry.id}</span>
                  <a 
                    href={`mailto:${inquiry.email}?subject=RE: ${encodeURIComponent(inquiry.subject || 'Your Inquiry')}`}
                    className="inline-flex items-center justify-center px-4 py-2 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 transition-colors"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import crypto from 'crypto'

export async function submitCustomerInquiry(formData: {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}) {
  const { name, email, phone, subject, message } = formData

  if (!name.trim() || !email.trim() || !message.trim()) {
    return { error: 'Please populate all mandatory fields.' }
  }

  try {
    const supabaseAdmin = createAdminClient()
    const uniqueId = `INQ-${crypto.randomUUID().substring(0, 8).toUpperCase()}`

    const { error } = await supabaseAdmin
      .from('inquiries')
      .insert([{
        id: uniqueId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || null,
        subject: subject.trim() || 'General Store Inquiry',
        message: message.trim()
      }])

    if (error) {
      console.error('Supabase Inquiries Insert Error:', error.message)
      return { error: `Database entry failed: ${error.message}` }
    }

    return { success: true }
  } catch (err: any) {
    console.error('Inquiry catch block execution issue:', err)
    return { error: 'An unexpected internal server error occurred.' }
  }
}

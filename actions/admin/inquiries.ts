// 'use server'

// import { createClient } from '@/lib/supabase/server'
// import { revalidatePath } from 'next/cache'

// async function checkAdminAuth(supabase: any) {
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) return false

//   const { data: profile } = await supabase
//     .from('profiles')
//     .select('role')
//     .eq('id', user.id)
//     .single()

//   return profile?.role === 'admin'
// }

// export async function getInquiries() {
//   const supabase = await createClient()
//   const isAdmin = await checkAdminAuth(supabase)
//   if (!isAdmin) return []

//   const { createAdminClient } = await import('@/lib/supabase/admin')
//   const adminClient = createAdminClient()

//   const { data } = await adminClient
//     .from('contact_inquiries')
//     .select('*')
//     .order('created_at', { ascending: false })

//   return data || []
// }

// export async function markInquiryAsRead(id: string) {
//   const supabase = await createClient()
//   const isAdmin = await checkAdminAuth(supabase)
//   if (!isAdmin) return { success: false, error: 'Unauthorized' }

//   const { createAdminClient } = await import('@/lib/supabase/admin')
//   const adminClient = createAdminClient()

//   const { error } = await adminClient
//     .from('contact_inquiries')
//     .update({ status: 'read' })
//     .eq('id', id)

//   if (error) return { success: false, error: error.message }

//   revalidatePath('/admin/inquiries')
//   return { success: true }
// }

// export async function deleteInquiry(id: string) {
//   const supabase = await createClient()
//   const isAdmin = await checkAdminAuth(supabase)
//   if (!isAdmin) return { success: false, error: 'Unauthorized' }

//   const { createAdminClient } = await import('@/lib/supabase/admin')
//   const adminClient = createAdminClient()

//   const { error } = await adminClient
//     .from('contact_inquiries')
//     .delete()
//     .eq('id', id)

//   if (error) return { success: false, error: error.message }

//   revalidatePath('/admin/inquiries')
//   return { success: true }
// }
'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * Shared structural helper to authenticate active admin session cookies
 */
async function verifyAdminCookieSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const isBoujeeAdmin = cookieStore.get('boujee-admin-logged-in')?.value === 'true'
    const isMockAdmin = cookieStore.get('mock-admin-logged-in')?.value === 'true'
    return isBoujeeAdmin || isMockAdmin
  } catch {
    return false
  }
}

export async function getInquiries() {
  // 1. ✅ COOKIE GATEWAY CHECK
  const isAdmin = await verifyAdminCookieSession()
  if (!isAdmin) {
    console.warn('Unauthorized attempt to read store message inquiries.')
    return []
  }

  // 2. ✅ MASTER SUPERUSER BYPASS: Query real column schema indexes
  const adminClient = createAdminClient()

  const { data, error } = await adminClient
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Failed fetching contact list logs from cloud engines:", error.message)
    return []
  }

  return data || []
}

export async function markInquiryAsRead(id: string) {
  // 1. ✅ COOKIE GATEWAY CHECK
  const isAdmin = await verifyAdminCookieSession()
  if (!isAdmin) return { success: false, error: 'Unauthorized Administrative Access.' }

  // 2. ✅ MASTER SUPERUSER BYPASS: Mutate explicit schema boolean parameters
  const adminClient = createAdminClient()

  const { error } = await adminClient
    .from('inquiries')
    .update({ read: true })
    .eq('id', id)

  if (error) return { success: false, error: error.message }

  revalidatePath('/admin/inquiries')
  return { success: true }
}

export async function deleteInquiry(id: string) {
  // 1. ✅ COOKIE GATEWAY CHECK
  const isAdmin = await verifyAdminCookieSession()
  if (!isAdmin) return { success: false, error: 'Unauthorized Administrative Access.' }

  // 2. ✅ MASTER SUPERUSER BYPASS: Delete target record safely
  const adminClient = createAdminClient()

  const { error } = await adminClient
    .from('inquiries')
    .delete()
    .eq('id', id)

  if (error) return { success: false, error: error.message }

  revalidatePath('/admin/inquiries')
  return { success: true }
}

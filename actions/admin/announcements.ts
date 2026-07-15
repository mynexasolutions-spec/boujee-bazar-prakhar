'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * Fetches the complete store data out of the single 'global_settings' object row
 */
export async function getCompleteStoreConfig() {
  const supabaseAdmin = createAdminClient() // Master superuser token bypasses RLS blocks
  
  try {
    // 🌟 FIXED: Query the exact single row matching your database layout screenshot
    const { data, error } = await supabaseAdmin
      .from('store_settings')
      .select('value')
      .eq('key', 'global_settings')
      .maybeSingle()

    if (error) {
      console.error("Supabase settings read failure:", error.message)
    }

    // Safely extract the master JSON values object
    const values = data?.value || {}

    return {
      success: true,
      global_settings: {
        enable_cod: values.enable_cod ?? true,
        store_name: values.store_name || 'The Boujee Bazar',
        store_email: values.store_email || values.email || '', // Fallback fallback checker
        store_phone: values.store_phone || values.phone || '',
        store_address: values.store_address || values.address || '',
        shipping_flat_rate: Number(values.shipping_flat_rate ?? 99),
        shipping_threshold: Number(values.shipping_threshold ?? 999),
        announcement_message: values.announcement_message || '',
        announcement_active: values.announcement_active ?? false
      },
      hero_bg_banner: {
        // 🌟 FIXED: Pulls the background banner from your exact database object property structure
        url: values.hero_bg_banner?.url || values.hero_bg_banner || ''
      },
      // 🌟 FIXED: Pulls your 6 category image links straight from your exact JSON cards collection
      hero_cards: values.hero_cards?.cards || values.hero_cards || [
        { image: '', label: 'Layered Necklace' },
        { image: '', label: 'Crystal Earrings' },
        { image: '', label: 'Stackable Rings' },
        { image: '', label: 'Charm Bracelet' },
        { image: '', label: 'Pearl Studs' },
        { image: '', label: 'Gold Bangle' }
      ]
    }
  } catch (err) {
    console.error("Failed downloading complete store layout matrix:", err)
    return { success: false, global_settings: {}, hero_bg_banner: {}, hero_cards: [] }
  }
}

/**
 * Saves everything back down safely without overwriting other table records
 */
export async function saveCompleteStoreConfig(payload: {
  global_settings: any
  hero_bg_banner: { url: string }
  hero_cards: any[]
}) {
  const cookieStore = await cookies()
  const isBoujeeAdmin = cookieStore.get('boujee-admin-logged-in')?.value === 'true'
  const isMockAdmin = cookieStore.get('mock-admin-logged-in')?.value === 'true'

  if (!isBoujeeAdmin && !isMockAdmin) {
    return { success: false, error: 'Unauthorized Administrative Access.' }
  }

  const supabaseAdmin = createAdminClient()

  try {
    // 1. Download current state to protect other embedded variables
    const { data: existingRow } = await supabaseAdmin
      .from('store_settings')
      .select('value')
      .eq('key', 'global_settings')
      .maybeSingle()

    const currentValues = existingRow?.value || {}

    // 2. Combine all form changes into a single consolidated JSON database payload object row
    const absolutePayload = {
      ...currentValues,
      ...payload.global_settings,
      hero_bg_banner: { url: payload.hero_bg_banner.url },
      hero_cards: { cards: payload.hero_cards } // Formats it to match your custom sub-object structure exactly
    }

    // 3. Save it directly back into your single row column space
    const { error } = await supabaseAdmin
      .from('store_settings')
      .update({ value: absolutePayload, updated_at: new Date().toISOString() })
      .eq('key', 'global_settings')

    if (error) return { success: false, error: error.message }

  } catch (err: any) {
    return { success: false, error: err.message || 'Failed saving configuration.' }
  }

  revalidatePath('/', 'layout') // Immediately pushes updates live to your homepage layout banner viewports!
  return { success: true }
}

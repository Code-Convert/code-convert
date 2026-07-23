import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/lib/database.type'

type SiteStats = Database['public']['Functions']['get_site_statistics']['Returns'][number]

export const revalidate = 60

export async function GET() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.rpc('get_site_statistics')
    if (error) throw error
    return NextResponse.json((data as SiteStats[] | null)?.[0] ?? null)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

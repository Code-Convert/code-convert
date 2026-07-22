import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const revalidate = 60

export async function GET() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.rpc('get_site_statistics')
    if (error) throw error
    return NextResponse.json(data?.[0] ?? null)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import type { CaseStudyInsertPayload } from '@/types/api'

export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    const supabase = await createClient()
    const body = await request.json()

    const insertData: CaseStudyInsertPayload = {
      title: body.title,
      slug: body.slug,
      client: body.client,
      industry: body.industry ?? null,
      challenge: body.challenge ?? null,
      solution: body.solution ?? null,
      results: body.results ?? null,
      seo_title: body.seo_title ?? null,
      seo_description: body.seo_description ?? null,
      published: body.published ?? false,
    }

    const { error } = await supabase
      .from('case_studies')
      .insert(insertData)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

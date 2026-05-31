import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/supabase/auth'
import type { CaseStudyUpdatePayload } from '@/types/api'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin()
    const supabase = await createClient()
    const body = await request.json()
    const { id } = params

    const updateData: CaseStudyUpdatePayload = {
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
      .update(updateData)
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin()
    const supabase = await createClient()
    const { id } = params

    const { error } = await supabase
      .from('case_studies')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

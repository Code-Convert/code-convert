import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import type { CaseStudyUpdatePayload } from '@/types/api'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth()
    const supabase = await createClient()
    const body = await request.json()
    const { id } = await params

    const updateData: CaseStudyUpdatePayload = {
      title: body.title,
      slug: body.slug,
      client: body.client,
      industry: body.industry ?? null,
      services: body.services ?? null,
      challenge: body.challenge ?? null,
      solution: body.solution ?? null,
      results: body.results ?? null,
      content: body.content ?? null,
      featured_image: body.featured_image ?? null,
      testimonial_text: body.testimonial_text ?? null,
      testimonial_author: body.testimonial_author ?? null,
      testimonial_role: body.testimonial_role ?? null,
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth()
    const supabase = await createClient()
    const { id } = await params

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

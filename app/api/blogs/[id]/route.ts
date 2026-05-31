import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import type { BlogUpdatePayload } from '@/types/api'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth()
    const supabase = await createClient()
    const body = await request.json()
    const { id } = await params

    const updateData: BlogUpdatePayload = {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt ?? null,
      content: body.content ?? null,
      featured_image: body.featured_image ?? null,
      seo_title: body.seo_title ?? null,
      seo_description: body.seo_description ?? null,
      published: body.published ?? false,
    }

    const { error } = await supabase
      .from('blogs')
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
      .from('blogs')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

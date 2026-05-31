import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/supabase/auth'
import type { BlogInsertPayload } from '@/types/api'

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin()
    const supabase = await createClient()
    const body = await request.json()

    const insertData: BlogInsertPayload = {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt ?? null,
      content: body.content ?? null,
      seo_title: body.seo_title ?? null,
      seo_description: body.seo_description ?? null,
      published: body.published ?? false,
      author_id: user.id
    }

    const { error } = await supabase
      .from('blogs')
      .insert(insertData)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

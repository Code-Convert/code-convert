import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import type { BlogInsertPayload } from '@/types/api'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

export async function POST(request: NextRequest) {
  let user
  try {
    user = await requireAuth()
  } catch (error) {
    if (isRedirectError(error)) throw error
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = await createClient()
    const body = await request.json()

    const insertData: BlogInsertPayload = {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt ?? null,
      content: body.content ?? null,
      featured_image: body.featured_image ?? null,
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

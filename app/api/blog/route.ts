import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import type { Database } from '@/lib/database.type'

export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(blogs)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unauthored'
    return NextResponse.json({ error: message }, { status: 401 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAuth()
    const supabase = await createClient()
    
    const body = await request.json()
    const { title, slug, excerpt, content, featured_image, seo_title, seo_description, published } = body

    // Check if slug already exists
    const { data: existingPost } = await supabase
      .from('blogs')
      .select('id')
      .eq('slug', slug)
      .single()

    if (existingPost) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    }

    const insertData: Database['public']['Tables']['blogs']['Insert'] = {
      title,
      slug,
      excerpt: excerpt || null,
      content: content || null,
      featured_image: featured_image || null,
      seo_title: seo_title || null,
      seo_description: seo_description || null,
      published: published || false,
      published_at: published ? new Date().toISOString() : null,
      author_id: user.id
    }

    const { data: blog, error } = await supabase
      .from('blogs')
      .insert(insertData)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(blog, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unauthored'
    return NextResponse.json({ error: message }, { status: 401 })
  }
}
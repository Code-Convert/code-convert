import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import { WEB_DEV_SERVICE } from '@/types/case-study'

export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    const supabase = await createClient()
    const body = await request.json()

    if (body.show_in_carousel && !body.services?.includes(WEB_DEV_SERVICE)) {
      return NextResponse.json(
        { error: 'Carousel is only available for "Web Design & Development" projects.' },
        { status: 400 }
      )
    }

    if (body.show_in_carousel && !body.carousel_image && !body.featured_image) {
      return NextResponse.json(
        { error: 'A carousel image or featured image is required when featuring in the carousel.' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('case_studies')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert({
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
        show_in_carousel: body.show_in_carousel ?? false,
        carousel_image: body.carousel_image ?? null,
        roas: body.roas != null && body.roas !== '' ? Number(body.roas) : null,
        performance_score: body.performance_score != null && body.performance_score !== '' ? Number(body.performance_score) : null,
        is_custom_built: body.is_custom_built ?? true,
        gallery_order: body.gallery_order ?? 0,
        carousel_order: body.carousel_order ?? 0,
      } as any)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

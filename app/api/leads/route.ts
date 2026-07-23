import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/lib/database.type'

type LeadInsert = Database['public']['Tables']['lead_submissions']['Insert']

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { name, email, phone, source_page } = body

    if (!name || !email || !phone || !source_page) {
      return NextResponse.json(
        { error: 'name, email, phone and source_page are required' },
        { status: 400 }
      )
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
      request.headers.get('x-real-ip') ??
      null

    const payload: LeadInsert = {
      name,
      email,
      phone,
      source_page,
      source_url: body.source_url || null,
      utm_source: body.utm_source || null,
      utm_medium: body.utm_medium || null,
      utm_campaign: body.utm_campaign || null,
      utm_content: body.utm_content || null,
      utm_term: body.utm_term || null,
      primary_goal: body.primary_goal || null,
      sells_to: body.sells_to || null,
      growth_stage: body.growth_stage || null,
      biggest_challenge: body.biggest_challenge || null,
      exploring_reason: body.exploring_reason || null,
      company_name: body.company_name || null,
      website_url: body.website_url || null,
      industry: body.industry || null,
      industry_other: body.industry_other || null,
      role: body.role || null,
      decision_authority: body.decision_authority || null,
      monthly_revenue: body.monthly_revenue || null,
      monthly_ad_spend: body.monthly_ad_spend || null,
      budget_allocated: body.budget_allocated || null,
      implementation_timeline: body.implementation_timeline || null,
      action_likelihood: body.action_likelihood || null,
      additional_context: body.additional_context || null,
      meeting_preference: body.meeting_preference || null,
      lead_score: null,
      lead_temperature: null,
      lifecycle_stage: 'lead',
      lead_status: 'new',
      ip_address: ip,
      user_agent: request.headers.get('user-agent') || null,
      referrer: request.headers.get('referer') || null,
    }

    const { error } = await supabase.from('lead_submissions').insert(payload)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'An error occurred'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

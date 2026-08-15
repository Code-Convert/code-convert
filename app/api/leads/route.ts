import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const token = process.env.HUBSPOT_ACCESS_TOKEN
    const apiBase = process.env.HUBSPOT_API_BASE_URL

    if (!token || !apiBase) {
      console.error('HubSpot: HUBSPOT_ACCESS_TOKEN or HUBSPOT_API_BASE_URL is not set')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const body = await request.json()
    const { name, email, phone, source_page } = body

    if (!name || !email || !phone || !source_page) {
      return NextResponse.json(
        { error: 'name, email, phone and source_page are required' },
        { status: 400 }
      )
    }

    // TODO: gate on POPIA consent once property exists in HubSpot

    const [firstName, ...rest] = (name as string).trim().split(' ')
    const lastName = rest.join(' ') || ''

    const properties: Record<string, string> = {
      email,
      firstname: firstName,
      lastname: lastName,
      phone,
      company: body.company_name ?? '',
      website: body.website_url ?? '',
      jobtitle: body.role ?? '',
      industry: body.industry ?? '',
      hs_lead_status: 'NEW',
      lifecyclestage: 'lead',
    }

    if (body.utm_source) properties.hs_analytics_source = body.utm_source
    if (body.utm_medium) properties.hs_analytics_source_data_1 = body.utm_medium
    if (body.utm_campaign) properties.hs_analytics_source_data_2 = body.utm_campaign

    const res = await fetch(`${apiBase}/crm/v3/objects/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ properties }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error(`HubSpot API ${res.status}:`, text)
      return NextResponse.json({ error: 'Failed to submit lead' }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'An error occurred'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

-- =====================================================
-- LEAD SUBMISSIONS TABLE
-- =====================================================

CREATE TABLE public.lead_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Contact
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,

  -- Source tracking
  source_page TEXT NOT NULL,
  source_url TEXT,

  -- UTM tracking
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,

  -- Marketing metadata
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,

  -- Form fields
  primary_goal TEXT,
  sells_to TEXT,
  growth_stage TEXT,
  biggest_challenge TEXT,
  exploring_reason TEXT,
  company_name TEXT,
  website_url TEXT,
  industry TEXT,
  industry_other TEXT,
  role TEXT,
  decision_authority TEXT,
  monthly_revenue TEXT,
  monthly_ad_spend TEXT,
  budget_allocated TEXT,
  implementation_timeline TEXT,
  action_likelihood TEXT,
  additional_context TEXT,
  meeting_preference TEXT,

  -- Lead scoring
  lead_score INTEGER DEFAULT 0,
  lead_temperature TEXT CHECK (lead_temperature IN ('hot', 'warm', 'cold')),

  -- HubSpot preparation
  lifecycle_stage TEXT NOT NULL DEFAULT 'lead',
  lead_status TEXT NOT NULL DEFAULT 'new',
  hubspot_contact_id TEXT,
  hubspot_sync_status TEXT DEFAULT 'pending' CHECK (hubspot_sync_status IN ('pending', 'synced', 'failed')),
  hubspot_synced_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- UPDATED_AT TRIGGER
-- =====================================================

CREATE TRIGGER update_lead_submissions_updated_at
  BEFORE UPDATE ON public.lead_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE public.lead_submissions ENABLE ROW LEVEL SECURITY;

-- Anonymous users can insert (public form submission)
CREATE POLICY "Anyone can submit a lead" ON public.lead_submissions
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Only admins can read submissions
CREATE POLICY "Admins can read lead submissions" ON public.lead_submissions
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE public.profiles.id = auth.uid()
      AND public.profiles.role = 'admin'
    )
  );

-- Only admins can update submissions
CREATE POLICY "Admins can update lead submissions" ON public.lead_submissions
  FOR UPDATE TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE public.profiles.id = auth.uid()
      AND public.profiles.role = 'admin'
    )
  );

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX idx_lead_submissions_email ON public.lead_submissions (email);
CREATE INDEX idx_lead_submissions_source_page ON public.lead_submissions (source_page);
CREATE INDEX idx_lead_submissions_lead_score ON public.lead_submissions (lead_score);
CREATE INDEX idx_lead_submissions_lead_status ON public.lead_submissions (lead_status);
CREATE INDEX idx_lead_submissions_lead_temperature ON public.lead_submissions (lead_temperature);
CREATE INDEX idx_lead_submissions_hubspot_sync_status ON public.lead_submissions (hubspot_sync_status);
CREATE INDEX idx_lead_submissions_created_at ON public.lead_submissions (created_at DESC);

-- =====================================================
-- HUBSPOT MAPPING REFERENCE
-- =====================================================
-- Supabase field          → HubSpot property
-- -----------------------------------------------
-- email                   → email (standard)
-- name                    → firstname + lastname (split on first space)
-- phone                   → phone (standard)
-- company_name            → company (standard)
-- website_url             → website (standard)
-- lifecycle_stage         → lifecyclestage (standard)
-- lead_status             → hs_lead_status (standard)
-- source_page             → lead_source_page (custom)
-- primary_goal            → primary_goal (custom)
-- sells_to                → sells_to (custom)
-- growth_stage            → growth_stage (custom)
-- biggest_challenge       → biggest_challenge (custom)
-- industry                → industry (standard)
-- role                    → jobtitle (standard)
-- decision_authority      → decision_authority (custom)
-- monthly_revenue         → monthly_revenue (custom)
-- monthly_ad_spend        → monthly_ad_spend (custom)
-- budget_allocated        → budget_allocated (custom)
-- implementation_timeline → implementation_timeline (custom)
-- action_likelihood       → action_likelihood (custom)
-- lead_score              → lead_score (custom)
-- lead_temperature        → lead_temperature (custom)
-- meeting_preference      → meeting_preference (custom)
-- created_at              → createdate (standard, read-only in HubSpot)

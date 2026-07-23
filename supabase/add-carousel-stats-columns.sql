-- Migration: add carousel, stats, and ordering columns to case_studies
-- Run in Supabase SQL Editor. Safe to re-run (IF NOT EXISTS everywhere).

ALTER TABLE case_studies
  ADD COLUMN IF NOT EXISTS show_in_carousel boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS carousel_image text,
  ADD COLUMN IF NOT EXISTS roas numeric,
  ADD COLUMN IF NOT EXISTS performance_score numeric,
  ADD COLUMN IF NOT EXISTS is_custom_built boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS gallery_order integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS carousel_order integer NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_case_studies_published ON case_studies (published);
CREATE INDEX IF NOT EXISTS idx_case_studies_show_in_carousel ON case_studies (show_in_carousel);

-- Public read policy (idempotent via DO block)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'case_studies'
      AND policyname = 'Public can view published case studies'
  ) THEN
    CREATE POLICY "Public can view published case studies"
      ON case_studies FOR SELECT
      TO anon
      USING (published = true);
  END IF;
END $$;

-- Stats aggregate function
CREATE OR REPLACE FUNCTION get_site_statistics()
RETURNS TABLE (
  projects_delivered bigint,
  avg_performance_score numeric,
  avg_roas numeric,
  percent_custom_built numeric
) AS $$
  SELECT
    count(*) AS projects_delivered,
    round(avg(performance_score), 0) AS avg_performance_score,
    round(avg(roas), 1) AS avg_roas,
    round(100.0 * count(*) FILTER (WHERE is_custom_built) / NULLIF(count(*), 0), 0) AS percent_custom_built
  FROM case_studies
  WHERE published = true;
$$ LANGUAGE sql STABLE;

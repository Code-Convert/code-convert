import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface CaseStudyRow {
  id: string
  title: string
  slug: string
  client: string
  published: boolean | null
  created_at: string | null
}

async function getCaseStudies() {
  const supabase = await createClient()

  const { data: caseStudies, error } = await supabase
    .from('case_studies')
    .select('id, title, slug, client, published, created_at')
    .order('created_at', { ascending: false })
    .returns<CaseStudyRow[]>()

  if (error) {
    console.error('Error fetching case studies:', error)
    return []
  }

  return caseStudies || []
}

export default async function CaseStudiesManagement() {
  const caseStudies = await getCaseStudies()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Case Studies</h1>
          <p className="text-white/70 mt-2">Manage your portfolio case studies</p>
        </div>
        <Link href="/admin/case-studies/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Case Study
          </Button>
        </Link>
      </div>

      <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-white/70 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {caseStudies.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-white/50">
                    No case studies yet. Create your first case study to get started.
                  </td>
                </tr>
              ) : (
                caseStudies.map((study) => (
                  <tr key={study.id} className="hover:bg-white/5">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-white">
                          {study.title}
                        </div>
                        <div className="text-sm text-white/50">
                          /{study.slug}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/70">
                      {study.client}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        study.published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {study.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/70">
                      {study.created_at ? new Date(study.created_at).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <Link
                        href={`/admin/case-studies/${study.id}`}
                        className="text-[#FF1E1E] hover:text-[#FF5555] mr-4"
                      >
                        Edit
                      </Link>
                      <button className="text-red-400 hover:text-red-300">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
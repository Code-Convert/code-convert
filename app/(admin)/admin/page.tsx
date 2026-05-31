import { createClient } from '@/lib/supabase/server'

async function getDashboardStats() {
  const supabase = await createClient()
  
  try {
    // Get all blogs count
    const { count: totalBlogs, error: blogsError } = await supabase
      .from('blogs')
      .select('*', { count: 'exact', head: true })

    if (blogsError) {
      console.error('Error fetching total blogs:', blogsError)
    }

    // Get published blogs count
    const { count: publishedBlogs, error: publishedBlogsError } = await supabase
      .from('blogs')
      .select('*', { count: 'exact', head: true })
      .eq('published', true)

    if (publishedBlogsError) {
      console.error('Error fetching published blogs:', publishedBlogsError)
    }

    // Get all case studies count
    const { count: totalCaseStudies, error: caseStudiesError } = await supabase
      .from('case_studies')
      .select('*', { count: 'exact', head: true })

    if (caseStudiesError) {
      console.error('Error fetching total case studies:', caseStudiesError)
    }

    // Get published case studies count
    const { count: publishedCaseStudies, error: publishedCaseStudiesError } = await supabase
      .from('case_studies')
      .select('*', { count: 'exact', head: true })
      .eq('published', true)

    if (publishedCaseStudiesError) {
      console.error('Error fetching published case studies:', publishedCaseStudiesError)
    }

    const stats = {
      totalBlogs: totalBlogs || 0,
      publishedBlogs: publishedBlogs || 0,
      totalCaseStudies: totalCaseStudies || 0,
      publishedCaseStudies: publishedCaseStudies || 0
    }

    console.log('Dashboard stats:', stats)
    return stats
    
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return {
      totalBlogs: 0,
      publishedBlogs: 0,
      totalCaseStudies: 0,
      publishedCaseStudies: 0
    }
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-white/70 mt-2">Welcome to your admin panel</p>
      </div>

      {/* Debug Info */}
      {stats.totalBlogs === 0 && stats.totalCaseStudies === 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <p className="text-yellow-500 text-sm">
            No data found. Check console for errors or create your first blog/case study.
          </p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
          <h3 className="text-sm font-medium text-white/70">Total Blog Posts</h3>
          <p className="text-3xl font-bold text-white mt-2">{stats.totalBlogs}</p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
          <h3 className="text-sm font-medium text-white/70">Published Blogs</h3>
          <p className="text-3xl font-bold text-white mt-2">{stats.publishedBlogs}</p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
          <h3 className="text-sm font-medium text-white/70">Total Case Studies</h3>
          <p className="text-3xl font-bold text-white mt-2">{stats.totalCaseStudies}</p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
          <h3 className="text-sm font-medium text-white/70">Published Case Studies</h3>
          <p className="text-3xl font-bold text-white mt-2">{stats.publishedCaseStudies}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/5 rounded-lg p-6 border border-white/10">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/blogs/new"
            className="flex items-center justify-center p-4 bg-[#FF1E1E] text-white rounded-md hover:bg-[#FF5555] transition-colors"
          >
            Create New Blog Post
          </a>
          <a
            href="/admin/case-studies/new"
            className="flex items-center justify-center p-4 bg-white/10 text-white rounded-md hover:bg-white/20 transition-colors"
          >
            Create Case Study
          </a>
          <a
            href="/admin/media"
            className="flex items-center justify-center p-4 bg-white/10 text-white rounded-md hover:bg-white/20 transition-colors"
          >
            Upload Media
          </a>
        </div>
      </div>
    </div>
  )
}
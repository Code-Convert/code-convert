'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

export default function DiagnosticPage() {
  const [results, setResults] = useState<string[]>([])
  const [testing, setTesting] = useState(false)

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
    console.log(message)
  }

  const runDiagnostics = async () => {
    setTesting(true)
    setResults([])
    const supabase = createClient()

    try {
      addResult('🔍 Testing authentication...')
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError) {
        addResult(`❌ Auth error: ${authError.message}`)
      } else if (!user) {
        addResult('❌ Not authenticated')
      } else {
        addResult(`✅ Authenticated as: ${user.email}`)
      }

      addResult('🔍 Testing database connection...')
      const { data: blogs, error: blogsError } = await supabase
        .from('blogs')
        .select('id, title, published')

      if (blogsError) {
        addResult(`❌ Database error: ${blogsError.message}`)
      } else {
        addResult(`✅ Database connected. Found ${blogs?.length || 0} blogs`)
        blogs?.forEach(blog => {
          addResult(`   - ${blog.title} (published: ${blog.published})`)
        })
      }

      addResult('🔍 Testing count queries...')
      
      const { count: totalBlogs } = await supabase
        .from('blogs')
        .select('*', { count: 'exact', head: true })
      addResult(`✅ Total blogs: ${totalBlogs}`)

      const { count: publishedBlogs } = await supabase
        .from('blogs')
        .select('*', { count: 'exact', head: true })
        .eq('published', true)
      addResult(`✅ Published blogs: ${publishedBlogs}`)

      const { count: totalCaseStudies } = await supabase
        .from('case_studies')
        .select('*', { count: 'exact', head: true })
      addResult(`✅ Total case studies: ${totalCaseStudies}`)

      const { count: publishedCaseStudies } = await supabase
        .from('case_studies')
        .select('*', { count: 'exact', head: true })
        .eq('published', true)
      addResult(`✅ Published case studies: ${publishedCaseStudies}`)

      addResult('🔍 Testing storage bucket...')
      const { data: buckets } = await supabase.storage.listBuckets()
      const mediaLibrary = buckets?.find(b => b.id === 'media-library')
      if (mediaLibrary) {
        addResult(`✅ media-library bucket exists (public: ${mediaLibrary.public})`)
      } else {
        addResult('❌ media-library bucket NOT FOUND')
      }

      addResult('🔍 Testing storage upload permission...')
      const testFile = new File(['test'], 'test.txt', { type: 'text/plain' })
      const testFileName = `diagnostic-test-${Date.now()}.txt`
      
      const { error: uploadError } = await supabase.storage
        .from('media-library')
        .upload(testFileName, testFile)

      if (uploadError) {
        addResult(`❌ Upload permission error: ${uploadError.message}`)
      } else {
        addResult('✅ Upload permission OK')
        await supabase.storage.from('media-library').remove([testFileName])
      }

      addResult('✅ Diagnostics complete!')

    } catch (error) {
      addResult(`❌ Unexpected error: ${error instanceof Error ? error.message : 'Unknown'}`)
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">System Diagnostics</h1>

        <Button onClick={runDiagnostics} disabled={testing} className="w-full">
          {testing ? 'Running...' : 'Run Diagnostics'}
        </Button>

        {results.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="font-mono text-sm space-y-1">
              {results.map((result, i) => (
                <div key={i} className={`
                  ${result.includes('❌') ? 'text-red-400' : ''}
                  ${result.includes('✅') ? 'text-green-400' : ''}
                  ${result.includes('🔍') ? 'text-blue-400 font-bold' : ''}
                `}>
                  {result}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

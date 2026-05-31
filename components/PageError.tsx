'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface PageErrorProps {
  error: Error & { digest?: string }
  reset: () => void
  title?: string
}

export default function PageError({ error, reset, title = 'Something went wrong' }: PageErrorProps) {
  useEffect(() => {
    console.error('Page error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-gray-400 mb-8">{error.message || 'An unexpected error occurred'}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#FF1E1E] rounded-lg hover:bg-[#FF1E1E]/90 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}

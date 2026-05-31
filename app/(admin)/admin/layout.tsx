import { requireAuth } from '@/lib/supabase/auth'
import AdminSidebar from '@/components/layout/admin-sidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAuth()

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 ml-64">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
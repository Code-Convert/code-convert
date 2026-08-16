import { createClient } from './server'
import { redirect } from 'next/navigation'
import type { User } from '@/types/user'

export async function getUser(): Promise<User | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  const { data: profile }: { data: any } = await supabase
    .from('profiles')
    .select('role, created_at, updated_at')
    .eq('id', user.id)
    .single()

  if (!profile) return null

  return {
    id: user.id,
    email: user.email || '',
    role: profile.role,
    created_at: profile.created_at,
    updated_at: profile.updated_at
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getUser()
  
  if (!user) {
    redirect('/admin-login')
  }
  
  return user
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin-login')
}
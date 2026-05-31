import { createClient } from './server'
import { redirect } from 'next/navigation'
import type { User } from '@/types/user'

export async function getUser(): Promise<User | null> {
  const supabase = await createClient()
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return null
    }

    // Get user role using RPC to bypass RLS
    const { data: role } = await supabase
      .rpc('get_user_role', { user_id: user.id })

    if (!role) {
      return null
    }

    // Get profile timestamps
    const { data: profile } = await supabase
      .from('profiles')
      .select('created_at, updated_at')
      .eq('id', user.id)
      .maybeSingle()

    return {
      id: user.id,
      email: user.email || '',
      role: role,
      created_at: profile?.created_at,
      updated_at: profile?.updated_at
    }
  } catch (error) {
    return null
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getUser()
  
  if (!user) {
    redirect('/admin-login')
  }
  
  return user
}

export async function requireAdmin(): Promise<User> {
  const user = await requireAuth()
  
  if (user.role !== 'admin') {
    redirect('/admin-login')
  }
  
  return user
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin-login')
}
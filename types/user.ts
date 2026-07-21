export interface User {
  id: string
  email: string
  role: string | null
  created_at: string | null
  updated_at: string | null
}

export interface AdminUser extends User {
  role: 'admin'
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthSession {
  user: User
  access_token: string
  refresh_token: string
  expires_at: number
}

export interface AuthError {
  message: string
  status?: number
}
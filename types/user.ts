export interface User {
  id: string
  email: string
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
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
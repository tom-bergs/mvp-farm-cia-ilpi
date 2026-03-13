import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Loader2 } from 'lucide-react'

const ROLE_REDIRECTS: Record<string, string> = {
  owner: '/owner',
  ilpi_admin: '/admin',
  profissional: '/profissionais',
  familia: '/familia',
}

interface Props {
  children: React.ReactNode
  allowedRoles: string[]
}

export function ProtectedRoute({ children, allowedRoles }: Props) {
  const { user, role, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  if (role && !allowedRoles.includes(role)) {
    return <Navigate to={ROLE_REDIRECTS[role] ?? '/'} replace />
  }

  return <>{children}</>
}

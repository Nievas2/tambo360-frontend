'use client'

import Loading from '@/components/layout/Loading'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    if (!user) {
      router.push('/iniciar-sesion')
      return
    }

    if (user.establecimientos.length === 0) {
      router.push('/establecimiento')
    }
  }, [user, loading, router])

  if (loading) {
    return <Loading />
  }

  if (!user || user.establecimientos.length === 0) {
    return <Loading />
  }

  return <>{children}</>
}

export default ProtectedRoute

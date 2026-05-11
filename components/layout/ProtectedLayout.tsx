'use client'

import Loading from '@/components/layout/Loading'
import { useAuth } from '@/context/AuthContext'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (loading) return

    if (!user) {
      console.log('Redirigiendo a login porque no hay user')
      router.replace('/iniciar-sesion')
      return
    }

    if (
      user.organizaciones != undefined &&
      user.organizaciones?.length > 0 &&
      pathname === '/bienvenida'
    ) {
      router.replace('/organizaciones')
    }
  }, [user, loading, router, pathname])

  if (loading || !user) {
    return <Loading />
  }

  return <>{children}</>
}
export default ProtectedRoute

'use client'

import Loading from '@/components/layout/Loading'
import { useAuth } from '@/context/AuthContext'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    // Si ya hay usuario, mándalo adentro
    if (user) {
      // Si no tiene establecimientos, a la selección
      if (user.establecimientos?.length === 0) {
        router.replace('/establecimiento')
      } else {
        router.replace('/analisis')
      }
    }
  }, [user, loading, router])

  if (loading) return <Loading />

  // Si hay usuario, no renderizamos el formulario de login para evitar saltos
  if (user) return <Loading />

  return <>{children}</>
}

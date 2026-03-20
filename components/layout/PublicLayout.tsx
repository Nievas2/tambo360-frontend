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
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (loading) return
    if (
      !loading &&
      user &&
      pathname !== '/verficar' &&
      pathname !== '/establecimiento'
    ) {
      router.push('/analisis')
    }

    if (
      user &&
      user.establecimientos.length > 0 &&
      pathname === '/establecimiento'
    ) {
      router.push('/analisis')
    }
  }, [user, loading, router])

  if (loading) {
    return <Loading />
  }

  return <>{children}</>
}

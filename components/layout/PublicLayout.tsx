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
  const pathname = usePathname()

  useEffect(() => {
    if (loading) return

    if (user && !pathname.includes('/verificar')) {
      router.replace('/organizaciones')
    }
  }, [user, loading, router, pathname])

  if (loading) return <Loading />

  return <>{children}</>
}

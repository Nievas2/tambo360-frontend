'use client'

import Loading from '@/components/layout/Loading'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
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

    if (user) {
      router.replace('/organizaciones')
    }
  }, [user, loading, router])

  if (loading) return <Loading />

  if (user) return <Loading />

  return <>{children}</>
}

'use client'

import Loading from '@/components/layout/Loading'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()
  const router = useRouter()
  console.log(user, loading)
  useEffect(() => {
    // Si todavía está cargando, no hagas NADA
    if (loading) return

    // Solo si terminó de cargar y REALMENTE no hay usuario, redirige
    if (!user) {
      console.log('Redirigiendo a login porque no hay user')
      router.replace('/iniciar-sesion') // Usa replace en lugar de push
      return
    }

    // Si hay usuario pero no tiene establecimientos
    if (user.establecimientos && user.establecimientos.length === 0) {
      router.replace('/establecimiento')
    }
  }, [user, loading, router])

  // Mientras loading sea true O el user sea null, mostramos Loading
  // Esto evita que el contenido protegido se parpadee
  if (loading || !user) {
    return <Loading />
  }

  return <>{children}</>
}
export default ProtectedRoute

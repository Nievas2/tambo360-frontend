'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/context/AuthContext'
import { useVerifyEmail } from '@/hooks/auth/useVerifyEmail'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const VerifyUser = () => {
  const { mutateAsync, error, isPending } = useVerifyEmail()
  const search = useSearchParams()
  const { setToken, setUser } = useAuth()
  const navigate = useRouter()

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = search.get('token')
        if (token) {
          await mutateAsync(token)
        }
      } catch (err) {
        console.warn(err)
      }
    }
    checkToken()
  }, [search, mutateAsync])

  return (
    <div
      className="min-h-screen w-full flex flex-col md:flex-row bg-[#F2F1EC] relative font-inter bg-[url('/vacas_4.webp')] bg-cover bg-center bg-no-repeat"
      data-testid="verify-user-page"
    >
      <div className="absolute inset-0 bg-black/10 z-0" />
      <div className="hidden md:flex md:w-1/3 xl:w-1/2" />
      <div className="w-full md:w-2/3 xl:w-1/2 flex items-center justify-center md:justify-end p-4 md:p-8 z-10">
        <Card className="w-full max-w-125 border-none shadow-2xl py-8 bg-white/95 backdrop-blur-md rounded-xl relative">
          <CardContent className="space-y-8">
            <div className="flex flex-col items-center text-center space-y-4 h-full">
              <div className="h-12 lg:h-20 w-auto flex items-start gap-2">
                <img
                  src="/logos/isotipo_tambo 1.png"
                  alt="logo"
                  className="h-12"
                />
                <img src="/logotipo 1.png" alt="tambo" className="h-6" />
              </div>
              <section className="min-h-[40vh] flex flex-col items-center justify-center gap-6">
                {isPending ? (
                  <div className="space-y-4" data-testid="verifying-loader">
                    <Loader2 className="w-12 h-12 text-[#0B1001] animate-spin mx-auto" />
                    <h2 className="text-4xl font-bold tracking-tight text-[#0B1001]">
                      Verificando...
                    </h2>
                  </div>
                ) : error ? (
                  <div
                    className="space-y-4"
                    data-testid="verification-failed-container"
                  >
                    <h2 className="text-4xl font-bold tracking-tight text-[#B91C1C]">
                      Verificación fallida
                    </h2>
                    <Button
                      onClick={() => navigate.push('/iniciar-sesion')}
                      variant="outline"
                      className="border-[#D1CFCA] text-[#0B1001]"
                      data-testid="back-to-login-button"
                    >
                      Volver al login
                    </Button>
                  </div>
                ) : (
                  <div
                    className="flex flex-col items-center justify-center gap-6"
                    data-testid="verification-success-container"
                  >
                    <img
                      src="/successIcon.svg"
                      alt="success"
                      className="w-20 h-20"
                    />
                    <h2 className="text-4xl font-bold tracking-tight text-[#0B1001]">
                      ¡Usuario validado!
                    </h2>
                    <p className="text-sm text-body-text text-center">
                      Ya puedes comenzar a gestionar tu <br />
                      producción.
                    </p>
                    <Button
                      className="w-full h-14 bg-[#0B1001] text-white rounded-lg flex items-center justify-center gap-2"
                      onClick={() => navigate.push('/establecimiento')}
                      data-testid="create-establishment-button"
                    >
                      Crear establecimiento <ArrowRight className="size-5" />
                    </Button>
                  </div>
                )}
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default VerifyUser

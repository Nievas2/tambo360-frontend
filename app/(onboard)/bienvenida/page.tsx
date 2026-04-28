'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Plus, SendHorizonal } from 'lucide-react'
import { useState } from 'react'
import CreateOrganization from '@/components/shared/dashboard/organization/CreateOrganization'
import CreateEstablishment from '@/components/shared/dashboard/establishment/CreateEstablishment'

const Page = () => {
  const [open, setOpen] = useState(false)
  const [openEstablishment, setOpenEstablishment] = useState(false)
  const [step, setStep] = useState<'welcome' | 'createOrganization'>('welcome')
  const navigate = useRouter()

  return (
    <div
      className="min-h-screen w-full flex flex-col md:flex-row bg-[#F2F1EC] relative font-inter bg-[url('/vacas_4.webp')] bg-cover bg-center bg-no-repeat"
      data-testid="verify-user-page"
    >
      <div className="w-full flex items-center justify-center z-10">
        <Card className="w-full max-w-150 border-none shadow-2xl py-14 bg-white/95 backdrop-blur-md rounded-xl relative">
          <CardContent className="space-y-8">
            {step === 'welcome' ? (
              <div className="flex flex-col items-center text-center space-y-18 h-full">
                <div className="w-auto flex items-start gap-2">
                  <h3 className="text-2xl font-bold">
                    ¡Bienvenido a Tambo 360!
                  </h3>
                </div>
                <section className="max-w-100 flex flex-col items-center justify-center gap-6">
                  <p>
                    Para comenzar, necesitas crear tu primera organización o
                    esperar a ser invitado por alguien más.
                  </p>
                </section>
                <section className="flex items-center justify-center gap-8 w-full">
                  <Button
                    variant="landing"
                    className="flex items-center gap-2 w-full h-12 max-w-48"
                    onClick={() => {
                      setOpen(true)
                    }}
                  >
                    <Plus className="text-black bg-white rounded-full" />
                    Crear Organización
                  </Button>

                  <Button
                    variant="darkGreen"
                    className="flex items-center gap-2 w-full h-12 max-w-48"
                    onClick={() => {
                      navigate.push('/invitaciones')
                    }}
                  >
                    <SendHorizonal className="" />
                    Invitaciones
                  </Button>
                </section>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center space-y-18 h-full">
                <div className="w-auto flex items-start gap-2">
                  <h3 className="text-2xl font-bold">
                    ¡Bienvenido a Tambo 360!
                  </h3>
                </div>
                <section className="flex items-center justify-center gap-8 w-full">
                  <Button
                    variant="landing"
                    className="flex items-center gap-2 w-full h-12 max-w-48"
                    onClick={() => {
                      setOpenEstablishment(true)
                    }}
                  >
                    <Plus className="text-black bg-white rounded-full" />
                    Crear establecimiento
                  </Button>
                </section>
              </div>
            )}

            <CreateEstablishment
              open={openEstablishment}
              onClose={() => setOpenEstablishment(false)}
            />

            <CreateOrganization
              open={open}
              onClose={() => setOpen(false)}
              nextStep={() => setStep('createOrganization')}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
export default Page

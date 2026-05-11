'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateEstablishment } from '@/hooks/establishment/useCreateEstablishment'
import { useCreateOrganization } from '@/hooks/organization/useCreateOrganization'
import { useInvitations } from '@/hooks/invitation/useInvitations'
import { EstablishmentSchema } from '@/types/establishment'
import { createOrganization } from '@/types/organization'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Building2, Plus, SendHorizonal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type Step = 'welcome' | 'createOrganization' | 'createEstablishment'

function StepIndicator({ current }: { current: Step }) {
  const steps = [
    { key: 'createOrganization', label: 'Organización' },
    { key: 'createEstablishment', label: 'Establecimiento' },
  ]

  if (current === 'welcome') return null

  const currentIndex = steps.findIndex((s) => s.key === current)

  return (
    <div className="flex items-center justify-center gap-3 mb-2">
      {steps.map((step, index) => {
        const isDone = index < currentIndex
        const isActive = index === currentIndex
        return (
          <div key={step.key} className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all
                  ${isActive ? 'bg-[#0B1001] text-white' : isDone ? 'bg-[#0B1001]/20 text-[#0B1001]' : 'bg-gray-100 text-gray-400'}`}
              >
                {isDone ? '✓' : index + 1}
              </div>
              <span
                className={`text-xs font-medium ${isActive ? 'text-[#0B1001]' : isDone ? 'text-[#0B1001]/60' : 'text-gray-400'}`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-px mb-4 ${isDone ? 'bg-[#0B1001]/40' : 'bg-gray-200'}`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

function OrganizationStep({ onSuccess }: { onSuccess: (id: string) => void }) {
  const { mutate, isPending, error, isSuccess } = useCreateOrganization()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '' },
    resolver: zodResolver(createOrganization),
  })

  const onSubmit = handleSubmit((data) => {
    mutate(data.name, {
      onSuccess: (res) => {
        onSuccess(res.data.idOrganizacion)
      },
    })
  })

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-4">
        <img src="/successIcon.svg" alt="success" className="w-16 h-16" />
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-[#0B1001]">
            ¡Organización creada!
          </h2>
          <p className="text-sm text-gray-500">
            Ahora podés crear tu primer establecimiento.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0B1001]/10 mb-3">
            <Building2 className="size-6 text-[#0B1001]" />
          </div>
          <h3 className="text-2xl font-bold text-[#0B1001]">
            Crear organización
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Esta será tu organización principal. Solo podés tener una.
          </p>
        </div>
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Label htmlFor="org-name">Nombre de la organización</Label>
          <Input
            id="org-name"
            placeholder="Ingrese el nombre de la organización"
            {...register('name')}
            disabled={isPending}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {error?.response?.data?.message && (
          <p className="text-sm text-red-500">
            {error.response.data.message ||
              'Ocurrió un error al crear la organización. Por favor, inténtelo de nuevo.'}
          </p>
        )}

        <div className="flex items-center justify-center w-full pt-2">
          <Button
            variant="darkGreen"
            className="w-40 h-12"
            type="submit"
            disabled={isPending}
          >
            {isPending ? 'Creando...' : 'ACEPTAR'}
          </Button>
        </div>
      </form>
    </>
  )
}

function EstablishmentStep({ organizationId }: { organizationId: string }) {
  const { mutate, isPending, error, isSuccess } = useCreateEstablishment()
  const navigate = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { nombre: '' },
    resolver: zodResolver(EstablishmentSchema),
  })

  const onSubmit = handleSubmit((data) => {
    mutate({ nombre: data.nombre, organizacionId: organizationId })
  })

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-4">
        <img src="/successIcon.svg" alt="success" className="w-16 h-16" />
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-[#0B1001]">
            ¡Establecimiento creado!
          </h2>
          <p className="text-sm text-gray-500">
            Todo listo. Podés ir al panel ahora.
          </p>
        </div>
        <Button
          variant="darkGreen"
          className="flex items-center gap-2 h-12 px-6"
          onClick={() => navigate.push('/organizaciones')}
        >
          Ir al panel <ArrowRight className="size-4" />
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0B1001]/10 mb-3">
            <Building2 className="size-6 text-[#0B1001]" />
          </div>
          <h3 className="text-2xl font-bold text-[#0B1001]">
            Crear establecimiento
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Añadí tu primer establecimiento dentro de la organización.
          </p>
        </div>
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Label htmlFor="est-name">Nombre del establecimiento</Label>
          <Input
            id="est-name"
            placeholder="Ingrese el nombre del establecimiento"
            {...register('nombre')}
            disabled={isPending}
          />
          {errors.nombre && (
            <p className="text-sm text-red-500">{errors.nombre.message}</p>
          )}
        </div>

        {error?.response?.data?.message && (
          <p className="text-sm text-red-500">
            {error.response.data.message ||
              'Ocurrió un error al crear el establecimiento. Por favor, inténtelo de nuevo.'}
          </p>
        )}

        <div className="flex items-center justify-center w-full pt-2">
          <Button
            variant="darkGreen"
            className="w-40 h-12"
            type="submit"
            disabled={isPending}
          >
            {isPending ? 'Creando...' : 'ACEPTAR'}
          </Button>
        </div>
      </form>
    </>
  )
}

const OnboardingFlow = () => {
  const [step, setStep] = useState<Step>('welcome')
  const [organizationId, setOrganizationId] = useState('')
  const navigate = useRouter()
  const { data: invitations } = useInvitations()

  const hasInvitations =
    (invitations?.data?.invitaciones_establecimiento?.length ?? 0) > 0 ||
    (invitations?.data?.invitaciones_organizacion?.length ?? 0) > 0

  const handleOrgSuccess = (id: string) => {
    setOrganizationId(id)
    // Small delay so the success state is visible before advancing
    setTimeout(() => setStep('createEstablishment'), 1200)
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col md:flex-row bg-[#F2F1EC] relative font-inter bg-[url('/vacas_4.webp')] bg-cover bg-center bg-no-repeat"
      data-testid="verify-user-page"
    >
      <div className="w-full flex items-center justify-center z-10">
        <Card className="w-full max-w-150 border-none shadow-2xl py-14 bg-white/95 backdrop-blur-md rounded-xl relative">
          <CardContent className="space-y-8">
            {/* Step indicator (only for form steps) */}
            <StepIndicator current={step} />

            {/* ── WELCOME ── */}
            {step === 'welcome' && (
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
                    onClick={() => setStep('createOrganization')}
                  >
                    <Plus className="text-black bg-white rounded-full" />
                    Crear Organización
                  </Button>

                  {hasInvitations && (
                    <Button
                      variant="darkGreen"
                      className="flex items-center gap-2 w-full h-12 max-w-48 relative"
                      onClick={() => navigate.push('/invitaciones')}
                    >
                      <div className="size-4 absolute top-2 right-2 bg-red-500" />
                      <SendHorizonal />
                      Invitaciones
                    </Button>
                  )}
                </section>
              </div>
            )}

            {/* ── CREATE ORGANIZATION ── */}
            {step === 'createOrganization' && (
              <OrganizationStep onSuccess={handleOrgSuccess} />
            )}

            {/* ── CREATE ESTABLISHMENT ── */}
            {step === 'createEstablishment' && (
              <EstablishmentStep organizationId={organizationId} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default OnboardingFlow

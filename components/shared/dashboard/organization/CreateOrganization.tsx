'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateOrganization } from '@/hooks/organization/useCreateOrganization'
import { createOrganization } from '@/types/organization'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'

interface CreateOrganizationProps {
  open: boolean
  onClose: () => void
  onOpen?: () => void
  nextStep: () => void
  setOrganizationId: (id: string) => void
}

const CreateOrganization = ({
  open,
  onClose,
  nextStep,
  setOrganizationId,
}: CreateOrganizationProps) => {
  const { mutate, isPending, error, isSuccess } = useCreateOrganization()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(createOrganization),
  })

  const onSubmit = handleSubmit((data) => {
    mutate(data.name, {
      onSuccess: (data) => {
        setOrganizationId(data.data.idOrganizacion)
      },
    })
  })

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose()
        reset()
      }}
    >
      <DialogContent className="bg-[#FFFBF1]">
        <DialogHeader>
          <DialogTitle>Crear organización</DialogTitle>
        </DialogHeader>
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center gap-6">
            <img src="/successIcon.svg" alt="success" className="w-20 h-20" />
            <h2 className="text-4xl font-bold tracking-tight text-[#0B1001]">
              Organización creada correctamente
            </h2>
            <p className="text-sm text-body-text text-center">
              La organización ha sido creada exitosamente.
            </p>
            <Button
              className="w-full h-14 bg-[#0B1001] text-white rounded-lg flex items-center justify-center gap-2"
              onClick={() => {
                nextStep()
                onClose()
                reset()
              }}
              data-testid="create-establishment-button"
            >
              Crear establecimiento <ArrowRight className="size-5" />
            </Button>
          </div>
        ) : (
          <form className="space-y-8 my-8" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label>Nombre de la organización</Label>
              <Input
                placeholder="Ingrese el nombre de la organización"
                {...register('name')}
                disabled={isPending}
              />

              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {error?.response?.data.message && (
              <p className="text-sm text-red-500">
                {error.response.data.message ||
                  'Ocurrió un error al crear la organización. Por favor, inténtelo de nuevo.'}
              </p>
            )}

            <div className="flex items-center justify-center w-full">
              <Button
                variant="darkGreen"
                className="w-32 h-14"
                type="submit"
                disabled={isPending}
              >
                ACEPTAR
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
export default CreateOrganization

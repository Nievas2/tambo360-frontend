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
import { useCreateEstablishment } from '@/hooks/establishment/useCreateEstablishment'
import { EstablishmentSchema } from '@/types/establishment'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface CreateEstablishmentProps {
  open: boolean
  onClose: () => void
  onOpen?: () => void
  firstTime?: (id: string) => void
  organizationId: string
}

const CreateEstablishment = ({
  open,
  onClose,
  firstTime,
  organizationId,
}: CreateEstablishmentProps) => {
  const [url, setUrl] = useState('')
  const {
    mutate,
    isPending,
    error,
    isSuccess,
    reset: resetForm,
  } = useCreateEstablishment()
  const navigate = useRouter()
  const pathname = usePathname()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      nombre: '',
    },
    resolver: zodResolver(EstablishmentSchema),
  })

  const onSubmit = handleSubmit((data) => {
    mutate(
      { nombre: data.nombre, organizacionId: organizationId },
      {
        onSuccess: (data) => {
          if (firstTime) {
            firstTime(data.data.idEstablecimiento)
            setUrl(
              `/organizaciones/${organizationId}/${data.data.idEstablecimiento}/cuestionario`
            )
          }
        },
      }
    )
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
          <DialogTitle>Crear establecimiento</DialogTitle>
        </DialogHeader>
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center gap-6">
            <img src="/successIcon.svg" alt="success" className="w-20 h-20" />
            <h2 className="text-4xl font-bold tracking-tight text-[#0B1001] text-center">
              Establecimiento creado correctamente
            </h2>

            <div className="flex items-center gap-4">
              <Button
                variant="landing"
                onClick={() => {
                  navigate.push('/organizaciones')
                  reset()
                  onClose()
                  resetForm()
                }}
              >
                {pathname == '/organizaciones' ? (
                  'Cerrar'
                ) : (
                  <>
                    Ir al panel <ArrowRight className="size-5" />
                  </>
                )}
              </Button>

              {url && (
                <Button
                  variant="darkGreen"
                  onClick={() => {
                    navigate.push(url)
                    reset()
                    onClose()
                    resetForm()
                  }}
                >
                  Ir al cuestionario <ArrowRight className="size-5" />
                </Button>
              )}
            </div>
          </div>
        ) : (
          <form className="space-y-8 my-8" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label>Nombre del establecimiento</Label>
              <Input
                placeholder="Ingrese el nombre de la establecimiento"
                {...register('nombre')}
                disabled={isPending}
              />

              {errors.nombre && (
                <p className="text-sm text-red-500">{errors.nombre.message}</p>
              )}
            </div>

            {error?.response?.data.message && (
              <p className="text-sm text-red-500">
                {error.response.data.message ||
                  'Ocurrió un error al crear el establecimiento. Por favor, inténtelo de nuevo.'}
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
export default CreateEstablishment

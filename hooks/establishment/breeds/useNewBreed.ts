'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'

const newBreedSchema = z.object({
  nombre: z.string().min(1, 'El nombre de la raza es requerido'),
  categoria: z.string().min(1, 'La categoría es requerida'),
  minimoProduccion: z.number().min(0).optional(),
  maximoProduccion: z.number().min(0).optional(),
})

export type NewBreedForm = z.infer<typeof newBreedSchema>

interface UseNewBreedProps {
  onClose: () => void
}

export function useNewBreed({ onClose }: UseNewBreedProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewBreedForm>({
    resolver: zodResolver(newBreedSchema),
    defaultValues: {
      nombre: '',
      categoria: 'lechera',
      minimoProduccion: undefined,
      maximoProduccion: undefined,
    },
  })

  // TODO: reemplazar con mutación real cuando el backend tenga el endpoint POST /razas
  const isPending = false

  const onSubmit = async (data: NewBreedForm) => {
    try {
      console.log('Crear raza:', data)
      toast.info('Funcionalidad pendiente de implementación en el backend', {
        position: 'top-center',
      })
      reset()
      onClose()
    } catch {
      toast.error('No se pudo crear la raza', { position: 'top-center' })
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
    isPending,
    onSubmit,
  }
}

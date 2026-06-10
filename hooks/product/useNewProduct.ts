'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'

const newProductSchema = z.object({
  nombre: z.string().min(1, 'El nombre del producto es requerido'),
  unidad: z.string().min(1, 'La unidad de medida es requerida'),
})

export type NewProductForm = z.infer<typeof newProductSchema>

interface UseNewProductProps {
  onClose: () => void
}

export function useNewProduct({ onClose }: UseNewProductProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewProductForm>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      nombre: '',
      unidad: 'litros',
    },
  })

  // TODO: reemplazar con mutación real cuando el backend tenga el endpoint POST /productos
  const isPending = false

  const onSubmit = async (data: NewProductForm) => {
    try {
      console.log('Crear producto:', data)
      toast.info('Funcionalidad pendiente de implementación en el backend', {
        position: 'top-center',
      })
      reset()
      onClose()
    } catch {
      toast.error('No se pudo crear el producto', { position: 'top-center' })
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

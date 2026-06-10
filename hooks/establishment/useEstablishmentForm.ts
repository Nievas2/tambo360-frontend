'use client'
import { useEstablishment } from '@/hooks/establishment/useEstablishment'
import { useUpdateEstablishmentName } from '@/hooks/establishment/useUpdateEstablishmentName'
import { useConfiguration } from '@/hooks/establishment/useConfiguration'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'

const establishmentFormSchema = z.object({
  nombre: z
    .string()
    .min(5, 'El nombre del establecimiento debe tener al menos 5 caracteres')
    .max(
      100,
      'El nombre del establecimiento no puede tener más de 100 caracteres'
    ),
  cuencaLechera: z.string().min(1, 'La cuenca lechera es requerida'),
  tipoOrdenie: z.string().min(1, 'El tipo de ordeñe es requerido'),
  geolocalizacion: z.string().optional(),
})

export type EstablishmentFormData = z.infer<typeof establishmentFormSchema>

export function useEstablishmentForm() {
  const params = useParams()
  const id = params?.id as string

  const { data: establishmentData, isLoading: isLoadingEstablishment } =
    useEstablishment({ id })
  const { data: config, isLoading: isLoadingConfig } = useConfiguration()
  // mutateAsync recibe un string directamente (ver useUpdateEstablishmentName)
  const { mutateAsync: updateName, isPending } = useUpdateEstablishmentName()

  const [geoError, setGeoError] = useState<string | null>(null)
  const [isGettingLocation, setIsGettingLocation] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<EstablishmentFormData>({
    resolver: zodResolver(establishmentFormSchema),
    defaultValues: {
      nombre: '',
      cuencaLechera: '',
      tipoOrdenie: '',
      geolocalizacion: '',
    },
  })

  useEffect(() => {
    if (!establishmentData?.data) return

    // data es Establecimiento_OrganiacionUsuario
    // el establecimiento real está en .establecimiento
    const est = establishmentData.data?.establecimiento

    reset({
      nombre: est?.nombre ?? '',
      cuencaLechera: est?.provincia ?? '',
      tipoOrdenie: config?.data?.data?.tipo_ordeñe ?? '',
      geolocalizacion: '',
    })
  }, [establishmentData, config, reset])

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Tu navegador no soporta geolocalización')
      return
    }
    setIsGettingLocation(true)
    setGeoError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setValue(
          'geolocalizacion',
          `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
        )
        setIsGettingLocation(false)
      },
      () => {
        setGeoError(
          'No se pudo obtener la ubicación automáticamente. Por favor ingrese las coordenadas manualmente para asegurar la precisión del mapa.'
        )
        setIsGettingLocation(false)
      }
    )
  }

  const onSubmit = async (data: EstablishmentFormData) => {
    try {
      // mutateAsync espera string directamente
      await updateName(data.nombre)
      toast.success('Cambios guardados correctamente', {
        position: 'top-center',
        duration: 4000,
      })
    } catch {
      toast.error('No se pudieron guardar los cambios', {
        position: 'top-center',
      })
    }
  }

  const onCancel = () => {
    reset()
    setGeoError(null)
  }

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    isDirty,
    isPending,
    isLoading: isLoadingEstablishment || isLoadingConfig,
    geoError,
    isGettingLocation,
    handleGetLocation,
    onSubmit,
    onCancel,
  }
}

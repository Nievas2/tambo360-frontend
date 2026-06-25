'use client'
import { useEstablishment } from '@/hooks/establishment/useEstablishment'
import { useUpdateEstablishmentName } from '@/hooks/establishment/useUpdateEstablishmentName'
import { useConfiguration } from '@/hooks/establishment/useConfiguration'
import {
  establishmentFormSchema,
  EstablishmentFormData,
} from '@/types/establishment'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

export function useEstablishmentForm() {
  const params = useParams()
  const id = params?.id as string

  const { data: establishmentData, isLoading: isLoadingEstablishment } =
    useEstablishment({ id })
  const { data: config, isLoading: isLoadingConfig } = useConfiguration()
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

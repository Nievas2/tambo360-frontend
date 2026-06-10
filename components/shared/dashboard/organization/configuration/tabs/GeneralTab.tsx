'use client'
import { Label } from '@/components/ui/label'
import { MapPin, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEstablishmentForm } from '@/hooks/establishment/useEstablishmentForm'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const CUENCA_LECHERA_OPTIONS = [
  'Cuenca Oeste',
  'Cuenca Norte',
  'Cuenca Sur',
  'Cuenca Este',
  'Cuenca Central',
]

const TIPO_ORDENIE_OPTIONS = [
  { value: 'espina_de_pescado', label: 'Espina de Pescado' },
  { value: 'balde', label: 'Balde' },
  { value: 'linea', label: 'Línea' },
  { value: 'rotativo', label: 'Rotativo' },
  { value: 'manual', label: 'Manual' },
  { value: 'otro', label: 'Otro' },
]

export default function GeneralTab() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    isPending,
    isLoading,
    geoError,
    isGettingLocation,
    handleGetLocation,
    onSubmit,
    onCancel,
  } = useEstablishmentForm()

  const cuencaLechera = watch('cuencaLechera')
  const tipoOrdenie = watch('tipoOrdenie')

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-[#29845A] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0B1001]">
          Datos del Establecimiento
        </h1>
        <p className="text-sm text-[#6B7280] mt-1">
          Gestione la información estructural de una unidad productiva para
          optimizar el seguimiento y los reportes de rendimiento.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Formulario */}
          <div
            className={cn(
              'flex-1 border border-[#E5E7EB] rounded-xl p-5 flex flex-col gap-4 bg-white',
              errors.nombre ? 'border-l-4 border-l-[#EF4444]' : ''
            )}
          >
            <p className="text-sm font-semibold text-[#0B1001]">
              Identificación General
            </p>

            {/* Nombre */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm text-[#374151]">
                Nombre del Establecimiento
              </Label>
              <input
                {...register('nombre')}
                placeholder="Tambo La Esperanza"
                className={cn(
                  'h-10 w-full px-3 rounded-lg border text-sm outline-none transition-colors bg-[#F9FAFB]',
                  errors.nombre
                    ? 'border-[#EF4444]'
                    : 'border-[#D1D5DB] focus:border-[#29845A]'
                )}
              />
              {errors.nombre && (
                <div className="flex items-center gap-1.5 bg-[#FEF2F2] border border-[#FECACA] rounded-lg px-3 py-2">
                  <AlertCircle size={14} className="text-[#EF4444] shrink-0" />
                  <p className="text-xs text-[#EF4444]">
                    {errors.nombre.message}
                  </p>
                </div>
              )}
            </div>

            {/* Cuenca Lechera */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm text-[#374151]">Cuenca Lechera</Label>
              <Select
                value={cuencaLechera}
                onValueChange={(val) =>
                  setValue('cuencaLechera', val, { shouldValidate: true })
                }
              >
                <SelectTrigger
                  className={cn(
                    'h-10 w-full bg-[#F9FAFB] text-sm',
                    errors.cuencaLechera
                      ? 'border-[#EF4444]'
                      : 'border-[#D1D5DB]'
                  )}
                >
                  <SelectValue placeholder="Seleccionar cuenca" />
                </SelectTrigger>
                <SelectContent>
                  {CUENCA_LECHERA_OPTIONS.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.cuencaLechera && (
                <p className="text-xs text-[#EF4444]">
                  {errors.cuencaLechera.message}
                </p>
              )}
            </div>

            {/* Tipo de Ordeñe */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm text-[#374151]">Tipo de ordeñe</Label>
              <Select
                value={tipoOrdenie}
                onValueChange={(val) =>
                  setValue('tipoOrdenie', val, { shouldValidate: true })
                }
              >
                <SelectTrigger
                  className={cn(
                    'h-10 w-full bg-[#F9FAFB] text-sm',
                    errors.tipoOrdenie ? 'border-[#EF4444]' : 'border-[#D1D5DB]'
                  )}
                >
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {TIPO_ORDENIE_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.tipoOrdenie && (
                <p className="text-xs text-[#EF4444]">
                  {errors.tipoOrdenie.message}
                </p>
              )}
            </div>

            {/* Geolocalización */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-[#374151]">
                  Geolocalización
                </Label>
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={isGettingLocation}
                  className="flex items-center gap-1.5 text-xs font-medium text-white bg-[#29845A] px-3 py-1.5 rounded-full hover:bg-[#29845A]/90 transition-colors disabled:opacity-60"
                >
                  <MapPin size={12} />
                  {isGettingLocation ? 'Obteniendo...' : 'Usar mi ubicación'}
                </button>
              </div>
              <input
                {...register('geolocalizacion')}
                placeholder="-34.6037, -58.3816"
                className={cn(
                  'h-10 w-full px-3 rounded-lg border text-sm outline-none transition-colors bg-[#F9FAFB]',
                  geoError
                    ? 'border-[#EF4444]'
                    : 'border-[#D1D5DB] focus:border-[#29845A]'
                )}
              />
              {geoError && (
                <div className="flex items-start gap-1.5 bg-[#FEF2F2] border border-[#FECACA] rounded-lg px-3 py-2">
                  <AlertCircle
                    size={14}
                    className="text-[#EF4444] shrink-0 mt-0.5"
                  />
                  <p className="text-xs text-[#EF4444]">{geoError}</p>
                </div>
              )}
            </div>
          </div>

          {/* Diagnóstico Inicial */}
          <div className="w-full lg:w-56 shrink-0">
            <div className="rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#29845A] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                  i
                </span>
                <p className="text-sm font-semibold text-[#14532D]">
                  Diagnóstico Inicial
                </p>
              </div>
              <p className="text-xs text-[#166534] leading-relaxed">
                Los datos mostrados han sido recuperados automáticamente de su
                diagnóstico completado el 12 de febrero. Revise la ubicación
                exacta para asegurar la precisión de los reportes
                meteorológicos.
              </p>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="px-8 py-2.5 text-sm font-medium text-[#374151] bg-white border border-[#D1D5DB] rounded-lg hover:bg-[#F9FAFB] transition-colors disabled:opacity-60"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-8 py-2.5 text-sm font-medium text-white bg-[#29845A] rounded-lg hover:bg-[#29845A]/90 transition-colors disabled:opacity-60"
          >
            {isPending ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  )
}

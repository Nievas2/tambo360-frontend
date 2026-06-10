'use client'
import { MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEstablishmentForm } from '@/hooks/establishment/useEstablishmentForm'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CheckCircle2 } from 'lucide-react'

const CUENCA_LECHERA_OPTIONS = [
  'Cuenca Oeste (Bs. As.)',
  'Cuenca Abasto',
  'Cuenca Mar y Sierras',
  'Cuenca Norte',
  'Cuenca Sur',
  'Cuenca Central',
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
  } = useEstablishmentForm()

  const cuencaLechera = watch('cuencaLechera')

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
        <h1 className="text-2xl font-bold text-[#0B1001]">Configuración</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Tarjeta izquierda — Datos del Establecimiento */}
          <div className="flex-1 border border-[#E5E7EB] rounded-xl p-5 flex flex-col gap-4 bg-white">
            <p className="text-base font-bold text-[#0B1001]">
              Datos del Establecimiento
            </p>

            {/* Nombre */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm text-[#374151]">
                Nombre del Establecimiento
              </Label>
              <input
                {...register('nombre')}
                placeholder="Ej: El Progreso S.A."
                className={cn(
                  'h-10 w-full px-3 rounded-lg border text-sm outline-none transition-colors bg-[#F9FAFB]',
                  errors.nombre
                    ? 'border-[#EF4444]'
                    : 'border-[#D1D5DB] focus:border-[#29845A]'
                )}
              />
              {errors.nombre && (
                <p className="text-xs text-[#EF4444]">
                  {errors.nombre.message}
                </p>
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

            {/* Geolocalización */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm text-[#374151]">
                Geolocalización (Clima exacto)
              </Label>
              <div className="flex gap-2">
                <input
                  {...register('geolocalizacion')}
                  placeholder="-34.6037, -58.3816"
                  className={cn(
                    'h-10 flex-1 px-3 rounded-lg border text-sm outline-none transition-colors bg-[#F9FAFB]',
                    geoError
                      ? 'border-[#EF4444]'
                      : 'border-[#D1D5DB] focus:border-[#29845A]'
                  )}
                />
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={isGettingLocation}
                  className="flex items-center gap-1.5 text-xs font-medium text-white bg-[#29845A] px-4 py-2 rounded-lg hover:bg-[#29845A]/90 transition-colors disabled:opacity-60 shrink-0"
                >
                  <MapPin size={14} />
                  {isGettingLocation ? 'Obteniendo...' : 'Ubicar'}
                </button>
              </div>
              {geoError && <p className="text-xs text-[#EF4444]">{geoError}</p>}
            </div>

            {/* Botón Guardar */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 text-sm font-bold text-white bg-[#29845A] rounded-lg hover:bg-[#29845A]/90 transition-colors disabled:opacity-60 mt-2"
            >
              {isPending ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>

          {/* Tarjeta derecha — Diagnóstico */}
          <div className="flex-1 border border-[#BBF7D0] rounded-xl p-5 flex flex-col gap-4 bg-[#F0FDF4]">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={20} className="text-[#29845A]" />
              <p className="text-base font-bold text-[#14532D]">
                Diagnóstico Completado
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { label: 'DEL Global (Curva)', value: '150 Días' },
                { label: 'Tipo de Ordeñe', value: '2 veces/día · Mecánico' },
                { label: 'Rodeo Alta', value: '120 cab · $4.50/día' },
                { label: 'Rodeo Baja', value: '80 cab · $2.80/día' },
                { label: 'Secas', value: '20 cab · $1.50/día' },
                { label: 'Comprador', value: 'Danone Argentina' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between"
                >
                  <p className="text-sm text-[#166534]">{item.label}</p>
                  <p className="text-sm font-bold text-[#14532D]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="w-full py-2.5 text-sm font-medium text-[#374151] bg-white border border-[#D1D5DB] rounded-lg hover:bg-[#F9FAFB] transition-colors mt-2"
            >
              Rehacer Diagnóstico
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

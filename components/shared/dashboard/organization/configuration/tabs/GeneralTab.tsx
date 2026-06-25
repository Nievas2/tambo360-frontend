'use client'
import { Info, AlertTriangle, Crosshair } from 'lucide-react'
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

const CUENCA_LECHERA_OPTIONS = [
  'Cuenca Oeste',
  'Cuenca Abasto',
  'Cuenca Mar y Sierras',
  'Cuenca Norte',
]

const TIPO_ORDENE_OPTIONS = [
  'Espina de Pescado',
  'Rotativo',
  'En Tándem',
  'Brete Individual',
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
  const tipoOrdene = watch('tipoOrdenie')

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-[#65A30D] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="w-full max-w-[1000px] mx-auto p-4 bg-[#F8FAFC]">
      {/* Encabezado Principal */}
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-black tracking-tight">
          Datos del Establecimiento
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Gestione la información estructural de una unidad productiva para
          optimizar el seguimiento y los reportes de rendimiento.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* Distribución en 2 Columnas principales */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Columna Izquierda: Formulario (Ocupa 7 de 12 columnas) */}
          <div className="md:col-span-7 flex flex-col gap-5">
            <h3 className="text-sm font-bold text-black tracking-tight">
              Identificación General
            </h3>

            {/* Campo: Nombre del Establecimiento */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-gray-700">
                Nombre del Establecimiento
              </Label>
              <input
                {...register('nombre')}
                placeholder="Tambo La Esperanza"
                className={cn(
                  'h-10 w-full px-3 rounded-lg border text-sm outline-none bg-[#F1F3F5] text-black transition-colors',
                  errors.nombre
                    ? 'border-red-500'
                    : 'border-gray-200/80 focus:border-lime-600'
                )}
              />
              {/* Alerta de Error obligatoria estilo Figma (image_36b9ff.png) */}
              {errors.nombre && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#E11D48] mt-0.5">
                  <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#E11D48] text-white text-[10px]">
                    !
                  </span>
                  Este campo es obligatorio para el registro del sistema
                </div>
              )}
            </div>

            {/* Campo: Cuenca Lechera */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-gray-700">
                Cuenca Lechera
              </Label>
              <Select
                value={cuencaLechera}
                onValueChange={(val) =>
                  setValue('cuencaLechera', val, { shouldValidate: true })
                }
              >
                <SelectTrigger className="h-10 w-full bg-[#F1F3F5] text-sm text-black border-gray-200/80 shadow-none">
                  <SelectValue placeholder="Cuenca Oeste" />
                </SelectTrigger>
                <SelectContent>
                  {CUENCA_LECHERA_OPTIONS.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Campo: Tipo de Ordeñe */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-gray-700">
                Tipo de ordeñe
              </Label>
              <Select
                value={tipoOrdene}
                onValueChange={(val) =>
                  setValue('tipoOrdenie', val, { shouldValidate: true })
                }
              >
                <SelectTrigger className="h-10 w-full bg-[#F1F3F5] text-sm text-black border-gray-200/80 shadow-none">
                  <SelectValue placeholder="Espina de Pescado" />
                </SelectTrigger>
                <SelectContent>
                  {TIPO_ORDENE_OPTIONS.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Campo: Geolocalización con botón arriba */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium text-gray-700">
                  Geolocalización
                </Label>
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={isGettingLocation}
                  className="flex items-center gap-2 text-sm font-medium text-white bg-[#6A9412] hover:bg-[#587B0E] px-4 py-2 rounded-xl transition-colors shrink-0 font-sans shadow-none"
                >
                  <Crosshair
                    className={cn(
                      'w-4 h-4 text-white',
                      isGettingLocation && 'animate-spin'
                    )}
                  />
                  <span className="tracking-wide text-[14px]">
                    {isGettingLocation ? 'Obteniendo...' : 'Usar mi ubicación'}
                  </span>
                </button>
              </div>

              <input
                {...register('geolocalizacion')}
                placeholder="-34.6037, -58.3816"
                className={cn(
                  'h-10 w-full px-3 rounded-lg border text-sm outline-none bg-[#F1F3F5] text-gray-700',
                  geoError ? 'border-red-300' : 'border-gray-200/80'
                )}
              />

              {/* Banner de error de Geolocalización (image_36b9ff.png) */}
              {geoError && (
                <div className="flex items-start gap-2 bg-[#FCE8E6] border border-[#F8D7DA] rounded-lg p-3 mt-1">
                  <AlertTriangle
                    size={16}
                    className="text-[#DF2121] shrink-0 mt-0.5"
                  />
                  <p className="text-[11px] font-bold text-[#DF2121] leading-normal">
                    No se pudo obtener la ubicación automáticamente. Por favor
                    ingrese las coordenadas manualmente para asegurar la
                    precisión del mapa
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Columna Derecha: Tarjeta informativa Diagnóstico Inicial (Ocupa 5 de 12 columnas) */}
          <div className="md:col-span-5 md:mt-7">
            <div className="bg-[#E6F4EA] rounded-md p-5 flex gap-3 border border-transparent">
              <Info size={16} className="text-[#0F766E] shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1.5">
                <h4 className="text-xs font-bold text-[#0F766E]">
                  Diagnóstico Inicial
                </h4>
                <p className="text-xs text-gray-700 font-medium leading-relaxed">
                  Los datos mostrados han sido recuperados automáticamente de su
                  diagnóstico completado 12 de febrero. Revisa la ubicación
                  exacta para asegurar la precisión de los reportes
                  meterológicos
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botones inferiores de acción centrados */}
        <div className="flex items-center justify-center gap-4 mt-12 pt-4">
          <button
            type="button"
            className="w-[160px] h-10 text-xs font-bold text-white bg-[#94A3B8] rounded-md hover:bg-[#64748B] tracking-wider transition-colors shadow-sm"
          >
            CANCELAR
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="w-[180px] h-10 text-xs font-bold text-white bg-[#65A30D] rounded-md hover:bg-[#4D7C0F] tracking-wider transition-colors shadow-sm"
          >
            {isPending ? 'GUARDANDO...' : 'GUARDAR CAMBIOS'}
          </button>
        </div>
      </form>
    </div>
  )
}

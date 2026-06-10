'use client'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useNewBreed } from '@/hooks/establishment/breeds/useNewBreed'

const CATEGORIAS = [
  { value: 'lechera', label: 'Lechera' },
  { value: 'carne', label: 'Carne' },
  { value: 'doble_proposito', label: 'Doble Propósito' },
]

interface NewBreedModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function NewBreedModal({ isOpen, onClose }: NewBreedModalProps) {
  const {
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
    isPending,
    onSubmit,
  } = useNewBreed({ onClose })

  if (!isOpen) return null

  const categoria = watch('categoria')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-base font-bold text-[#0B1001] uppercase tracking-wide">
              Nueva Raza Personalizada
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#F3F4F6] rounded-lg transition-colors"
          >
            <X size={18} className="text-[#6B7280]" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Nombre */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#374151]">Nombre de la Raza</label>
            <input
              {...register('nombre')}
              placeholder="Ej: Pardo Suizo Local"
              className={cn(
                'h-10 w-full px-3 rounded-lg border text-sm outline-none transition-colors bg-[#F9FAFB]',
                errors.nombre
                  ? 'border-[#EF4444]'
                  : 'border-[#D1D5DB] focus:border-[#29845A]'
              )}
            />
            {errors.nombre && (
              <p className="text-xs text-[#EF4444]">{errors.nombre.message}</p>
            )}
          </div>

          {/* Categoría */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#374151]">Categoría</label>
            <select
              value={categoria}
              onChange={(e) => setValue('categoria', e.target.value)}
              className="h-10 w-full px-3 rounded-lg border border-[#D1D5DB] text-sm outline-none bg-[#F9FAFB] focus:border-[#29845A]"
            >
              {CATEGORIAS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Rango de producción */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm text-[#374151]">
                Rango de Producción Esperado
              </label>
              <span className="text-xs text-[#9CA3AF]">Litros/día</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#6B7280]">Mínimo</label>
                <input
                  {...register('minimoProduccion', { valueAsNumber: true })}
                  type="number"
                  min={0}
                  className={cn(
                    'h-10 w-full px-3 rounded-lg border text-sm outline-none transition-colors bg-[#F9FAFB]',
                    errors.minimoProduccion
                      ? 'border-[#EF4444]'
                      : 'border-[#D1D5DB] focus:border-[#29845A]'
                  )}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#6B7280]">Máximo</label>
                <input
                  {...register('maximoProduccion', { valueAsNumber: true })}
                  type="number"
                  min={0}
                  className={cn(
                    'h-10 w-full px-3 rounded-lg border text-sm outline-none transition-colors bg-[#F9FAFB]',
                    errors.maximoProduccion
                      ? 'border-[#EF4444]'
                      : 'border-[#D1D5DB] focus:border-[#29845A]'
                  )}
                />
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 text-sm font-medium text-[#374151] border border-[#D1D5DB] rounded-lg hover:bg-[#F9FAFB] transition-colors uppercase tracking-wide"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 py-2.5 text-sm font-bold text-white bg-[#29845A] rounded-lg hover:bg-[#29845A]/90 transition-colors disabled:opacity-60 uppercase tracking-wide"
            >
              {isPending ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

'use client'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useNewProduct } from '@/hooks/product/useNewProduct'
import { Unidad } from '@/types/enums'

const UNIDADES = [
  { value: Unidad.LITROS, label: 'Litros' },
  { value: Unidad.KG, label: 'Kilogramos (kg)' },
]

interface NewProductModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function NewProductModal({
  isOpen,
  onClose,
}: NewProductModalProps) {
  const {
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
    isPending,
    onSubmit,
  } = useNewProduct({ onClose })

  if (!isOpen) return null

  const unidad = watch('unidad')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 text-center">
            <h2 className="text-base font-bold text-[#0B1001] uppercase tracking-wide">
              Nuevo Producto
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
            <label className="text-sm text-[#374151]">
              Nombre del Producto
            </label>
            <input
              {...register('nombre')}
              placeholder="Ej: Leche Entera"
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

          {/* Unidad de Medida */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#374151]">Unidad de Medida</label>
            <select
              value={unidad}
              onChange={(e) => setValue('unidad', e.target.value as Unidad)}
              className="h-10 w-full px-3 rounded-lg border border-[#D1D5DB] text-sm outline-none bg-[#F9FAFB] focus:border-[#29845A]"
            >
              {UNIDADES.map((u) => (
                <option key={u.value} value={u.value}>
                  {u.label}
                </option>
              ))}
            </select>
          </div>

          {/* Botones */}
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 text-sm font-medium text-[#374151] border border-[#D1D5DB] rounded-lg hover:bg-[#F9FAFB] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 py-2.5 text-sm font-bold text-white bg-[#29845A] rounded-lg hover:bg-[#29845A]/90 transition-colors disabled:opacity-60 uppercase tracking-wide"
            >
              {isPending ? 'Creando...' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

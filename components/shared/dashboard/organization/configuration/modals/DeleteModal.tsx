'use client'
import { X, AlertTriangle } from 'lucide-react'
import { Invitacion } from '@/types/invite'

interface DeleteModalProps {
  target: Invitacion | null
  onClose: () => void
  onConfirm?: () => void
  isPending?: boolean
}

export default function DeleteModal({
  target,
  onClose,
  onConfirm,
  isPending,
}: DeleteModalProps) {
  if (!target) return null

  const nombre = target.usuario?.nombre ?? target.correo

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 flex flex-col gap-5">
        {/* Cerrar */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            title="Cerrar"
            className="p-1 hover:bg-[#F3F4F6] rounded-lg transition-colors"
          >
            <X size={18} className="text-[#6B7280]" />
          </button>
        </div>

        {/* Contenido */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-14 h-14 rounded-full bg-[#FEF2F2] flex items-center justify-center">
            <AlertTriangle size={28} className="text-[#EF4444]" />
          </div>
          <h2 className="text-base font-bold text-[#0B1001]">
            ¿Eliminar integrante?
          </h2>
          <p className="text-sm text-[#6B7280] leading-relaxed">
            Estás por eliminar a{' '}
            <strong className="text-[#0B1001]">{nombre}</strong> de la
            organización. Perderá el acceso inmediato a todos los datos del
            establecimiento.
          </p>
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="flex-1 py-2.5 text-sm font-medium text-[#374151] border border-[#D1D5DB] rounded-lg hover:bg-[#F9FAFB] transition-colors disabled:opacity-60"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm ?? onClose}
            disabled={isPending}
            className="flex-1 py-2.5 text-sm font-bold text-white bg-[#EF4444] rounded-lg hover:bg-[#EF4444]/90 transition-colors disabled:opacity-60 uppercase tracking-wide"
          >
            {isPending ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  )
}

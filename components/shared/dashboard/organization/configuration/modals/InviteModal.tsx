'use client'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { InvitationRole } from '@/types/enums'
import { SendInviteForm } from '@/hooks/team/useTeam'
import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'

interface InviteModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: SendInviteForm) => void
  register: UseFormRegister<SendInviteForm>
  handleSubmit: UseFormHandleSubmit<SendInviteForm>
  errors: FieldErrors<SendInviteForm>
  setValue: UseFormSetValue<SendInviteForm>
  watch: UseFormWatch<SendInviteForm>
  isPending: boolean
}

export default function InviteModal({
  isOpen,
  onClose,
  onSubmit,
  register,
  handleSubmit,
  errors,
  setValue,
  watch,
  isPending,
}: InviteModalProps) {
  if (!isOpen) return null

  const rol = watch('rol')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 text-center">
            <h2 className="text-base font-bold text-[#0B1001] uppercase tracking-wide">
              Invitar Integrante
            </h2>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Agregar un nuevo miembro a tu equipo de trabajo.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="p-1 hover:bg-[#F3F4F6] rounded-lg transition-colors"
          >
            <X size={18} className="text-[#6B7280]" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Correo */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#374151]">Correo Electrónico</label>
            <input
              {...register('correo')}
              placeholder="nombre@ejemplo.com"
              className={cn(
                'h-10 w-full px-3 rounded-lg border text-sm outline-none transition-colors bg-[#F9FAFB]',
                errors.correo
                  ? 'border-[#EF4444]'
                  : 'border-[#D1D5DB] focus:border-[#29845A]'
              )}
            />
            {errors.correo && (
              <p className="text-xs text-[#EF4444]">{errors.correo.message}</p>
            )}
          </div>

          {/* Rol */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#374151]">Asignar Rol</label>
            <select
              value={rol}
              onChange={(e) =>
                setValue('rol', e.target.value as InvitationRole)
              }
              aria-label="Asignar Rol"
              className="h-10 w-full px-3 rounded-lg border border-[#D1D5DB] text-sm outline-none bg-[#F9FAFB] focus:border-[#29845A]"
            >
              <option value={InvitationRole.EMPLOYEE}>Tambero</option>
              <option value={InvitationRole.ADMIN}>Administrador</option>
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
              {isPending ? 'Enviando...' : 'Enviar Invitación'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

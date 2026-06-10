'use client'
import {
  Pencil,
  Trash2,
  Search,
  SlidersHorizontal,
  UserPlus,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTeam } from '@/hooks/teams/useTeam'
import { Invitacion } from '@/types/invite'
import InviteModal from '@/components/shared/dashboard/organization/configuration/modals/InviteModal'
import DeleteModal from '@/components/shared/dashboard/organization/configuration/modals/DeleteModal'

// Badge de rol
const ROL_STYLES: Record<string, string> = {
  OWNER: 'bg-[#DCFCE7] text-[#15803D]',
  ADMIN: 'bg-[#DBEAFE] text-[#1D4ED8]',
  EMPLOYEE: 'bg-[#FEF9C3] text-[#854D0E]',
  default: 'bg-[#F3F4F6] text-[#374151]',
}

const ROL_LABELS: Record<string, string> = {
  OWNER: 'Dueño',
  ADMIN: 'Admin',
  EMPLOYEE: 'Tambero',
}

function RolBadge({ rol }: { rol: string }) {
  return (
    <span
      className={cn(
        'text-xs px-2.5 py-1 rounded-full font-semibold',
        ROL_STYLES[rol] ?? ROL_STYLES.default
      )}
    >
      {ROL_LABELS[rol] ?? rol}
    </span>
  )
}

function EstadoBadge({ estado }: { estado: string }) {
  const isActivo = estado === 'aceptada'
  const isPendiente = estado === 'pendiente'
  return (
    <span className="flex items-center gap-1.5 text-sm">
      <span
        className={cn(
          'w-2 h-2 rounded-full',
          isActivo
            ? 'bg-[#22C55E]'
            : isPendiente
              ? 'bg-[#F59E0B]'
              : 'bg-[#D1D5DB]'
        )}
      />
      <span className="text-[#374151]">
        {isActivo ? 'Activo' : isPendiente ? 'Pendiente' : 'Inactivo'}
      </span>
    </span>
  )
}

export default function TeamTab() {
  const {
    invitations,
    isLoading,
    search,
    setSearch,
    isInviteModalOpen,
    openInviteModal,
    closeInviteModal,
    onSubmitInvite,
    isPending,
    deleteTarget,
    openDeleteModal,
    closeDeleteModal,
    register,
    handleSubmit,
    errors,
    setValue,
    watch,
  } = useTeam()

  return (
    <>
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#0B1001]">
            Gestión de Equipo
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Administra los accesos de tus colaboradores, asigna roles
            específicos y controla la seguridad de tu tambo.
          </p>
        </div>

        {/* Botón invitar */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={openInviteModal}
            className="flex items-center gap-2 text-sm font-medium text-white bg-[#29845A] px-4 py-2.5 rounded-lg hover:bg-[#29845A]/90 transition-colors"
          >
            <UserPlus size={16} />
            Invitar Colaborador
          </button>
        </div>

        {/* Buscador */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar"
              className="h-9 w-full pl-8 pr-3 rounded-lg border border-[#D1D5DB] text-sm outline-none bg-[#F9FAFB] focus:border-[#29845A]"
            />
          </div>
          <button className="h-9 w-9 flex items-center justify-center border border-[#D1D5DB] rounded-lg hover:bg-[#F3F4F6] transition-colors">
            <SlidersHorizontal size={14} className="text-[#6B7280]" />
          </button>
        </div>

        {/* Tabla */}
        <div className="border border-[#E5E7EB] rounded-xl overflow-hidden bg-white">
          <div className="grid grid-cols-[1.5fr_2fr_1fr_1fr_auto] bg-[#F9FAFB] px-4 py-3 border-b border-[#E5E7EB]">
            <p className="text-xs font-semibold text-[#374151]">Nombre</p>
            <p className="text-xs font-semibold text-[#374151]">Email</p>
            <p className="text-xs font-semibold text-[#374151]">Rol</p>
            <p className="text-xs font-semibold text-[#374151]">Estado</p>
            <p className="text-xs font-semibold text-[#374151]">Acciones</p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-5 h-5 border-2 border-[#29845A] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : invitations.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-sm text-[#6B7280]">
                No hay colaboradores registrados.
              </p>
            </div>
          ) : (
            invitations.map((inv: Invitacion) => (
              <div
                key={inv.id}
                className="grid grid-cols-[1.5fr_2fr_1fr_1fr_auto] px-4 py-3 border-b border-[#E5E7EB] last:border-0 items-center gap-2"
              >
                <p className="text-sm font-medium text-[#0B1001] truncate">
                  {inv.usuario?.nombre ?? '—'}
                </p>
                <p className="text-sm text-[#6B7280] truncate">{inv.correo}</p>
                <RolBadge rol={inv.rol?.rol ?? 'EMPLOYEE'} />
                <EstadoBadge estado={inv.estado} />
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="p-1.5 hover:bg-[#F3F4F6] rounded-lg transition-colors"
                  >
                    <Pencil size={14} className="text-[#6B7280]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => openDeleteModal(inv)}
                    className="p-1.5 hover:bg-[#FEF2F2] rounded-lg transition-colors"
                  >
                    <Trash2 size={14} className="text-[#EF4444]" />
                  </button>
                </div>
              </div>
            ))
          )}

          {invitations.length > 0 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-[#E5E7EB]">
              <p className="text-xs text-[#6B7280]">
                Mostrando {invitations.length} colaboradores
              </p>
              <div className="flex gap-1">
                <button className="w-7 h-7 flex items-center justify-center border border-[#D1D5DB] rounded-lg hover:bg-[#F3F4F6] transition-colors text-[#6B7280] text-xs">
                  ‹
                </button>
                <button className="w-7 h-7 flex items-center justify-center border border-[#D1D5DB] rounded-lg hover:bg-[#F3F4F6] transition-colors text-[#6B7280] text-xs">
                  ›
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modales */}
      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={closeInviteModal}
        onSubmit={onSubmitInvite}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        setValue={setValue}
        watch={watch}
        isPending={isPending}
      />
      <DeleteModal target={deleteTarget} onClose={closeDeleteModal} />
    </>
  )
}

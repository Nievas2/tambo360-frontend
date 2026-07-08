'use client'
import {
  Pencil,
  Trash2,
  Search,
  SlidersHorizontal,
  UserPlus,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTeam } from '@/hooks/team/useTeam'
import { Invitacion } from '@/types/invite'
import InviteModal from '@/components/shared/dashboard/organization/configuration/modals/InviteModal'
import DeleteModal from '@/components/shared/dashboard/organization/configuration/modals/DeleteModal'

// Badges de Rol con la paleta exacta de verdes de Figma
const ROL_STYLES: Record<string, string> = {
  OWNER: 'bg-[#A3E635]/20 text-[#3F6212] border border-[#A3E635]/30',
  ADMIN: 'bg-[#84CC16] text-white',
  EMPLOYEE: 'bg-[#217B53] text-white',
  default: 'bg-gray-100 text-gray-700',
}

const ROL_LABELS: Record<string, string> = {
  OWNER: 'DUEÑO',
  ADMIN: 'ADMIN',
  EMPLOYEE: 'TAMBERO',
}

function RolBadge({ rol }: { rol: string }) {
  return (
    <span
      className={cn(
        'text-[10px] px-3 py-0.5 rounded-md font-extrabold tracking-wide inline-block text-center min-w-[75px]',
        ROL_STYLES[rol] ?? ROL_STYLES.default
      )}
    >
      {ROL_LABELS[rol] ?? rol.toUpperCase()}
    </span>
  )
}

function EstadoBadge({ estado }: { estado: string }) {
  const isActivo = estado === 'aceptada' || estado === 'activo'
  const isPendiente = estado === 'pendiente'
  return (
    <span className="flex items-center gap-2 text-xs font-medium">
      <span
        className={cn(
          'w-2 h-2 rounded-full shrink-0',
          isActivo
            ? 'bg-[#217B53]'
            : isPendiente
              ? 'bg-[#94A3B8]'
              : 'bg-gray-300'
        )}
      />
      <span className="text-gray-700 font-semibold">
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
      <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-4 font-sans antialiased">
        {/* Encabezado Principal */}
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Gestión de Equipo
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl leading-relaxed">
            Administra los accesos de tus colaboradores, asigna roles
            específicos y controla la seguridad de tu tambo.
          </p>
        </div>

        {/* Fila del Botón Invitar (Justo arriba del contenedor de la tabla) */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={openInviteModal}
            className="flex items-center gap-2 text-xs font-bold text-white bg-[#217B53] hover:bg-[#195F40] px-4 h-9 rounded-lg transition-colors shadow-none"
          >
            <UserPlus size={14} />
            Invitar Colaborador
          </button>
        </div>

        {/* Contenedor Principal de la Tabla con Barra de Búsqueda Integrada */}
        <div className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          {/* Fila de Filtros y Búsqueda superior interna */}
          <div className="p-4 flex justify-end gap-2 border-b border-gray-50">
            <div className="relative w-64">
              <Search
                size={13}
                className="absolute left-3 inset-y-0 my-auto text-gray-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar"
                className="h-8 w-full pl-8 pr-3 rounded-md border border-gray-200 text-xs outline-none bg-white focus:border-[#217B53] transition-colors text-gray-700"
              />
            </div>
            <button className="h-8 w-8 flex items-center justify-center border border-gray-200 rounded-md bg-white hover:bg-gray-50 text-gray-400 transition-colors">
              <SlidersHorizontal size={13} />
            </button>
          </div>

          {/* Encabezados de la Tabla */}
          <div className="grid grid-cols-[1.5fr_2fr_1fr_1fr_0.5fr] bg-[#EDF1F3] px-6 py-2.5 border-b border-gray-100">
            <p className="text-[11px] font-bold text-gray-800">Nombre</p>
            <p className="text-[11px] font-bold text-gray-800">Email</p>
            <p className="text-[11px] font-bold text-gray-800">Rol</p>
            <p className="text-[11px] font-bold text-gray-800">Estado</p>
            <p className="text-[11px] font-bold text-gray-800 text-center">
              Acciones
            </p>
          </div>

          {/* Cuerpo de la Tabla */}
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-5 h-5 border-2 border-[#217B53] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : invitations.length === 0 ? (
            <div className="flex items-center justify-center py-16">
              <p className="text-xs font-medium text-gray-400">
                No hay colaboradores registrados.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {invitations.map((inv: Invitacion) => (
                <div
                  key={inv.id}
                  className="grid grid-cols-[1.5fr_2fr_1fr_1fr_0.5fr] px-6 py-3.5 items-center gap-2 hover:bg-gray-50/50 transition-colors"
                >
                  <p className="text-[13px] font-bold text-gray-900 truncate">
                    {inv.usuario?.nombre ?? '—'}
                  </p>
                  <p className="text-[13px] font-medium text-gray-500 truncate">
                    {inv.correo}
                  </p>
                  <div>
                    <RolBadge rol={inv.rol?.rol ?? 'EMPLOYEE'} />
                  </div>
                  <div>
                    <EstadoBadge estado={inv.estado} />
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-700 transition-colors p-1"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => openDeleteModal(inv)}
                      className="text-gray-400 hover:text-red-600 transition-colors p-1"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer / Paginado */}
          {invitations.length > 0 && (
            <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100 bg-white">
              <p className="text-xs font-semibold text-gray-400">
                Mostrando {invitations.length} de 12 colaboradores
              </p>
              <div className="flex gap-1">
                <button
                  type="button"
                  className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded bg-white hover:bg-gray-50 transition-colors text-gray-400"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  type="button"
                  className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded bg-white hover:bg-gray-50 transition-colors text-gray-400"
                >
                  <ChevronRight size={14} />
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

'use client'

import { InvitationCard } from '@/components/shared/dashboard/invitations/InvitationCard'
import { useInvitations } from '@/hooks/invitation/useInvitations'
import { Invitacion } from '@/types/invite'

const Invitations = () => {
  const { data, isLoading } = useInvitations()

  return (
    <main className="flex flex-col gap-12 w-full bg-tables p-8">
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-[#095B35]">Mis invitaciones</h2>
        <p>Gestiona tus accesos a nuevos establecimientos lecheros</p>
      </section>

      <section className="flex flex-col gap-8">
        <div>
          <h3 className="text-lg font-bold text-[#095B35]">Establecimientos</h3>
        </div>
        {data?.data.invitaciones_establecimiento.length === 0 ? (
          <div>No hay invitaciones</div>
        ) : isLoading ? (
          <div>Cargando invitaciones...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data.invitaciones_establecimiento.map(
              (invitation: Invitacion) => (
                <InvitationCard invitation={invitation} key={invitation.id} />
              )
            )}
          </div>
        )}
        {/* 
        <div>
          <h3 className="text-lg font-bold text-[#095B35]">Organizaciones</h3>
        </div>
        {data?.data.invitaciones_organizacion.length === 0 ? (
          <div>No hay invitaciones</div>
        ) : isLoading ? (
          <div>Cargando invitaciones...</div>
        ) : (
          data?.data.invitaciones_organizacion.map((invitation: Invitacion) => (
            <InvitationCard
              invitation={invitation}
              key={invitation.idInvitacion}
            />
          ))
        )} */}
      </section>
    </main>
  )
}
export default Invitations

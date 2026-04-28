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

      <section className="flex flex-col gap-4">
        {data?.data.length === 0 ? (
          <div>No hay invitaciones</div>
        ) : isLoading ? (
          <div>Cargando invitaciones...</div>
        ) : (
          data?.data.map((invitation: Invitacion) => (
            <InvitationCard
              invitation={invitation}
              key={invitation.idInvitacion}
            />
          ))
        )}
      </section>
    </main>
  )
}
export default Invitations

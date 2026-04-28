'use client'

import OrganizationCard from '@/components/shared/dashboard/organization/OrganizationCard'
import { useAuth } from '@/context/AuthContext'
import { useOrganizations } from '@/hooks/organization/useOrganizations'
import { OrganizacionUsuario } from '@/types/organization'

const Organizations = () => {
  const { data, isPending } = useOrganizations()
  const { user } = useAuth()

  return (
    <>
      <section className="mb-6">
        <h2 className="text-2xl font-bold text-[#095B35]">
          ¡Hola {user?.nombre}!
        </h2>
        <p className="text-gray-600">Seleccioná donde quieres trabajar hoy.</p>
        <p>Tenés 2 tambos activos bajo tu gestión</p>
      </section>
      <section className="flex flex-wrap gap-4">
        {isPending ? (
          <div>Cargando organizaciones...</div>
        ) : data?.data.length === 0 ? (
          <div>No hay organizaciones</div>
        ) : (
          data?.data.data.map((org: OrganizacionUsuario) => (
            <OrganizationCard organization={org} key={org.idOrganizacion} />
          ))
        )}
      </section>
    </>
  )
}
export default Organizations

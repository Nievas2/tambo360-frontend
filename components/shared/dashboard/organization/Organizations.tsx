'use client'

import OrganizationCard from '@/components/shared/dashboard/organization/OrganizationCard'
import { useAuth } from '@/context/AuthContext'
import { useOrganizations } from '@/hooks/organization/useOrganizations'
import { OrganizacionUsuario } from '@/types/organization'

const Organizations = () => {
  const { data, isPending } = useOrganizations()
  const { user } = useAuth()

  return (
    <div className="flex flex-col gap-8 p-8">
      <section className="flex flex-col gap-2 items-center w-full">
        <h2 className="text-2xl font-bold text-[#095B35]">
          ¡Hola {user?.nombre.split(' ', 1)}!
        </h2>
        <p className="text-gray-600">Seleccioná donde quieres trabajar hoy.</p>
        <p>
          Tenés {data?.data.data.length}{' '}
          {data?.data.data.length > 1 ? 'organizaciones' : 'organizacion'}
        </p>
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
    </div>
  )
}
export default Organizations

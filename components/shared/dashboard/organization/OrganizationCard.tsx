'use client'

import CreateEstablishment from '@/components/shared/dashboard/establishment/CreateEstablishment'
import { Button } from '@/components/ui/button'
import { OrganizacionUsuario } from '@/types/organization'
import { useState } from 'react'

interface OrganizationCardProps {
  organization: OrganizacionUsuario
}
const OrganizationCard = ({ organization }: OrganizationCardProps) => {
  const [showCreateEstablishment, setShowCreateEstablishment] = useState(false)
  return (
    <div className="flex flex-col p-4 bg-gray-100 rounded-md shadow-2xl w-64">
      {organization.organizacion?.nombre}

      {organization.establecimientoOrganiacionUsuarios &&
        organization.establecimientoOrganiacionUsuarios.length > 0 &&
        organization.establecimientoOrganiacionUsuarios.map((estOrg) => (
          <div
            key={estOrg.idEstablecimiento}
            className="mt-2 p-2 bg-white rounded-md shadow"
          >
            {estOrg.establecimiento?.nombre}
          </div>
        ))}
      <Button
        variant="outline"
        size="sm"
        className=" w-full"
        onClick={() => setShowCreateEstablishment(true)}
      >
        {/* <Link
          href={`/organizaciones/${organization.idOrganizacion}/establecimientos`}
        >
          Ingresar
        </Link> */}
        test
      </Button>

      <CreateEstablishment
        open={showCreateEstablishment}
        onClose={() => setShowCreateEstablishment(false)}
        organizationId={organization.idOrganizacion}
      />
    </div>
  )
}
export default OrganizationCard

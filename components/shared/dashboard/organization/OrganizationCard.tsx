'use client'

import CreateEstablishment from '@/components/shared/dashboard/establishment/CreateEstablishment'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card'
import { OrganizacionUsuario } from '@/types/organization'
import Link from 'next/link'
import { useState } from 'react'

interface OrganizationCardProps {
  organization: OrganizacionUsuario
}
const OrganizationCard = ({ organization }: OrganizationCardProps) => {
  const [showCreateEstablishment, setShowCreateEstablishment] = useState(false)
  return (
    <div className="flex flex-col p-8 w-full">
      {organization.organizacion?.nombre}

      <div className="flex flex-wrap gap-4">
        {organization.establecimientoOrganizacionUsuarios &&
          organization.establecimientoOrganizacionUsuarios.length > 0 &&
          organization.establecimientoOrganizacionUsuarios.map((estOrg) => (
            <Card
              key={estOrg.idEstablecimiento}
              className="size-52 bg-white rounded-md shadow"
            >
              <CardContent className="justify-between h-full">
                <CardTitle>{estOrg.establecimiento?.nombre}</CardTitle>
                <CardDescription>{estOrg.rol}</CardDescription>
                <CardFooter className="px-0">
                  <Button variant="landing">
                    <Link
                      href={`/organizaciones/${organization.idOrganizacion}/${estOrg.idEstablecimiento}/produccion`}
                    >
                      Ingresar
                    </Link>
                  </Button>

                  <Button variant="darkGreen">
                    <Link
                      href={`/organizaciones/${organization.idOrganizacion}/${estOrg.idEstablecimiento}/invitar`}
                    >
                      Invitar
                    </Link>
                  </Button>
                </CardFooter>
              </CardContent>
            </Card>
          ))}
        <div className="size-52 bg-white rounded-md shadow flex flex-col items-center justify-center gap-2">
          <span>Nuevo establecimiento</span>

          <Button
            variant="outline"
            onClick={() => setShowCreateEstablishment(true)}
          >
            Crear
          </Button>
        </div>
      </div>

      <CreateEstablishment
        open={showCreateEstablishment}
        onClose={() => setShowCreateEstablishment(false)}
        organizationId={organization.idOrganizacion}
      />
    </div>
  )
}
export default OrganizationCard

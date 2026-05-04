'use client'

import CreateEstablishment from '@/components/shared/dashboard/establishment/CreateEstablishment'
import { Badge } from '@/components/ui/badge'
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
    <div className="flex flex-col gap-2 w-full">
      <h2 className="font-bold text-2xl">
        {organization.organizacion?.nombre}
      </h2>

      <div className="flex flex-wrap gap-4">
        {organization.establecimientoOrganizacionUsuarios &&
          organization.establecimientoOrganizacionUsuarios.length > 0 &&
          organization.establecimientoOrganizacionUsuarios.map((estOrg) => (
            <Card
              key={estOrg.idEstablecimiento}
              className="h-52 w-64 bg-white rounded-md shadow"
            >
              <CardContent className="flex flex-col gap-5 justify-between h-full">
                <CardTitle>{estOrg.establecimiento?.nombre}</CardTitle>
                <CardDescription className="h-full">
                  <Badge variant="role">
                    {estOrg.rol == 'ADMIN'
                      ? 'Administrador'
                      : estOrg.rol == 'OWNER'
                        ? 'Propietario'
                        : 'Empleado'}
                  </Badge>
                </CardDescription>
                <CardFooter className="flex justify-between w-full px-0 pt-0">
                  <Button variant="landing" asChild>
                    <Link
                      href={`/organizaciones/${organization.idOrganizacion}/${estOrg.idEstablecimiento}/produccion`}
                    >
                      Ingresar
                    </Link>
                  </Button>

                  <Button variant="darkGreen" asChild>
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
        <div className="h-52 w-64 bg-white rounded-md shadow flex flex-col items-center justify-center gap-2">
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

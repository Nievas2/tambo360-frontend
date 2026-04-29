'use client'

import { api } from '@/services/api'
import { useEffect } from 'react'

interface HeaderIdsProps {
  establishmentId: string
  organizationId: string
  children: React.ReactNode
}
const HeaderIds = ({
  establishmentId,
  organizationId,
  children,
}: HeaderIdsProps) => {
  useEffect(() => {
    if (establishmentId) {
      api.defaults.headers.common['x-establecimiento-id'] = establishmentId
    }
    if (organizationId) {
      api.defaults.headers.common['x-organizacion-id'] = organizationId
    }
  }, [establishmentId, organizationId])
  return <>{children}</>
}
export default HeaderIds

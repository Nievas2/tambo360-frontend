import HeaderIds from '@/components/layout/HeaderIds'

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ id: string; orgId: string }>
}) => {
  const { id, orgId } = await params

  return (
    <HeaderIds establishmentId={id} organizationId={orgId}>
      {children}
    </HeaderIds>
  )
}

export default layout

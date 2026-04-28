import Layout from '@/components/layout/Layout'

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ id: string; orgId: string }>
}) => {
  const { id, orgId } = await params

  return (
    <Layout establishmentId={id} organizationId={orgId}>
      {children}
    </Layout>
  )
}

export default layout

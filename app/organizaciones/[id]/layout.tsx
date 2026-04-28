import Layout from '@/components/layout/Layout'

const layout = ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) => {
  return <Layout establishmentId={params.id}>{children}</Layout>
}

export default layout

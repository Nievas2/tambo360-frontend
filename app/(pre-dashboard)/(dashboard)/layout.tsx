import Layout from '@/components/layout/Layout'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <Layout>{children}</Layout>
}
export default layout

import { AppSidebar } from '@/components/layout/AppSidebar'
import Layout from '@/components/layout/Layout'
import ProtectedLayout from '@/components/layout/ProtectedLayout'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <ProtectedLayout>
      <Layout>{children}</Layout>
    </ProtectedLayout>
  )
}
export default layout

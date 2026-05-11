import Layout from '@/components/layout/Layout'

const layout = async ({ children }: { children: React.ReactNode }) => {
  return <Layout>{children}</Layout>
}

export default layout

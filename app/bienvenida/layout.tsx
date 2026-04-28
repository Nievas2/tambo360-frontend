import ProtectedLayout from '@/components/layout/ProtectedLayout'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <ProtectedLayout>{children}</ProtectedLayout>
}
export default layout

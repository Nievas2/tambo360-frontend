import PublicLayout from '@/components/layout/PublicLayout'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <PublicLayout>{children}</PublicLayout>
}
export default layout

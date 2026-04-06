import Navbar from '@/components/shared/landing/Navbar'
import Footer from '@/components/shared/landing/Footer'
const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <main className="flex flex-col w-full">
      <Navbar />
      {children}
      <Footer />
    </main>
  )
}
export default layout

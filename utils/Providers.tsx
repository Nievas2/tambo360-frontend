'use client'
import { QueryProvider } from '@/utils/QueryProvider'
import { AuthProvider } from '@/context/AuthContext'
import { SidebarProvider } from '@/components/ui/sidebar'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <SidebarProvider>
        <AuthProvider>{children}</AuthProvider>
      </SidebarProvider>
    </QueryProvider>
  )
}
export default Providers

'use client'
import { QueryProvider } from '@/utils/QueryProvider'
import { AuthProvider } from '@/context/AuthContext'
import { SidebarProvider } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from 'sonner'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <SidebarProvider>
        <AuthProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </AuthProvider>
        <Toaster />
      </SidebarProvider>
    </QueryProvider>
  )
}
export default Providers

import SendInvite from '@/components/shared/dashboard/invitations/SendInvite'
import { OrganizationNavbar } from '@/components/shared/dashboard/organization/OrganizationNavbar'

const Page = () => {
  return (
    <div className="min-h-screen w-full p-4">
      <OrganizationNavbar />
      <SendInvite />
    </div>
  )
}

export default Page

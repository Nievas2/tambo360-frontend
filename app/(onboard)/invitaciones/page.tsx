import Invitations from '@/components/shared/dashboard/invitations/Invitations'
import { OrganizationNavbar } from '@/components/shared/dashboard/organization/OrganizationNavbar'

const Page = () => {
  return (
    <main className="flex flex-col w-full bg-tables">
      <OrganizationNavbar />
      <Invitations />
    </main>
  )
}
export default Page

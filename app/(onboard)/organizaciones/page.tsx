import { OrganizationNavbar } from '@/components/shared/dashboard/organization/OrganizationNavbar'
import Organizations from '@/components/shared/dashboard/organization/Organizations'

const Page = () => {
  return (
    <main className="flex flex-col w-full bg-tables">
      <OrganizationNavbar />
      <Organizations />
    </main>
  )
}
export default Page

import OnboardingFlow from '@/components/shared/dashboard/onboarding/OnboardingFlow'

const Page = () => {
  return (
    <div
      className="min-h-screen w-full flex flex-col md:flex-row bg-[#F2F1EC] relative font-inter bg-[url('/vacas_4.webp')] bg-cover bg-center bg-no-repeat"
      data-testid="verify-user-page"
    >
      <OnboardingFlow />
    </div>
  )
}
export default Page

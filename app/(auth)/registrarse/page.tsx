import RegisterForm from '@/components/shared/register/RegisterForm'
import { Card } from '@/components/ui/card'

const Register: React.FC = () => {
  return (
    <div
      className="min-h-screen w-full flex flex-col md:flex-row bg-[#F2F1EC] relative font-inter bg-[url('/vacas_2.webp')] bg-cover bg-center bg-no-repeat transition-all duration-700"
      data-testid="register-page-container"
    >
      <div className="absolute inset-0 bg-black/10 z-0" />
      <div className="hidden md:flex md:w-1/3 xl:w-1/2" />
      <div className="w-full md:w-2/3 xl:w-1/2 flex items-center justify-center md:justify-end p-4 md:p-8 z-10">
        <Card className="w-full max-w-125 border-none shadow-2xl py-8 bg-white/95 backdrop-blur-md rounded-xl relative">
          <RegisterForm />
        </Card>
      </div>
    </div>
  )
}

export default Register

import ProblemSolution from '@/components/shared/landing/ProblemSolution'
import Testimonials from '@/components/shared/landing/Testimonials'
import ContactForm from '@/components/shared/landing/ContactForm'
import Features from '@/components/shared/landing/Features'
import Pricing from '@/components/shared/landing/Pricing'
import Hero from '@/components/shared/landing/Hero'

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <Hero />
      <ProblemSolution />
      <Features />
      <Pricing />
      <Testimonials />
      <ContactForm />
    </div>
  )
}

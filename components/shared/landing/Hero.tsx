'use client'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="pt-28 pb-20 px-6 bg-[url('/landing/hero.webp')] bg-center bg-cover bg-no-repeat flex items-center min-h-[85vh]">
      <div className="max-w-6xl flex md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl flex flex-col items-center"
        >
          <h1 className="text-[40px] font-extrabold text-white leading-tight mb-5 text-center md:text-start text-shadow-lg">
            Tu tambo bajo control, en tiempo real
          </h1>

          <p className="text-white text-lg leading-relaxed mb-8 text-center md:text-start">
            Deja de gestionar a ciegas: producción, mermas y costos en un solo
            sistema pensado para el campo.
          </p>

          <div className="flex gap-4 justify-center md:justify-start w-full">
            <Button variant="landing" className="h-12 w-44">
              Ver Demo
            </Button>

            <Button variant="landingSecondary" className="h-12 w-44" asChild>
              <Link href="/iniciar-sesion">Probar ahora</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

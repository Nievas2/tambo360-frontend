'use client'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="pt-28 pb-20 px-6 bg-[url('/vacas_1.webp')] bg-center bg-cover bg-no-repeat flex items-center justify-center">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl flex flex-col items-center justify-center"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-red-main bg-dialogs px-3 py-1 rounded-full mb-6">
            SaaS B2B Lácteo
          </span>

          <h1 className="text-4xl md:text-5xl text-center font-extrabold text-white leading-tight mb-5">
            Simplicidad operativa <span className="">desde el tambo.</span>
          </h1>

          <p className="text-white text-lg leading-relaxed mb-8 max-w-xl text-center">
            Digitaliza el registro de producción, controla mermas y visualiza
            los costos reales de tu tambo. Todo en una plataforma simple,
            pensada para el campo.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button variant="default" className="h-12 w-32" asChild>
              <Link href="/iniciar-sesion">Ver Demo</Link>
            </Button>

            <Button variant="outline" className="h-12 w-32" asChild>
              <Link href="/producto">Conocer más</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

'use client'
import CountUp from '@/utils/CountUp'
import { Percent, Plus } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { useRef, useEffect, useState } from 'react'

const testimonials = [
  {
    quote:
      'Antes no sabíamos cuánto perdíamos por mermas. Ahora lo vemos en tiempo real y podemos actuar.',
    author: 'Carlos M.',
    role: 'Productor, Santa Fe',
  },
  {
    quote:
      'La carga diaria no lleva más de un minuto. Es lo más simple que probamos para gestionar el tambo.',
    author: 'María L.',
    role: 'Encargada de tambo, Córdoba',
  },
  {
    quote:
      'Los indicadores económicos nos ayudaron a tomar mejores decisiones de inversión en el tambo.',
    author: 'Jorge R.',
    role: 'Dueño de tambo, Buenos Aires',
  },
]

const Testimonials = () => {
  return (
    <section className="py-20 px-6 bg-tables/30">
      <div className="max-w-6xl mx-auto">
        {/* Counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap justify-center gap-16 mb-16"
        >
          <div className="text-center">
            <div className="flex items-center justify-center">
              <CountUp
                from={0}
                to={50}
                separator=","
                direction="up"
                duration={1}
                className="text-4xl font-bold text-[#669213]"
              />
              <Plus size={24} />
            </div>
            <p className="text-sm text-foreground mt-1">Tambos interesados</p>
          </div>
          <div className="text-center">
            <CountUp
              from={0}
              to={3}
              separator=","
              direction="up"
              duration={1}
              className="text-4xl font-bold text-[#669213]"
            />
            <p className="text-sm text-foreground mt-1">
              Provincias alcanzadas
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center">
              <CountUp
                from={0}
                to={100}
                separator=","
                direction="up"
                duration={1}
                className="text-4xl font-bold text-[#669213]"
              />
              <Percent size={24} />
            </div>
            <p className="text-sm text-foreground mt-1">
              Satisfacción en pruebas
            </p>
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="bg-background border border-muted rounded-lg p-6"
            >
              <p className="text-sm text-foreground leading-relaxed mb-4 italic">
                "{t.quote}"
              </p>
              <footer>
                <p className="text-sm font-semibold">{t.author}</p>
                <p className="text-xs text-foreground">{t.role}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials

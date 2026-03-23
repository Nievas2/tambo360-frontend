'use client'
import Robot from '@/components/shared/Robot'
import { Droplet, Factory, TrendingDown } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

const features = [
  {
    icon: <Droplet />,
    title: 'Registro de producción',
    description:
      'Carga diaria de litros por lote en segundos. Datos accesibles desde el celular, sin planillas ni papeles.',
  },
  {
    icon: <Factory />,
    title: 'Control de mermas',
    description:
      'Identifica y clasifica pérdidas productivas. Visualiza tendencias y detecta desvíos antes de que impacten.',
  },
  {
    icon: <TrendingDown />,
    title: 'Indicadores económicos',
    description:
      'Costo por litro, rentabilidad por lote, evolución mensual. Métricas claras para decisiones informadas.',
  },
  {
    icon: <Robot size={22} className="text-black" />,
    title: 'Alertas con IA',
    description:
      'El asistente inteligente monitorea tus datos y te avisa cuando algo se desvía de los parámetros normales.',
  },
]

const Features = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 px-6 bg-tables/30">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-3">
            Funcionalidades principales
          </h2>
          <p className="text-body-text">
            Herramientas diseñadas para simplificar la operación diaria del
            tambo.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="bg-background border border-accent rounded-lg p-7"
            >
              <h3 className="flex items-center gap-2 text-lg font-bold mb-2">
                {feature.icon}
                {feature.title}
              </h3>
              <p className="text-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

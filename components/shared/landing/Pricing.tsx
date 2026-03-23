'use client'
import { Check } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useRef } from 'react'

const plans = [
  {
    name: 'Gratuito',
    price: '$0',
    period: '/mes',
    description: 'Para comenzar a digitalizar tu tambo.',
    features: [
      'Registro de producción básico',
      'Hasta 2 lotes',
      'Dashboard simplificado',
      'Soporte por email',
    ],
    cta: 'Comenzar gratis',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$15',
    period: 'USD/mes',
    description: 'Control total con inteligencia artificial.',
    features: [
      'Lotes ilimitados',
      'Control de mermas avanzado',
      'Indicadores económicos completos',
      'Alertas automáticas con IA',
      'Reportes exportables',
      'Soporte prioritario',
    ],
    cta: 'Solicitar Demo',
    highlighted: true,
  },
]

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-3">Planes accesibles</h2>
          <p className="text-foreground">
            Pensados para tambos de cualquier escala.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-around gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className={`rounded-lg p-8 px-14 border-2 ${
                plan.highlighted
                  ? 'border-secondary bg-dialogs/30'
                  : 'border-muted bg-background'
              } h-100 flex-col`}
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-foreground text-sm">{plan.description}</p>
                  <div className="">
                    <span className="text-3xl font-extrabold">
                      {plan.price}
                    </span>
                    <span className="text-foreground text-sm ml-1">
                      {plan.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="text-sm text-black flex items-start gap-2"
                      >
                        <Check className="text-green-main w-4" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="/contacto"
                  className={`block text-center font-semibold py-2.5 rounded-md transition-opacity hover:opacity-90 ${
                    plan.highlighted
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing

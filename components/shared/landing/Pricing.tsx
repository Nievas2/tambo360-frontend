'use client'
import { Check } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'

const plans = [
  {
    name: 'Gratis Core',
    features: [
      'Registro de 1 Establecimiento',
      '1 Usuario Administrador',
      'Reportes Ejecutivos Base',
      'Acceso Web Ilimitado',
    ],
    cta: 'Empezar Ahora',
    href: '/contacto',
    highlighted: false,
  },
  {
    name: 'Pase 3 Meses',
    features: [
      'Multi-lote ilimitado',
      'Modo Offline Completo',
      'Alertas de Mermas Inteligentes',
      'Exportación PDF / Excel',
    ],
    cta: 'Prueba 90 Días $0',
    href: '/contacto',
    highlighted: true,
  },
  {
    name: 'Plan Profesional',
    features: [
      'Todo lo anterior',
      'Asistente IA de Anomalías',
      'Soporte VIP Prioritario',
      'Dashboard Financiero / ROI',
    ],
    cta: 'Solicitar Presupuesto',
    href: '/contacto',
    highlighted: false,
  },
]

const Pricing = () => {
  const [annual, setAnnual] = useState(true)

  return (
    <section id="pricing" className="py-20 px-6 bg-[#f0f4ef]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#3a7d1e] mb-3">
            Comienza tu plan gratuito hoy
          </h2>
          <p className="text-gray-600 text-lg">
            Actualiza cuando estés listo. Es gratis.{' '}
            <span className="text-[#3a7d1e] font-bold">Es Gratis.</span>
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className={`rounded-2xl p-8 flex flex-col justify-between gap-8 ${
                plan.highlighted
                  ? 'border-2 border-[#3a7d1e] bg-white'
                  : 'border border-gray-200 bg-white'
              }`}
            >
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {plan.name}
                </h3>
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 text-gray-700 text-sm"
                    >
                      <Check className="text-[#3a7d1e] w-4 h-4 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={plan.href}
                className={`block text-center text-sm font-bold tracking-widest uppercase py-3 px-4 rounded-lg transition-opacity hover:opacity-90 ${
                  plan.highlighted
                    ? 'bg-[#3a7d1e] text-white'
                    : 'border-2 border-[#3a7d1e] text-[#3a7d1e] bg-white'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing

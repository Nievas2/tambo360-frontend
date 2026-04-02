'use client'
import Robot from '@/components/shared/Robot'
import { Droplet, Factory, TrendingDown } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

import {
  SmartphoneIcon,
  BellIcon,
  TrendingUpIcon,
  BotIcon,
  MonitorSmartphoneIcon,
  CloudIcon,
  WifiOffIcon,
} from 'lucide-react'

const techBadges = [
  { icon: MonitorSmartphoneIcon, label: 'Web y móvil' },
  { icon: CloudIcon, label: 'Arquitectura en nube' },
  { icon: WifiOffIcon, label: 'Modo offline' },
]

const features = [
  {
    icon: SmartphoneIcon,
    title: 'Registro de producción',
    description:
      'Carga diaria de litros por lote en segundos desde el celular, sin planillas ni papeles.',
  },
  {
    icon: BellIcon,
    title: 'Control de mermas',
    description:
      'Identifica pérdidas y visualiza tendencias antes de que impacten en la rentabilidad.',
  },
  {
    icon: TrendingUpIcon,
    title: 'Indicadores económicos',
    description:
      'Costo por litro y rentabilidad por lote en tiempo real para decisiones informadas.',
  },
  {
    icon: BotIcon,
    title: 'Alertas con IA',
    description:
      'El asistente inteligente monitorea tus datos y te avisa ante cualquier desvío normal.',
  },
]

const Features = () => {
  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-[#3a7d1e] uppercase tracking-wide mb-4">
            Tu tambo digitalizado y bajo control
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Moderniza la gestión de tu tambo a través de datos precisos y
            alertas inteligentes para una operativa más eficiente.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="text-[#3a7d1e]">
                  <Icon size={36} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-gray-900 text-base">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mt-16" />

      {/* Tech Badges */}
      <div className="max-w-3xl mx-auto pt-14 pb-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16">
          {techBadges.map((badge, index) => {
            const Icon = badge.icon
            return (
              <div key={index} className="flex items-center gap-3">
                <div className="text-[#3a7d1e]">
                  <Icon size={40} strokeWidth={1.5} />
                </div>
                <span className="text-gray-800 font-semibold text-lg">
                  {badge.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features

'use client'
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
  { icon: MonitorSmartphoneIcon, label: 'Web y Móvil' },
  { icon: CloudIcon, label: 'Arquitectura en la nube' },
  { icon: WifiOffIcon, label: 'Modo Offline' },
]

const features = [
  {
    icon: SmartphoneIcon,
    title: 'Control de Producción Lechera',
    description:
      'Carga diaria de litros por lote en segundos desde el celular, sin planillas ni papeles. Tu Dashboard de gestión agropecuaria en la palma de la mano.',
  },
  {
    icon: BellIcon,
    title: 'Eficiencia Productiva y Mermas',
    description:
      'Identifica pérdidas ocultas y mejora la rentabilidad de tu establecimiento tomando decisiones a tiempo, antes de que impacten en tu bolsillo.',
  },
  {
    icon: TrendingUpIcon,
    title: 'Costos Reales e Indicadores',
    description:
      'Visualiza indicadores de producción y márgenes precisos en tiempo real para decisiones de negocio informadas.',
  },
  {
    icon: BotIcon,
    title: 'Alertas con Inteligencia Artificial',
    description:
      'El asistente inteligente supervisa tu producción y te envía alertas inmediatas ante cualquier desvío.',
  },
]

const Features = () => {
  return (
    <div>
      {/* Main section */}
      <section className="w-full relative overflow-hidden bg-[#e8eaed] py-16 px-8">
        {/* Wave SVG background */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 600"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {[0, 40, 80, 120, 160, 200].map((offset, i) => (
            <path
              key={i}
              d={`M0,${280 + offset} C360,${180 + offset} 720,${380 + offset} 1080,${260 + offset} C1260,${200 + offset} 1380,${290 + offset} 1440,${270 + offset}`}
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1"
              opacity={0.35 - i * 0.04}
            />
          ))}
        </svg>

        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[480px]">
          {/* Left: Text */}
          <div className="flex flex-col gap-5">
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Tu tambo digitalizado y<br />
              bajo control
            </h2>
            <p className="text-gray-500 text-base leading-relaxed max-w-xs">
              Moderniza la gestión de tu tambo a través de datos precisos y
              alertas inteligentes para una operativa más eficiente.
            </p>
          </div>

          {/* Right: 2x2 Feature Cards */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Icon
                      size={18}
                      strokeWidth={1.8}
                      className="text-blue-400"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tech Badges */}
      <div className="w-full bg-[#1c2a1c] py-10 px-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-around gap-8">
          {techBadges.map((badge, index) => {
            const Icon = badge.icon
            return (
              <div key={index} className="flex items-center gap-4">
                <Icon size={32} strokeWidth={1.5} className="text-white" />
                <span className="text-white font-semibold text-xl">
                  {badge.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Features

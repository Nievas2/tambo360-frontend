'use client'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

type Period = 'Mensual' | 'Semestral' | 'Anual'

const PERIODS: Period[] = ['Mensual', 'Semestral', 'Anual']

const plans = [
  {
    name: 'Trial',
    /*  prices: { Mensual: '$0', Semestral: '$0', Anual: '$0' }, */
    currency: 'ARS',
    features: [
      'Registro de 1 Establecimiento',
      '1 Usuario',
      '3–5 alertas /mes',
    ],
    cta: 'Empezar Ahora',
    href: '/contacto',
    highlighted: false,
    badge: null,
  },
  {
    name: 'Individual' /* 
    prices: { Mensual: '$15.000', Semestral: '$75.000', Anual: '$130.000' }, */,
    currency: 'ARS',
    features: ['Registro de 1 Establecimiento', '1 Usuario', '50 alertas /mes'],
    cta: 'Empezar Ahora',
    href: '/contacto',
    highlighted: false,
    badge: null,
  },
  {
    name: 'Equipo' /* 
    prices: { Mensual: '$45.000', Semestral: '$230.000', Anual: '$390.000' }, */,
    currency: 'ARS',
    features: [
      'Registro de 1 Establecimiento',
      'Dueño + 5 usuarios',
      '100 alertas /mes',
    ],
    cta: 'Prueba 90 días a $0 USD',
    href: '/contacto',
    highlighted: true,
    badge: 'Recomendado',
  },
  {
    name: 'Multi' /* 
    prices: { Mensual: '$85.000', Semestral: '$430.000', Anual: '$720.000' }, */,
    currency: 'ARS',
    features: [
      'Registro de 5 establecimientos',
      '20 usuarios',
      '300 alertas /mes',
    ],
    cta: 'Empezar ahora',
    href: '/contacto',
    highlighted: false,
    badge: null,
  },
]

type Plan = (typeof plans)[number]

// ─── Card ────────────────────────────────────────────────────────────────────

const PricingCard = ({
  plan,
  period,
  delay,
}: {
  plan: Plan
  period: Period
  delay: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay }}
    viewport={{ once: true }}
    className={`relative rounded-2xl p-6 flex flex-col gap-6 h-full transition-transform hover:-translate-y-1 ${
      plan.highlighted
        ? 'bg-linear-to-br from-[#d8f0c6] to-[#c2e8a8] border-2 border-[#80B718]'
        : 'bg-white border border-[#e0e8dc]'
    }`}
  >
    {plan.badge && (
      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#80B718] text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1 rounded-full whitespace-nowrap">
        {plan.badge}
      </span>
    )}

    <div>
      <p className="text-sm font-bold text-gray-800" /*  mb-3 */>{plan.name}</p>
      {/* <AnimatePresence mode="wait">
        <motion.div
          key={period}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.18 }}
          className="text-3xl font-black text-gray-900 leading-none"
        >
          {plan.prices[period]}{' '}
          <span className="text-sm font-medium text-gray-500">
            {plan.currency}
          </span>
        </motion.div>
      </AnimatePresence> */}
    </div>

    <ul className="flex flex-col gap-3 flex-1 mb-40">
      {plan.features.map((f) => (
        <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
          <span
            className={`mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center`}
          >
            <Check className="w-2.5 h-2.5 text-[#80B718]" strokeWidth={3} />
          </span>
          {f}
        </li>
      ))}
    </ul>

    <Link
      href={plan.href}
      className={`block text-center text-xs font-bold tracking-widest uppercase py-3 px-4 rounded-xl transition-all hover:opacity-90 active:scale-95 ${
        plan.highlighted
          ? 'bg-[#80B718] text-white'
          : 'border-2 border-[#80B718] text-[#80B718] bg-white hover:bg-[#80B718] hover:text-white'
      }`}
    >
      {plan.cta}
    </Link>
  </motion.div>
)

const Pricing = () => {
  const [period, setPeriod] = useState<Period>('Mensual')
  const [activeIndex, setActiveIndex] = useState(2)
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section id="pricing" className="py-16 px-6 lg:px-12 bg-[#F7FFE6]">
      <div className="mx-auto">
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-wide text-center mb-10">
          Gestiona tu plan
        </h2>

        <div className="flex justify-center mb-10">
          <div className="flex items-center bg-white border border-[#d4e4cf] rounded-full p-1 gap-1 shadow-sm">
            {PERIODS.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  period === p
                    ? 'bg-[#80B718] text-white shadow'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-4 items-stretch">
          {plans.map((plan, i) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              period={period}
              delay={i * 0.08}
            />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="lg:hidden">
          <div className="overflow-hidden">
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-5 px-6 -mx-6"
              style={{ scrollbarWidth: 'none' }}
            >
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className="snap-center shrink-0 w-[85vw] max-w-[320px]"
                >
                  <PricingCard plan={plan} period={period} delay={0} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing

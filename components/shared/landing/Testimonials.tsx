'use client'
import { motion } from 'motion/react'
import { useState } from 'react'

const testimonials = [
  {
    quote:
      'La app offline es el diferencial clave para el registro directo en el lote sin internet. No más papeles perdidos.',
    author: 'Elena G.',
    avatar: 'https://i.pravatar.cc/150?img=47',
  },
  {
    quote:
      'Los reportes automáticos me ahorran horas de trabajo administrativo cada semana. Excelente herramienta.',
    author: 'Pablo S.',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    quote:
      'La IA me avisó de un desvío en el lote 4 antes de que se convirtiera en una pérdida real. Imprescindible.',
    author: 'Sofía R.',
    avatar: 'https://i.pravatar.cc/150?img=29',
  },
  {
    quote:
      'Antes no sabíamos cuánto perdíamos por mermas. Ahora lo vemos en tiempo real y podemos actuar.',
    author: 'Carlos M.',
    avatar: 'https://i.pravatar.cc/150?img=53',
  },
]

const CARDS_PER_PAGE = 3

const Testimonials = () => {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(testimonials.length / CARDS_PER_PAGE)
  const visible = testimonials.slice(
    page * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE + CARDS_PER_PAGE
  )

  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-[#3a7d1e] uppercase tracking-wide mb-4">
            Testimonios
          </h2>
          <p className="text-gray-600 text-lg">
            Más de 50 tambos transformando sus datos en rentabilidad.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {visible.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="border border-gray-200 rounded-2xl p-6 flex flex-col justify-between gap-6"
            >
              <p className="text-gray-500 text-sm leading-relaxed italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-[#3a7d1e] font-semibold text-sm">
                  {t.author}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`rounded-full transition-all duration-200 ${
                i === page
                  ? 'w-8 h-3 bg-[#3a7d1e]'
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials

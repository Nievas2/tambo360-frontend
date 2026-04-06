'use client'
import { BadgeCheck, ShieldAlert } from 'lucide-react'
import { motion } from 'motion/react'

const problems = [
  {
    title: 'Registros en papel:',
    description:
      'Planillas dispersas sin trazabilidad que se pierden o se vuelven ilegibles por el trabajo diario.',
  },
  {
    title: 'Mermas invisibles:',
    description:
      'Pérdidas productivas que no se cuantifican ni se detectan a tiempo para corregirlas de inmediato.',
  },
  {
    title: 'Ceguera de datos:',
    description:
      'Falta de indicadores económicos claros para tomar decisiones críticas de inversión y reinversión.',
  },
  {
    title: 'Erosión de rentabilidad:',
    description:
      'Pérdidas económicas silenciosas que afectan directamente el margen de su establecimiento.',
  },
]

const ProblemSolution = () => {
  return (
    <section className="w-full bg-[#f5f0e8] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-[#7a3b00] uppercase tracking-wide mb-3">
            El Problema
          </h2>
          <div className="w-16 h-1 bg-[#7a3b00] mx-auto mb-6 rounded-full" />
          <p className="text-[#7a3b00] font-semibold text-lg">
            Entendemos el desgaste de una gestión analógica y fragmentada.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 mb-14">
          {problems.map((problem, index) => (
            <div key={index} className="flex items-start gap-4">
              {/* Warning Icon */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e69b00] flex items-center justify-center mt-0.5">
                <span className="text-white font-bold text-sm">!</span>
              </div>
              <p className="text-gray-800 text-base leading-relaxed">
                <span className="font-bold">{problem.title}</span>{' '}
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-[#3a7d1e] font-semibold italic text-lg">
            Por eso creamos{' '}
            <span className="font-extrabold not-italic">Tambo360:</span> para
            devolverle el control total de su operación.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ProblemSolution

'use client'
import { BadgeCheck, ShieldAlert } from 'lucide-react'
import { motion } from 'motion/react'

const ProblemSolution = () => {
  return (
    <section id="producto" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-3">¿Por qué Tambo360?</h2>
          <p className="text-foreground max-w-xl">
            La gestión analógica del tambo genera pérdidas invisibles. Tambo360
            las hace visibles y controlables.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Problema */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-alert-bg rounded-lg p-8 shadow-md"
          >
            <span className="text-xs flex items-center gap-2 font-semibold uppercase tracking-widest text-primary mb-4 ">
              <ShieldAlert className="text-red-main" /> El problema
            </span>
            <h3 className="text-xl font-bold mb-4">
              Gestión analógica y fragmentada
            </h3>
            <ul className="space-y-3 text-foreground text-sm leading-relaxed">
              <li>
                Registros en papel o planillas dispersas sin trazabilidad.
              </li>
              <li>
                Mermas productivas que no se cuantifican ni se detectan a
                tiempo.
              </li>
              <li>
                Falta de indicadores económicos claros para la toma de
                decisiones.
              </li>
              <li>
                Pérdidas económicas silenciosas que erosionan la rentabilidad
                del tambo.
              </li>
            </ul>
          </motion.div>

          {/* Solución */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-dialogs rounded-lg p-8 shadow-md"
          >
            <span className="text-xs flex items-center gap-2 font-semibold uppercase tracking-widest text-black mb-4 ">
              <BadgeCheck className="text-green-main" /> La solución
            </span>
            <h3 className="text-xl font-bold mb-4">
              Datos centralizados con asistencia IA
            </h3>
            <ul className="space-y-3 text-foreground text-sm leading-relaxed">
              <li>
                Registro digital rápido de producción por lote desde cualquier
                dispositivo.
              </li>
              <li>
                Control automatizado de mermas con alertas inteligentes ante
                desvíos.
              </li>
              <li>
                Dashboard con indicadores económicos y productivos en tiempo
                real.
              </li>
              <li>
                Asistente IA que analiza patrones y sugiere acciones
                preventivas.
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ProblemSolution

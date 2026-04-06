'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { motion } from 'motion/react'

const ContactForm = () => {
  return (
    <section id="contacto" className="py-24 px-6 bg-[#1a1a1a]">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-2 text-center text-white">
            Contactanos
          </h2>
          <p className="text-gray-400 text-center mb-8">
            Completá tus datos y nos ponemos en contacto para resolver tus
            dudas.
          </p>

          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Tu nombre"
              className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500 rounded-xl h-14 px-5 focus-visible:ring-[#3a7d1e]"
            />
            <Input
              type="email"
              placeholder="tu@email.com"
              className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500 rounded-xl h-14 px-5 focus-visible:ring-[#3a7d1e]"
            />
            <Input
              type="tel"
              placeholder="+54 9 ..."
              className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500 rounded-xl h-14 px-5 focus-visible:ring-[#3a7d1e]"
            />
            <Textarea
              placeholder="Contanos sobre tu tambo..."
              className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500 rounded-xl min-h-[120px] px-5 py-4 focus-visible:ring-[#3a7d1e] resize-none"
            />
            <button
              type="submit"
              className="w-full h-14 bg-[#3a7d1e] hover:bg-[#2e6518] text-white font-bold tracking-widest uppercase rounded-xl transition-colors duration-200"
            >
              Enviar
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactForm

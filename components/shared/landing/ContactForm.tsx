'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { motion } from 'motion/react'

const ContactForm = () => {
  return (
    <section id="contacto" className="py-20 px-6">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-3 text-center">Contactanos</h2>
          <p className="text-foreground text-center mb-10">
            Completá tus datos y nos ponemos en contacto para resolver tus
            dudas.
          </p>

          {false ? (
            <div className="text-center bg-dialogs rounded-lg p-8">
              <p className="text-secondary font-semibold text-lg">
                ¡Gracias por tu interés!
              </p>
              <p className="text-foreground text-sm mt-2">
                Nos comunicaremos a la brevedad.
              </p>
            </div>
          ) : (
            <form className="space-y-5">
              <div className="space-y-2">
                <Label>Nombre</Label>
                <Input type="text" required placeholder="Tu nombre" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" required placeholder="tu@email.com" />
              </div>
              <div className="space-y-2">
                <Label>Teléfono</Label>
                <Input type="tel" placeholder="+54 9 ..." />
              </div>
              <div className="space-y-2">
                <Label>Mensaje</Label>
                <Textarea
                  className="min-h-36"
                  placeholder="Contanos sobre tu tambo..."
                />
              </div>

              <Button className="h-12 w-28" type="submit">
                Enviar
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default ContactForm

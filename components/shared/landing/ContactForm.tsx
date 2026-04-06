'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  formatCooldown,
  getRemainingCooldown,
  useSendContact,
} from '@/hooks/useSendContact'
import { ContactFormData, contactSchema } from '@/types/contact'
import { Loader } from 'lucide-react'

function useCooldownTimer() {
  const [remaining, setRemaining] = useState(() => getRemainingCooldown())

  useEffect(() => {
    if (remaining <= 0) return
    const id = setInterval(() => {
      const r = getRemainingCooldown()
      setRemaining(r)
      if (r <= 0) clearInterval(id)
    }, 1000)
    return () => clearInterval(id)
  }, [remaining])

  return remaining
}

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="text-sm text-red-400 mt-1 pl-1"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

function SuccessMessage({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center justify-center gap-4 py-12 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-[#3a7d1e]/20 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-[#5cb32b]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-white">¡Mensaje enviado!</h3>
      <p className="text-gray-400 text-sm max-w-xs">
        Recibimos tu consulta y nos pondremos en contacto a la brevedad.
      </p>
      <button
        onClick={onReset}
        className="mt-2 text-xs text-[#5cb32b] hover:text-[#7dd64a] underline underline-offset-2 transition-colors"
      >
        Enviar otro mensaje
      </button>
    </motion.div>
  )
}

const ContactForm = () => {
  const {
    sendContact,
    isPending,
    isSuccess,
    isError,
    error,
    reset: resetMutation,
  } = useSendContact()
  const cooldownRemaining = useCooldownTimer()
  const isBlocked = cooldownRemaining > 0

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', phone: '', message: '' },
  })

  const onSubmit = (data: ContactFormData) => {
    sendContact(data)
  }

  const handleReset = () => {
    resetForm()
    resetMutation()
  }

  const inputClass =
    'bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500 rounded-xl h-14 px-5 focus-visible:ring-[#3a7d1e]'

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

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <SuccessMessage key="success" onReset={handleReset} />
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
                noValidate
              >
                {/* Name */}
                <div>
                  <Input
                    type="text"
                    placeholder="Tu nombre"
                    className={inputClass}
                    {...register('name')}
                  />
                  <FieldError message={errors.name?.message} />
                </div>

                {/* Email */}
                <div>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    className={inputClass}
                    {...register('email')}
                  />
                  <FieldError message={errors.email?.message} />
                </div>

                {/* Phone */}
                <div>
                  <Input
                    type="tel"
                    placeholder="+54 9 ..."
                    className={inputClass}
                    {...register('phone')}
                  />
                  <FieldError message={errors.phone?.message} />
                </div>

                <div>
                  <Textarea
                    placeholder="Contanos sobre tu tambo..."
                    className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500 rounded-xl min-h-30 px-5 py-4 focus-visible:ring-[#3a7d1e] resize-none"
                    {...register('message')}
                  />
                  <FieldError message={errors.message?.message} />
                </div>

                <AnimatePresence>
                  {isError && error && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400"
                    >
                      {error.message}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Cooldown banner */}
                <AnimatePresence>
                  {isBlocked && !isPending && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-xl bg-yellow-500/10 border border-yellow-500/30 px-4 py-3 text-sm text-yellow-400 flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Podés enviar otro mensaje en{' '}
                      <span className="font-bold tabular-nums">
                        {formatCooldown(cooldownRemaining)}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isPending || isBlocked}
                  className="w-full h-14 bg-[#3a7d1e] hover:bg-[#2e6518] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold tracking-widest uppercase rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <div className="flex items-center gap-2 text-white">
                      <Loader className="size-5 animate-spin text-white" />
                      Enviando…
                    </div>
                  ) : isBlocked ? (
                    `Espera ${formatCooldown(cooldownRemaining)}`
                  ) : (
                    'Enviar'
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactForm

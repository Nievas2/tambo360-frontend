import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(80, 'El nombre es demasiado largo'),
  email: z.email('Ingresá un email válido'),
  phone: z
    .string()
    .min(10, 'Ingresá un teléfono válido')
    .regex(/^\+?[\d\s\-().]{7,20}$/, 'Ingresá un teléfono válido'),
  message: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(1000, 'El mensaje no puede superar los 1000 caracteres'),
})

export type ContactFormData = z.infer<typeof contactSchema>

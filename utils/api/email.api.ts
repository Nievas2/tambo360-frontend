import { api } from '@/services/api'
import { ContactFormData } from '@/types/contact'

export const contactSupport = async ({
  message,
  email,
  name,
  phone,
}: ContactFormData) =>
  api.post('/landing/contacto', {
    nombre: name,
    email: email,
    telefono: phone,
    mensaje: message,
  })

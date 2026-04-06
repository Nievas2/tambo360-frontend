import { useMutation } from '@tanstack/react-query'
import { contactSupport } from '@/utils/api/email.api'
import { ContactFormData } from '@/types/contact'

const COOLDOWN_MS = 5 * 60 * 1000
const STORAGE_KEY = 'contact_last_sent'

function getLastSentAt(): number | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? parseInt(raw, 10) : null
}

function setLastSentAt(): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, Date.now().toString())
}

export function getRemainingCooldown(): number {
  const last = getLastSentAt()
  if (!last) return 0
  const elapsed = Date.now() - last
  return Math.max(0, COOLDOWN_MS - elapsed)
}

export function formatCooldown(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  if (minutes > 0) return `${minutes}m ${seconds}s`
  return `${seconds}s`
}

export function useSendContact() {
  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const remaining = getRemainingCooldown()
      if (remaining > 0) {
        throw new Error(
          `Espera ${formatCooldown(remaining)} antes de enviar otro mensaje.`
        )
      }

      const result = await contactSupport(data)

      setLastSentAt()
      return result
    },
  })

  return {
    sendContact: mutation.mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error as Error | null,
    reset: mutation.reset,
  }
}

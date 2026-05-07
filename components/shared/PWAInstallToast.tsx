'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export function PWAInstallToast() {
  const [installEvent, setInstallEvent] = useState<any>(null)

  useEffect(() => {
    const pwaDecision = localStorage.getItem('pwa-install-decision')
    if (pwaDecision === 'installed') {
      return
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setInstallEvent(e)

      toast.custom(
        (t) => (
          <div className="flex items-center gap-4 bg-background border rounded-lg p-4 shadow-lg w-full max-w-90">
            {/* Logo */}
            <div className="shrink-0 relative size-16">
              <img
                src="/logos/isotipo_512x512.png"
                alt="Tambo360 Logo"
                className="object-contain rounded-md"
              />
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <h3 className="font-semibold text-sm">Instalar Tambo360</h3>
              <p className="text-xs text-muted-foreground">
                Gestiona tu producción más rápido y sin conexión.
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    if (e) {
                      ;(e as any).prompt()
                      localStorage.setItem('pwa-install-decision', 'installed')
                      toast.dismiss(t)
                    }
                  }}
                  className="text-xs bg-primary text-primary-foreground px-4 py-1.5 rounded-md font-medium flex-1"
                >
                  Instalar
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem('pwa-install-decision', 'dismissed')
                    toast.dismiss(t)
                  }}
                  className="text-xs bg-secondary text-secondary-foreground px-4 py-1.5 rounded-md font-medium flex-1"
                >
                  Ahora no
                </button>
              </div>
            </div>

            {/* Botón X */}
            <button
              onClick={() => {
                localStorage.setItem('pwa-install-decision', 'installed')
                toast.dismiss(t)
              }}
              className="shrink-0 text-muted-foreground hover:text-foreground"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ),
        {
          duration: Infinity,
          position: 'bottom-right',
        }
      )
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      )
    }
  }, [])

  return null
}

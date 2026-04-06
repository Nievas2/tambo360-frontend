import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Tambo360',
    short_name: 'Tambo360',
    description:
      'Tambo360 es un sistema de gestión de producción para la industria del leche y la queso.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/logos/isotipo_192x192.jpg',
        sizes: '192x192',
        type: 'image/jpg',
        purpose: 'any',
      },
      {
        src: '/logos/isotipo_512x512.jpg',
        sizes: '512x512',
        type: 'image/jpg',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/screenshots/mobile.jpeg',
        sizes: '720x1448',
        type: 'image/jpeg',
      },
      {
        src: '/screenshots/desktop.jpg',
        sizes: '1345x768',
        type: 'image/jpg',
        form_factor: 'wide',
      },
    ],
  }
}

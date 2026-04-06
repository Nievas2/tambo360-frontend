import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Tambo360',
    short_name: 'Tambo',
    description:
      'Tambo360 es un sistema de gestión de producción para la industria del leche y la queso.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fce8e5',
    theme_color: '#fce8e5',
    icons: [
      {
        src: '/logos/isotipo_192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/logos/isotipo_512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
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

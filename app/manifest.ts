import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tambo360',
    short_name: 'Tambo',
    description:
      'Tambo360 es un sistema de gestión de producción para la industria del leche y la queso.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/isotipo_tambo 1.png',
        sizes: '786x786',
        type: 'image/png',
      },
      {
        src: '/logotipo 1.png',
        sizes: '308x74',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}

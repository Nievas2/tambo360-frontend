import Linkedin from '@/components/shared/icons/Linkedin'
import Instagram from '@/components/shared/icons/Instagram'
import Facebook from '@/components/shared/icons/Facebook'
import X from '@/components/shared/icons/XIcon'
import TikTok from '@/components/shared/icons/TikTok'
import Link from 'next/link'

const Footer = () => {
  const links = [
    { label: 'Producto', href: '/producto' },
    { label: 'Precios', href: '/precios' },
    { label: 'Contacto', href: '/contacto' },
    { label: 'Nosotros', href: '/nosotros' },
  ]

  return (
    <footer className="border-t py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight w-fit"
          >
            <img src="/isotipo_tambo 1.svg" alt="Logo" className="size-12" />
            Tambo360
          </Link>
          <i className="text-foreground text-sm mt-2 max-w-xs">
            La gestión inteligente que tu producción necesita
          </i>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-sm text-foreground">Navegación</span>
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-foreground hover:text-[#669213] underline hover:underline-offset-2 transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm text-foreground">Siguenos en:</span>
          <Link
            href="https://www.linkedin.com/company/tambo360/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-foreground hover:text-blue-700 transition-colors group"
          >
            <Linkedin className="size-6 text-foreground group-hover:text-blue-700 transition-colors" />
            LinkedIn
          </Link>
          <Link
            href="https://www.instagram.com/tambo360.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-foreground hover:text-blue-700 transition-colors group"
          >
            <Instagram className="size-6 text-foreground group-hover:text-blue-700 transition-colors" />
            Instagram
          </Link>
          <Link
            href="https://www.facebook.com/profile.php?id=61577674540376"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-foreground hover:text-blue-700 transition-colors group"
          >
            <Facebook className="size-6 text-foreground group-hover:text-blue-700 transition-colors" />
            Facebook
          </Link>
          <Link
            href="https://x.com/Tambo360App"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-foreground hover:text-blue-700 transition-colors group"
          >
            <X className="size-6 text-foreground group-hover:text-blue-700 transition-colors" />
            X(Ex-Twitter)
          </Link>
          <Link
            href="https://www.tiktok.com/@tambo3601"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-foreground hover:text-blue-700 transition-colors group"
          >
            <TikTok className="size-6 text-foreground group-hover:text-blue-700 transition-colors" />
            Tik-Tok
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-foreground">
          © {new Date().getFullYear()} Tambo360. Todos los derechos reservados.
        </p>
        <div className="flex gap-4">
          <Link
            href="/"
            className="text-xs  text-foreground hover:text-blue-700 transition-colors"
          >
            Política de privacidad
          </Link>

          <Link
            href="/"
            className="text-xs  text-foreground hover:text-blue-700 transition-colors"
          >
            Términos de uso
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer

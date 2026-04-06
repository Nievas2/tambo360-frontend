import Linkedin from '@/components/shared/icons/Linkedin'
import Instagram from '@/components/shared/icons/Instagram'
import X from '@/components/shared/icons/XIcon'
import TikTok from '@/components/shared/icons/TikTok'
import Link from 'next/link'

const socials = [
  {
    href: 'https://www.linkedin.com/company/tambo360/',
    icon: Linkedin,
    label: 'LinkedIn',
  },
  {
    href: 'https://www.instagram.com/tambo360.app/',
    icon: Instagram,
    label: 'Instagram',
  },
  /*  {
     href: 'https://www.facebook.com/profile.php?id=61577674540376',
     icon: Facebook,
     label: 'Facebook',
   }, */
  {
    href: 'https://x.com/Tambo360App',
    icon: X,
    label: 'X',
  },
  {
    href: 'https://www.tiktok.com/@tambo3601',
    icon: TikTok,
    label: 'TikTok',
  },
]

const Footer = () => {
  return (
    <footer className="bg-[#111111] py-12 px-6">
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-6">
        {/* Tagline */}
        <p className="text-gray-500 text-sm">
          Tambo360 – Excelencia en Ingeniería de Software para la Industria
          Lechera.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-5">
          {socials.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-gray-500 hover:text-white transition-colors duration-200"
            >
              <Icon className="size-5" />
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-800" />

        {/* Copyright */}
        <p className="text-gray-600 text-xs">
          © {new Date().getFullYear()} Tambo360. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer

import Link from 'next/link'
import { Youtube, Facebook, Instagram, MessageCircle, Twitter } from 'lucide-react'
import { SEO_CONFIG } from '@/lib/seo'

interface SocialLinksProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showLabels?: boolean
}

export function SocialLinks({ 
  className = '', 
  size = 'md', 
  showLabels = false 
}: SocialLinksProps) {
  const iconSize = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  }

  const socialLinks = [
    {
      name: 'YouTube',
      href: SEO_CONFIG.socialMedia.youtube,
      icon: Youtube,
      color: 'hover:text-red-600'
    },
    {
      name: 'Facebook',
      href: SEO_CONFIG.socialMedia.facebook,
      icon: Facebook,
      color: 'hover:text-blue-600'
    },
    {
      name: 'Instagram',
      href: SEO_CONFIG.socialMedia.instagram,
      icon: Instagram,
      color: 'hover:text-pink-600'
    },
    {
      name: 'WhatsApp',
      href: SEO_CONFIG.socialMedia.whatsapp,
      icon: MessageCircle,
      color: 'hover:text-green-600'
    },
    {
      name: 'X (Twitter)',
      href: SEO_CONFIG.socialMedia.x,
      icon: Twitter,
      color: 'hover:text-gray-800'
    }
  ]

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {socialLinks.map((social) => {
        const IconComponent = social.icon
        return (
          <Link
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center space-x-2 text-gray-600 transition-colors duration-200 ${social.color}`}
            aria-label={`Follow us on ${social.name}`}
          >
            <IconComponent className={iconSize[size]} />
            {showLabels && (
              <span className="text-sm font-medium">{social.name}</span>
            )}
          </Link>
        )
      })}
    </div>
  )
}

// Compact version for footer
export function SocialLinksCompact({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Link
        href={SEO_CONFIG.socialMedia.youtube}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-red-600 transition-colors duration-200"
        aria-label="YouTube"
      >
        <Youtube className="h-5 w-5" />
      </Link>
      <Link
        href={SEO_CONFIG.socialMedia.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
        aria-label="Facebook"
      >
        <Facebook className="h-5 w-5" />
      </Link>
      <Link
        href={SEO_CONFIG.socialMedia.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-pink-600 transition-colors duration-200"
        aria-label="Instagram"
      >
        <Instagram className="h-5 w-5" />
      </Link>
      <Link
        href={SEO_CONFIG.socialMedia.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-green-600 transition-colors duration-200"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
      </Link>
      <Link
        href={SEO_CONFIG.socialMedia.x}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-gray-800 transition-colors duration-200"
        aria-label="X (Twitter)"
      >
        <Twitter className="h-5 w-5" />
      </Link>
    </div>
  )
}

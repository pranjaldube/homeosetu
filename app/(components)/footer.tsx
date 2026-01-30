"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Twitter, Facebook, Linkedin, Instagram, Youtube, MessageCircle } from "lucide-react"
import { SEO_CONFIG } from "@/lib/seo"

export const Footer: React.FC = () => {
  return (
    <Card className="bottom-0 left-0 right-0 rounded-none border-t">
      <CardContent className="p-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div></div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Legal</h3>
              <ul className="space-y-1">
                <li>
                  <Button asChild variant="link" className="h-auto p-0 text-sm">
                    <Link href="/disclaimer">Disclaimer</Link>
                  </Button>
                </li>
                <li>
                  <Button asChild variant="link" className="h-auto p-0 text-sm">
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </Button>
                </li>
                <li>
                  <Button asChild variant="link" className="h-auto p-0 text-sm">
                    <Link href="/return-and-refund-policy">
                      Return and Refund Policy
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button asChild variant="link" className="h-auto p-0 text-sm">
                    <Link href="/tnc">Terms and Conditions</Link>
                  </Button>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Resources</h3>
              <ul className="space-y-1">
                {/* <li>
                  <Button asChild variant="link" className="h-auto p-0 text-sm">
                    <Link href="/#">Careers</Link>
                  </Button>
                </li>
                <li>
                  <Button asChild variant="link" className="h-auto p-0 text-sm">
                    <Link href="/#">FAQ</Link>
                  </Button>
                </li> */}
                <li>
                  <Button asChild variant="link" className="h-auto p-0 text-sm">
                    <Link href="/about-us">About Us</Link>
                  </Button>
                </li>
                <li>
                  <Button asChild variant="link" className="h-auto p-0 text-sm">
                    <Link href="/contact-us">Contact Us</Link>
                  </Button>
                </li>
                <li>
                  <Button asChild variant="link" className="h-auto p-0 text-sm">
                    <Link href="/faq">FAQ</Link>
                  </Button>
                </li>
                <li>
                  <Button asChild variant="link" className="h-auto p-0 text-sm">
                    <Link href="/legal">Educational & Legal Disclaimer</Link>
                  </Button>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Socials</h3>
              <div className="flex space-x-2">
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  aria-label="YouTube"
                >
                  <a
                    href={SEO_CONFIG.socialMedia.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Youtube className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  aria-label="Facebook"
                >
                  <a
                    href={SEO_CONFIG.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  aria-label="Instagram"
                >
                  <a
                    href={SEO_CONFIG.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  aria-label="WhatsApp"
                >
                  <a
                    href={SEO_CONFIG.socialMedia.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  aria-label="X (Twitter)"
                >
                  <a
                    href={SEO_CONFIG.socialMedia.x}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} HOMEOSETU SOFTWARE LLP. All rights
              reserved.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

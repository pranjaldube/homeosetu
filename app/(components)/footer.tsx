"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Twitter, Facebook, Linkedin, Instagram, Youtube } from "lucide-react"

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
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Socials</h3>
              <div className="flex space-x-2">
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  aria-label="X (Twitter)"
                >
                  <a
                    href="https://x.com/homeosetu"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  aria-label="Facebook"
                >
                  <a
                    href="https://www.facebook.com/homeosetu"
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
                    href="https://www.instagram.com/homeosetu/"
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
                  aria-label="YouTube"
                >
                  <a
                    href="https://www.youtube.com/@Homeosetu"
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
                  aria-label="WhatsApp Channel"
                >
                  <a
                    href="https://whatsapp.com/channel/0029Vb1nEJT0VycIU60Buo0K"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
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

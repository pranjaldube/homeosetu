"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Twitter, Facebook, Linkedin } from "lucide-react"

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
                    <Link href="/disclaimer">Disclaimer</Link>
                  </Button>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Resources</h3>
              <ul className="space-y-1">
                <li>
                  <Button asChild variant="link" className="h-auto p-0 text-sm">
                    <Link href="/careers">Careers</Link>
                  </Button>
                </li>
                <li>
                  <Button asChild variant="link" className="h-auto p-0 text-sm">
                    <Link href="/faq">FAQ</Link>
                  </Button>
                </li>
                <li>
                  <Button asChild variant="link" className="h-auto p-0 text-sm">
                    <Link href="/contact-us">Contact Us</Link>
                  </Button>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Connect</h3>
              <div className="flex space-x-2">
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  aria-label="Twitter"
                >
                  <a
                    href="https://twitter.com/yourcompany"
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
                    href="https://facebook.com/yourcompany"
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
                  aria-label="LinkedIn"
                >
                  <a
                    href="https://linkedin.com/company/yourcompany"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-4 w-4" />
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

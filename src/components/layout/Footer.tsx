import { Link } from "react-router-dom";
import { BookOpen, Mail, Phone, MapPin, Instagram, Linkedin, MessageCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-bold text-lg font-serif">
                  {COMPANY_INFO.name}
                </span>
                <p className="text-xs text-background/60 -mt-1">
                  {COMPANY_INFO.fullName}
                </p>
              </div>
            </div>
            <p className="text-sm text-background/70 leading-relaxed">
              {COMPANY_INFO.description}
            </p>
            <div className="flex gap-3">
              <a
                href={COMPANY_INFO.social.instagram}
                target="_blank"
                rel="noopener"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={COMPANY_INFO.social.linkedin}
                target="_blank"
                rel="noopener"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={COMPANY_INFO.social.whatsapp}
                target="_blank"
                rel="noopener"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">
              Tautan Cepat
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Kontak</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${COMPANY_INFO.contact.email}`}
                  className="flex items-start gap-3 text-sm text-background/70 hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  {COMPANY_INFO.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY_INFO.contact.phone}`}
                  className="flex items-start gap-3 text-sm text-background/70 hover:text-primary transition-colors"
                >
                  <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  {COMPANY_INFO.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={COMPANY_INFO.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener"
                  className="flex items-start gap-3 text-sm text-background/70 hover:text-primary transition-colors"
                >
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  {COMPANY_INFO.contact.address}
                </a>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">
              Website Utama
            </h4>
            <p className="text-sm text-background/70 mb-4">
              Kunjungi website utama LDP Group untuk informasi lebih lengkap tentang layanan kami.
            </p>
            <Button asChild className="gradient-primary w-full">
              <a
                href={COMPANY_INFO.mainWebsite}
                target="_blank"
                rel="noopener"
                className="flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                LDP Group
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/50">
              © {new Date().getFullYear()} {COMPANY_INFO.fullName}. All rights reserved.
            </p>
            <p className="text-sm text-background/50">
              Part of{" "}
              <a
                href={COMPANY_INFO.mainWebsite}
                target="_blank"
                rel="noopener"
                className="text-primary hover:underline"
              >
                LDP Group
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { ArrowRight, BookOpen, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { COMPANY_INFO } from "@/lib/constants";

export default function CTASection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl gradient-hero p-8 md:p-16 text-center">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-background rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-background rounded-full translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-background/10 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-primary-foreground mb-4">
              Siap Mewujudkan Karya Anda?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Bergabunglah dengan ratusan penulis yang telah mempercayakan karya mereka kepada kami. 
              Tim profesional kami siap membantu Anda.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">
                  Hubungi Kami
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <a href={COMPANY_INFO.social.whatsapp} target="_blank" rel="noopener">
                  Chat via WhatsApp
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              <a
                href={`mailto:${COMPANY_INFO.contact.email}`}
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Mail className="w-5 h-5" />
                {COMPANY_INFO.contact.email}
              </a>
              <a
                href={`tel:${COMPANY_INFO.contact.phone}`}
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Phone className="w-5 h-5" />
                {COMPANY_INFO.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

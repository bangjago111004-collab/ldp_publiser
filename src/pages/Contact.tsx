import Layout from "@/components/layout/Layout";
import { Mail, Phone, MapPin, Instagram, Linkedin, MessageCircle, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { COMPANY_INFO } from "@/lib/constants";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setLoading(false);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Hubungi Kami
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mt-4 mb-6">
              Mari <span className="text-gradient">Terhubung</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Kami siap membantu Anda. Hubungi kami melalui berbagai saluran 
              yang tersedia atau kunjungi langsung kantor kami.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold font-serif mb-6">
                  Informasi Kontak
                </h2>
                <div className="space-y-6">
                  <a
                    href={`mailto:${COMPANY_INFO.contact.email}`}
                    className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium group-hover:text-primary transition-colors">
                        Email
                      </p>
                      <p className="text-muted-foreground">
                        {COMPANY_INFO.contact.email}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`tel:${COMPANY_INFO.contact.phone}`}
                    className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium group-hover:text-primary transition-colors">
                        Telepon
                      </p>
                      <p className="text-muted-foreground">
                        {COMPANY_INFO.contact.phone}
                      </p>
                    </div>
                  </a>

                  <a
                    href={COMPANY_INFO.location.googleMapsUrl}
                    target="_blank"
                    rel="noopener"
                    className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium group-hover:text-primary transition-colors flex items-center gap-2">
                        Alamat
                        <ExternalLink className="w-4 h-4" />
                      </p>
                      <p className="text-muted-foreground">
                        {COMPANY_INFO.contact.address}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                    <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Jam Operasional</p>
                      <p className="text-muted-foreground">
                        Senin - Jumat: 09:00 - 17:00 WIB
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Media Sosial</h3>
                <div className="flex gap-3">
                  <a
                    href={COMPANY_INFO.social.instagram}
                    target="_blank"
                    rel="noopener"
                    className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href={COMPANY_INFO.social.linkedin}
                    target="_blank"
                    rel="noopener"
                    className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={COMPANY_INFO.social.whatsapp}
                    target="_blank"
                    rel="noopener"
                    className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="p-6 rounded-xl gradient-primary">
                <h3 className="text-lg font-semibold text-primary-foreground mb-2">
                  Butuh Respons Cepat?
                </h3>
                <p className="text-primary-foreground/80 text-sm mb-4">
                  Chat langsung dengan tim kami via WhatsApp untuk respons lebih cepat.
                </p>
                <Button variant="secondary" asChild>
                  <a
                    href={COMPANY_INFO.social.whatsapp}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat via WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card p-8 rounded-2xl border border-border">
              <h2 className="text-2xl font-bold font-serif mb-6">
                Kirim Pesan
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Nama Lengkap *
                    </label>
                    <Input
                      required
                      placeholder="Nama Anda"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Email *
                    </label>
                    <Input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      No. Telepon
                    </label>
                    <Input
                      placeholder="08xxxxxxxxxx"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Subjek *
                    </label>
                    <Input
                      required
                      placeholder="Perihal pesan"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Pesan *
                  </label>
                  <Textarea
                    required
                    rows={5}
                    placeholder="Tuliskan pesan Anda di sini..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-primary shadow-elegant"
                  disabled={loading}
                >
                  {loading ? "Mengirim..." : "Kirim Pesan"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl overflow-hidden border border-border">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2!2d${COMPANY_INFO.location.lng}!3d${COMPANY_INFO.location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMzEuNyJTIDEwNsKwNTAnNDQuMiJF!5e0!3m2!1sen!2sid!4v1234567890`}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="LDP Publisher Location"
            />
          </div>
          <div className="text-center mt-4">
            <Button variant="outline" asChild>
              <a
                href={COMPANY_INFO.location.googleMapsUrl}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                Buka di Google Maps
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

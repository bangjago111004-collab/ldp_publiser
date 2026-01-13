import Layout from "@/components/layout/Layout";
import { BookOpen, Edit, Palette, Truck, FileCheck, Headphones, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: BookOpen,
    title: "Penerbitan Buku",
    description: "Layanan penerbitan buku profesional dengan standar kualitas tinggi untuk berbagai genre.",
    features: [
      "Penerbitan fiksi dan non-fiksi",
      "Buku akademik dan ilmiah",
      "Buku anak dan pendidikan",
      "Kualitas cetak premium",
    ],
  },
  {
    icon: Edit,
    title: "Editing & Proofreading",
    description: "Tim editor berpengalaman yang akan menyempurnakan naskah Anda secara menyeluruh.",
    features: [
      "Editing substansi",
      "Proofreading profesional",
      "Koreksi tata bahasa",
      "Konsistensi penulisan",
    ],
  },
  {
    icon: Palette,
    title: "Desain & Layout",
    description: "Desain cover dan layout interior yang menarik dan profesional.",
    features: [
      "Desain cover eksklusif",
      "Layout interior profesional",
      "Ilustrasi dan grafis",
      "Revisi tanpa batas",
    ],
  },
  {
    icon: FileCheck,
    title: "ISBN & Legalitas",
    description: "Pengurusan ISBN dan aspek legal penerbitan secara lengkap.",
    features: [
      "Pengurusan ISBN resmi",
      "Pendaftaran Perpusnas",
      "Sertifikat penerbitan",
      "Hak cipta terlindungi",
    ],
  },
  {
    icon: Truck,
    title: "Distribusi",
    description: "Jaringan distribusi luas ke seluruh Indonesia dan marketplace online.",
    features: [
      "Distribusi nasional",
      "Marketplace online",
      "Toko buku besar",
      "Pengiriman langsung",
    ],
  },
  {
    icon: Headphones,
    title: "Konsultasi Penerbitan",
    description: "Konsultasi gratis untuk membantu Anda memahami proses penerbitan.",
    features: [
      "Konsultasi naskah",
      "Strategi penerbitan",
      "Rekomendasi paket",
      "Pendampingan penulis",
    ],
  },
];

const process = [
  { step: 1, title: "Konsultasi", description: "Diskusikan naskah Anda dengan tim kami" },
  { step: 2, title: "Evaluasi Naskah", description: "Tim editor mengevaluasi kelayakan naskah" },
  { step: 3, title: "Editing", description: "Proses editing dan proofreading menyeluruh" },
  { step: 4, title: "Desain", description: "Pembuatan cover dan layout interior" },
  { step: 5, title: "Cetak", description: "Proses pencetakan dengan kualitas premium" },
  { step: 6, title: "Distribusi", description: "Distribusi ke seluruh Indonesia" },
];

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Layanan Kami
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mt-4 mb-6">
              Solusi Penerbitan{" "}
              <span className="text-gradient">Profesional</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Layanan penerbitan lengkap dari konsultasi hingga distribusi. 
              Kami hadir untuk mewujudkan karya terbaik Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-8 bg-card rounded-2xl border border-border hover:shadow-elegant transition-shadow group"
              >
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold font-serif mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Proses Penerbitan
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mt-2">
              Langkah Mudah Menerbitkan Buku
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((item) => (
              <div
                key={item.step}
                className="flex gap-4 p-6 bg-card rounded-xl border border-border"
              >
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-bold">
                    {item.step}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold font-serif mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="p-8 md:p-16 rounded-3xl gradient-hero text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-primary-foreground mb-4">
              Siap Menerbitkan Karya Anda?
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Konsultasikan naskah Anda dengan tim profesional kami. 
              Kami siap membantu mewujudkan impian Anda menjadi penulis.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">
                Konsultasi Gratis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

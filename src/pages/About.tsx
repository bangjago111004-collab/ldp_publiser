import Layout from "@/components/layout/Layout";
import { CheckCircle, Target, Eye, Heart, ArrowRight, Users, Award, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { COMPANY_INFO } from "@/lib/constants";

const values = [
  {
    icon: Target,
    title: "Profesionalisme",
    description: "Mengedepankan standar kualitas tinggi dalam setiap proses penerbitan.",
  },
  {
    icon: Heart,
    title: "Integritas",
    description: "Menjaga kepercayaan penulis dengan transparansi dan kejujuran.",
  },
  {
    icon: Users,
    title: "Kolaboratif",
    description: "Bekerja sama erat dengan penulis untuk hasil terbaik.",
  },
  {
    icon: Globe,
    title: "Inovatif",
    description: "Terus berkembang mengikuti tren industri penerbitan modern.",
  },
];

const milestones = [
  { year: "2009", event: "PT Lentera Duta Persada didirikan" },
  { year: "2012", event: "Meluncurkan divisi penerbitan pertama" },
  { year: "2015", event: "Mencapai 100 judul buku diterbitkan" },
  { year: "2018", event: "Ekspansi ke penerbitan digital" },
  { year: "2020", event: "Bergabung dengan LDP Group" },
  { year: "2023", event: "Rebranding menjadi LDP Publisher" },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Tentang Kami
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mt-4 mb-6">
              Menerangi Dunia Melalui{" "}
              <span className="text-gradient">Karya Literasi</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              {COMPANY_INFO.name} adalah bagian dari {COMPANY_INFO.fullName}, 
              berkomitmen menghadirkan karya-karya berkualitas tinggi untuk memperkaya 
              khazanah literasi Indonesia.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-8 bg-card rounded-2xl border border-border">
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold font-serif mb-4">Visi</h2>
              <p className="text-muted-foreground leading-relaxed">
                Menjadi penerbit terkemuka di Indonesia yang dikenal karena kualitas, 
                integritas, dan kontribusinya dalam memajukan literasi bangsa serta 
                membawa karya-karya terbaik Indonesia ke kancah internasional.
              </p>
            </div>
            <div className="p-8 bg-card rounded-2xl border border-border">
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold font-serif mb-4">Misi</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  Menyediakan layanan penerbitan profesional berkualitas tinggi
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  Mendukung penulis Indonesia untuk berkarya dan berkembang
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  Memperluas akses masyarakat terhadap bacaan berkualitas
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Nilai-Nilai Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mt-2">
              Prinsip yang Kami Pegang
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 bg-card rounded-2xl border border-border text-center hover:shadow-elegant transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold font-serif mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Perjalanan Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mt-2">
              Milestone Penting
            </h2>
          </div>
          <div className="max-w-2xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {milestone.year.slice(-2)}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <span className="text-sm text-primary font-medium">
                    {milestone.year}
                  </span>
                  <p className="text-foreground font-medium">
                    {milestone.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="p-8 md:p-12 bg-card rounded-2xl border border-border text-center">
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold font-serif mb-4">
              Bagian dari LDP Group
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              LDP Publisher adalah divisi penerbitan dari PT Lentera Duta Persada, 
              bagian dari ekosistem bisnis LDP Group yang lebih luas.
            </p>
            <Button asChild className="gradient-primary shadow-elegant">
              <a href={COMPANY_INFO.mainWebsite} target="_blank" rel="noopener">
                Kunjungi LDP Group
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

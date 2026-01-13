import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { COMPANY_INFO } from "@/lib/constants";

const features = [
  "Tim editor profesional berpengalaman",
  "Desain cover eksklusif dan menarik",
  "Proses cepat dan transparan",
  "Distribusi nasional dan internasional",
  "Royalti kompetitif untuk penulis",
  "Dukungan marketing digital",
];

export default function AboutSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl" />
                <div className="h-32 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary-foreground font-serif">15+</span>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-32 bg-gradient-to-br from-primary/30 to-primary/10 rounded-2xl" />
                <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl" />
              </div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 bg-card p-4 rounded-xl shadow-elegant border border-border">
              <p className="text-sm text-muted-foreground">Tahun Pengalaman</p>
              <p className="text-xs text-primary font-medium">Sejak 2009</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Tentang Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif leading-tight">
              Mitra Terpercaya untuk{" "}
              <span className="text-gradient">Karya Terbaik Anda</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {COMPANY_INFO.name} adalah divisi penerbitan dari {COMPANY_INFO.fullName}, 
              bagian dari LDP Group yang telah berpengalaman dalam industri penerbitan 
              selama lebih dari 15 tahun.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Kami berkomitmen untuk menghadirkan karya-karya berkualitas tinggi yang 
              dapat memperkaya khazanah literasi Indonesia dan memberikan dampak positif 
              bagi pembaca di seluruh dunia.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-3 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <Button className="gradient-primary shadow-elegant" asChild>
                <Link to="/about">
                  Selengkapnya
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a href={COMPANY_INFO.mainWebsite} target="_blank" rel="noopener">
                  Kunjungi LDP Group
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

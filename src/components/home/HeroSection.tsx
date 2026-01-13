import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { COMPANY_INFO } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary rounded-full animate-float" />
      <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-primary/50 rounded-full animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-primary/70 rounded-full animate-float" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Penerbit Profesional Terpercaya
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight">
              <span className="text-foreground">Mewujudkan</span>{" "}
              <span className="text-gradient">Karya</span>
              <br />
              <span className="text-foreground">Menerangi</span>{" "}
              <span className="text-gradient">Dunia</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              {COMPANY_INFO.description} Kami hadir untuk membantu mewujudkan impian para penulis Indonesia.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gradient-primary shadow-elegant" asChild>
                <Link to="/books">
                  Lihat Katalog
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/services">Layanan Kami</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border">
              {COMPANY_INFO.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-primary font-serif">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Illustration */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square">
              {/* Main Card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-96 bg-card rounded-2xl shadow-elegant border border-border p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="w-20 h-20 text-primary" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-primary/10 rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute top-10 left-10 w-48 h-32 bg-card rounded-xl shadow-lg border border-border p-4 animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="w-full h-16 bg-primary/10 rounded-lg mb-2" />
                <div className="h-2 bg-muted rounded w-2/3" />
              </div>

              <div className="absolute bottom-10 right-10 w-40 h-28 bg-card rounded-xl shadow-lg border border-border p-4 animate-float" style={{ animationDelay: "1s" }}>
                <div className="w-full h-12 bg-primary/10 rounded-lg mb-2" />
                <div className="h-2 bg-muted rounded w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

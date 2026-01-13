import { BookOpen, Edit, Palette, Truck } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<any>> = {
  BookOpen,
  Edit,
  Palette,
  Truck,
};

export default function ServicesSection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            Layanan Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif mt-2 mb-4">
            Solusi Penerbitan Lengkap
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Kami menyediakan layanan penerbitan profesional dari awal hingga akhir untuk memastikan karya Anda tampil sempurna.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {COMPANY_INFO.services.map((service, index) => {
            const Icon = iconMap[service.icon] || BookOpen;
            return (
              <div
                key={index}
                className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-elegant transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold font-serif mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import AboutSection from "@/components/home/AboutSection";
import BooksSection from "@/components/home/BooksSection";
import CTASection from "@/components/home/CTASection";
import { COMPANY_INFO } from "@/lib/constants";

export default function Index() {
  return (
    <Layout>
      {/* SEO */}
      <title>{COMPANY_INFO.name} - {COMPANY_INFO.tagline}</title>
      <meta name="description" content={COMPANY_INFO.description} />
      
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <BooksSection />
      <CTASection />
    </Layout>
  );
}

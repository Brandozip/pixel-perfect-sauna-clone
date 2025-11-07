import CleanNavbar from "@/components/navigation/CleanNavbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { HealthBenefits } from "@/components/HealthBenefits";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "next-themes";
import { LocalBusinessSchema, OrganizationSchema, WebsiteSchema } from "@/components/seo/StructuredData";

const Index = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <LocalBusinessSchema />
      <OrganizationSchema />
      <WebsiteSchema />
      <div className="min-h-screen">
        <CleanNavbar />
        <Hero />
        <Services />
        <HealthBenefits />
        <WhyChooseUs />
        <Testimonials />
        <Newsletter />
        <CTASection />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;

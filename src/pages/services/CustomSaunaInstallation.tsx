import CleanNavbar from "@/components/navigation/CleanNavbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Phone } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { Link } from "react-router-dom";
import { ServiceSchema, BreadcrumbSchema } from "@/components/seo/ServiceSchema";
import { SocialMetaTags } from "@/components/seo/SocialMetaTags";
import heroImage from "@/assets/residential-sauna.png";

const processSteps = [
  {
    number: 1,
    title: "Pre-Installation Planning",
    description: "We review all design specifications, verify materials, and prepare the installation site."
  },
  {
    number: 2,
    title: "Structural Preparation",
    description: "Prepare walls, floors, and ceiling for sauna installation including insulation and vapor barriers."
  },
  {
    number: 3,
    title: "Electrical & Ventilation",
    description: "Install electrical wiring for heater, lighting, and controls. Set up proper ventilation systems."
  },
  {
    number: 4,
    title: "Sauna Construction",
    description: "Build sauna walls, benches, and install doors using premium materials and expert craftsmanship."
  },
  {
    number: 5,
    title: "Heater Installation",
    description: "Install and connect your sauna heater system (electric, infrared, or wood-burning)."
  },
  {
    number: 6,
    title: "Final Testing & Training",
    description: "Complete system testing and provide owner training on proper operation and maintenance."
  }
];

const features = [
  "Licensed and insured installers",
  "Quality materials and construction",
  "Proper ventilation systems",
  "Electrical code compliance",
  "Moisture barrier installation",
  "Professional finishing",
  "System testing",
  "Owner training"
];

const whyChoose = [
  "15+ years of experience",
  "Licensed professionals",
  "Quality workmanship",
  "Code compliant",
  "Warranty coverage",
  "Ongoing support"
];

const CustomSaunaInstallation = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <SocialMetaTags
        title="Custom Sauna Installation Services"
        description="Professional sauna installation by licensed and insured experts. Code-compliant work, quality materials, proper ventilation systems, and comprehensive system testing."
        keywords={["sauna installation", "professional sauna installer", "Atlanta sauna contractor", "licensed sauna builder"]}
        image="https://www.saunasplus.com/og-installation.jpg"
      />
      <ServiceSchema
        name="Custom Sauna Installation"
        description="Professional sauna installation services for residential and commercial properties. Expert craftsmanship and code-compliant work."
        url="https://www.saunasplus.com/services/custom-sauna-installation"
        serviceType="Professional Installation Service"
        areaServed={["Atlanta, GA", "Georgia", "Southeastern United States"]}
        additionalInfo={{
          features: [
            "Licensed and insured installers",
            "Electrical code compliance",
            "Moisture barrier installation",
            "System testing and training"
          ],
          priceRange: "Contact for quote"
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.saunasplus.com/" },
          { name: "Services", url: "https://www.saunasplus.com/services" },
          { name: "Custom Sauna Installation", url: "https://www.saunasplus.com/services/custom-sauna-installation" }
        ]}
      />
      <div className="min-h-screen">
        <CleanNavbar />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Custom Sauna Installation</h1>
            <p className="text-xl text-muted-foreground mb-12">
              Professional Sauna Installation Services
            </p>
            
            <div className="mb-12">
              <img 
                src={heroImage} 
                alt="Custom sauna installation" 
                className="w-full rounded-lg shadow-xl mb-8"
              />
              <p className="text-lg text-muted-foreground">
                Expert installation ensuring your custom sauna is built to perfection. Our experienced team handles every detail from start to finish.
              </p>
            </div>

            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-8">Installation Process</h2>
              <div className="space-y-6">
                {processSteps.map((step, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-xl">
                        {step.number}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-8">Installation Features</h2>
              <Card className="p-8">
                <div className="grid md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card className="p-8 mb-16 bg-accent/5 border-accent/20">
              <h2 className="text-3xl font-bold mb-6">Why Choose Our Installation Service?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {whyChoose.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8 md:p-12 bg-primary text-primary-foreground">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Start Your Installation?</h2>
                <p className="text-lg mb-6 text-primary-foreground/90">
                  Contact us today for expert sauna installation services with guaranteed quality.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button size="lg" variant="secondary">
                      Get Free Consultation
                    </Button>
                  </Link>
                  <a href="tel:+16782459966">
                    <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                      <Phone className="mr-2 h-5 w-5" /> Call (678) 245-9966
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </section>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default CustomSaunaInstallation;

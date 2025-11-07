import CleanNavbar from "@/components/navigation/CleanNavbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Phone, Zap, Thermometer, Waves } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { Link } from "react-router-dom";
import { ServiceSchema, BreadcrumbSchema } from "@/components/seo/ServiceSchema";
import heroImage from "@/assets/luxury-sauna.jpg";

const benefits = [
  {
    icon: Thermometer,
    title: "Lower Operating Temperatures",
    description: "Comfortable 120-150°F temperatures that are easier to tolerate while providing deep, penetrating warmth."
  },
  {
    icon: Waves,
    title: "Deeper Tissue Penetration",
    description: "Infrared waves penetrate deeper into tissues for enhanced detoxification and pain relief."
  },
  {
    icon: Zap,
    title: "Energy Efficiency",
    description: "Lower temperatures mean reduced energy consumption and lower operating costs."
  }
];

const infraredTypes = [
  {
    title: "Far Infrared Saunas",
    description: "The most common type, providing deep penetration for detoxification and pain relief."
  },
  {
    title: "Full Spectrum Infrared",
    description: "Combines near, mid, and far infrared wavelengths for comprehensive health benefits."
  },
  {
    title: "Custom Infrared Designs",
    description: "Tailored installations that fit your space and aesthetic preferences."
  }
];

const features = [
  "Pre-fabricated cabin models",
  "Custom-built installations",
  "Corner designs",
  "1-4 person capacities",
  "Various wood species",
  "Glass door options",
  "Integrated sound systems",
  "Chromotherapy lighting"
];

const IndoorInfraredSauna = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <ServiceSchema
        name="Indoor Infrared Sauna"
        description="Modern infrared sauna installation for health and wellness. Experience the therapeutic benefits of infrared technology."
        url="https://www.saunasplus.com/services/indoor-infrared-sauna"
        serviceType="Home Wellness Service"
        areaServed={["Atlanta, GA", "Georgia", "Southeastern United States"]}
        additionalInfo={{
          features: [
            "Lower operating temperatures",
            "Deeper tissue penetration",
            "Energy efficiency",
            "Multiple infrared wavelength options"
          ],
          priceRange: "Contact for quote"
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.saunasplus.com/" },
          { name: "Services", url: "https://www.saunasplus.com/services" },
          { name: "Indoor Infrared Sauna", url: "https://www.saunasplus.com/services/indoor-infrared-sauna" }
        ]}
      />
      <div className="min-h-screen">
        <CleanNavbar />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Indoor Infrared Sauna Solutions</h1>
            <p className="text-xl text-muted-foreground mb-12">
              Experience Modern Heat Therapy
            </p>
            
            <div className="mb-12">
              <img 
                src={heroImage} 
                alt="Indoor infrared sauna" 
                className="w-full rounded-lg shadow-xl mb-8"
              />
              <p className="text-lg text-muted-foreground mb-6">
                Discover the benefits of infrared technology with our premium indoor infrared sauna installations. Perfect for home wellness spaces.
              </p>
            </div>

            <Card className="p-8 mb-16">
              <h2 className="text-3xl font-bold mb-4">What is Infrared Technology?</h2>
              <p className="text-muted-foreground">
                Infrared saunas use infrared heaters to emit radiant heat that is directly absorbed by the body, rather than heating the air. This allows for lower temperatures (120-150°F) while providing deep, penetrating warmth.
              </p>
            </Card>

            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-8">Benefits of Infrared Saunas</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <Card key={index} className="p-6">
                      <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </Card>
                  );
                })}
              </div>
              <Card className="p-6">
                <ul className="grid md:grid-cols-2 gap-3 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    Increased detoxification
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    Enhanced cardiovascular benefits
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    Improved muscle recovery
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    Better energy efficiency
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    Comfortable experience
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    Easier breathing
                  </li>
                </ul>
              </Card>
            </div>

            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-8">Our Infrared Solutions</h2>
              <div className="space-y-6">
                {infraredTypes.map((type, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                    <p className="text-muted-foreground">{type.description}</p>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="p-8 mb-16">
              <h2 className="text-3xl font-bold mb-6">Installation Options</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8 md:p-12 bg-primary text-primary-foreground">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Experience Infrared Technology?</h2>
                <p className="text-lg mb-6 text-primary-foreground/90">
                  Contact us today to learn how an infrared sauna can transform your wellness routine.
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

export default IndoorInfraredSauna;

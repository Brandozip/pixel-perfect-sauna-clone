import CleanNavbar from "@/components/navigation/CleanNavbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Phone } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { Link } from "react-router-dom";
import { ServiceSchema, BreadcrumbSchema } from "@/components/seo/ServiceSchema";
import { SocialMetaTags } from "@/components/seo/SocialMetaTags";
import heroImage from "@/assets/service-detail-hero.png";
import customerImage from "@/assets/testimonial-customer.png";

const benefits = [
  {
    title: "Certified Installation Team",
    description: "Our technicians are specifically trained and certified in steam shower installations, with extensive experience in both residential and commercial projects."
  },
  {
    title: "Complete Waterproofing",
    description: "We use industry-leading waterproofing systems and techniques to ensure your steam shower remains completely vapor-tight and leak-free."
  },
  {
    title: "Proper Steam Generator Setup",
    description: "Expert installation of your steam generator with correct sizing, placement, and connections for optimal performance and safety."
  },
  {
    title: "Precision Tile & Finish Work",
    description: "Meticulous attention to detail in all tile work and finishing, creating a beautiful and durable steam-ready environment."
  },
  {
    title: "Integrated Controls & Features",
    description: "Seamless integration of control systems, lighting, and optional features like aromatherapy dispensers or chromotherapy."
  },
  {
    title: "Thorough Testing & Training",
    description: "Complete system testing followed by a comprehensive orientation on operation, maintenance, and optimal usage of your new steam shower."
  }
];

const processSteps = [
  {
    number: 1,
    title: "Pre-Installation Preparation",
    description: "We prepare the installation area, ensuring proper substrate conditions and making any necessary structural modifications."
  },
  {
    number: 2,
    title: "Waterproofing & Vapor Barrier",
    description: "We install complete waterproofing and vapor barriers to contain steam and protect surrounding structures from moisture damage."
  },
  {
    number: 3,
    title: "Framing & Substrate Installation",
    description: "We construct or modify the shower enclosure with proper framing and substrate materials designed for high-moisture environments."
  },
  {
    number: 4,
    title: "Steam System Installation",
    description: "Our certified technicians install the steam generator, steam head, and all associated plumbing and electrical connections."
  },
  {
    number: 5,
    title: "Tile & Finish Work",
    description: "We complete all tile work with proper sloping for drainage and apply appropriate sealants for steam shower environments."
  },
  {
    number: 6,
    title: "Controls & Accessories Installation",
    description: "We install and connect control panels, lighting, ventilation, and any additional features like benches, aromatherapy systems, or audio components."
  },
  {
    number: 7,
    title: "Final Testing & Client Orientation",
    description: "We thoroughly test all systems and provide you with complete instructions on operation, maintenance, and best practices for enjoying your steam shower."
  }
];

const SteamShowerInstallation = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <SocialMetaTags
        title="Steam Shower Installation Services"
        description="Transform your bathroom into a spa-like retreat with professional steam shower installation. Commercial-grade generators, waterproof construction, and lifetime warranty."
        keywords={["steam shower installation", "steam room", "bathroom spa", "Atlanta steam shower", "home steam generator"]}
        image="https://www.saunasplus.com/og-steam-shower.jpg"
      />
      <ServiceSchema
        name="Steam Shower Installation"
        description="Transform your bathroom into a spa-like retreat with professional steam shower installation services."
        url="https://www.saunasplus.com/services/steam-shower-installation"
        serviceType="Bathroom Remodeling Service"
        areaServed={["Atlanta, GA", "Georgia", "Southeastern United States"]}
        additionalInfo={{
          features: [
            "Commercial-grade steam generators",
            "Waterproof construction",
            "Digital controls & aromatherapy",
            "Lifetime warranty on installation"
          ],
          priceRange: "Contact for quote"
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.saunasplus.com/" },
          { name: "Services", url: "https://www.saunasplus.com/services" },
          { name: "Steam Shower Installation", url: "https://www.saunasplus.com/services/steam-shower-installation" }
        ]}
      />
      <div className="min-h-screen">
        <CleanNavbar />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">Steam Shower Installation</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Professional steam shower installation by certified technicians
                </p>
                <p className="text-lg mb-8">
                  Our professional steam shower installation service ensures your new steam shower is expertly built and fully functional. Our team of specialized technicians handles every aspect of the installation process, from waterproofing and construction to steam generator installation and final testing, delivering a premium steam experience with minimal disruption to your home.
                </p>
                <Link to="/contact">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    Schedule a Free Consultation
                  </Button>
                </Link>
              </div>

              <div className="mb-16">
                <img 
                  src={heroImage} 
                  alt="Steam shower installation" 
                  className="w-full rounded-lg shadow-xl"
                />
              </div>

              <div className="mb-16">
                <h2 className="text-4xl font-bold mb-8">Key Benefits</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => (
                    <Card key={index} className="p-6">
                      <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-4xl font-bold mb-8">Our Installation Process</h2>
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

              <Card className="p-8 md:p-12 bg-accent/5 border-accent/20 mb-16">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Get your FREE consultation and discover how we can transform your space into a wellness sanctuary.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/contact">
                      <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        Get FREE Consultation
                      </Button>
                    </Link>
                    <a href="tel:+16782459966">
                      <Button size="lg" variant="outline">
                        <Phone className="mr-2 h-5 w-5" /> Call (678) 245-9966
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-8 mb-16">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <img 
                    src={customerImage} 
                    alt="Customer testimonial" 
                    className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <p className="text-lg italic text-muted-foreground mb-4">
                      "The installation team was extremely professional and knowledgeable. They took great care to ensure everything was properly waterproofed and the steam generator was perfectly sized for our space. Our new steam shower works flawlessly and has become our favorite feature in our home!"
                    </p>
                    <div className="font-bold">David & Emily Chen</div>
                    <div className="text-sm text-muted-foreground">San Francisco, CA</div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 md:p-12 bg-primary text-primary-foreground">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Space Into a Wellness Sanctuary?</h2>
                  <p className="text-lg mb-6 text-primary-foreground/90">
                    Get your FREE consultation today and discover how we can bring the luxury and health benefits of a custom steam shower to your home or business.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                    <Link to="/contact">
                      <Button size="lg" variant="secondary">
                        Get FREE Consultation
                      </Button>
                    </Link>
                    <a href="tel:+16782459966">
                      <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                        <Phone className="mr-2 h-5 w-5" /> Call (678) 245-9966
                      </Button>
                    </a>
                  </div>
                  <div className="flex flex-wrap justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Licensed & Insured</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>20+ Years Experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Free Estimates</span>
                    </div>
                  </div>
                  <p className="mt-6 text-primary-foreground/90">
                    Join 500+ satisfied customers who transformed their wellness journey
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default SteamShowerInstallation;

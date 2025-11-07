import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Phone } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { Link } from "react-router-dom";
import heroImage from "@/assets/service-detail-hero.png";
import customerImage from "@/assets/testimonial-customer.png";
import gallery1 from "@/assets/testimonial-nick.png";
import gallery2 from "@/assets/outdoor-sauna.png";
import gallery3 from "@/assets/gallery-3.png";
import gallery4 from "@/assets/gallery-4.png";
import gallery5 from "@/assets/service-detail-hero.png";

const benefits = [
  {
    title: "Quick Installation",
    description: "Pre-engineered kits significantly reduce installation time compared to custom builds, getting you enjoying your sauna faster."
  },
  {
    title: "Quality Construction",
    description: "Our outdoor kits feature thick insulation, weather-resistant exteriors, and premium interior woods for durability and performance."
  },
  {
    title: "Multiple Size Options",
    description: "Choose from various sizes to accommodate different user capacities and available outdoor space."
  },
  {
    title: "Heating System Choices",
    description: "Select from traditional electric, wood-burning, or infrared heating options based on your preferences and available utilities."
  },
  {
    title: "Minimal Site Preparation",
    description: "Most kits require only a level surface and basic utility connections, simplifying the installation process."
  },
  {
    title: "Attractive Designs",
    description: "Aesthetically pleasing structures that enhance your outdoor living space and add value to your property."
  }
];

const processSteps = [
  {
    number: 1,
    title: "Kit Selection Consultation",
    description: "We help you select the right kit based on your space, budget, and wellness goals, explaining all available options and features."
  },
  {
    number: 2,
    title: "Site Planning",
    description: "Our team assists with determining the optimal location on your property, considering factors like privacy, utilities access, and landscaping."
  },
  {
    number: 3,
    title: "Foundation Preparation",
    description: "We provide guidance on preparing a proper foundation, whether concrete pad, pavers, or crushed stone base, depending on your specific kit."
  },
  {
    number: 4,
    title: "Delivery Coordination",
    description: "We coordinate the delivery of your sauna kit to ensure smooth arrival and placement at your prepared site."
  },
  {
    number: 5,
    title: "Optional Professional Assembly",
    description: "While many kits are designed for DIY assembly, we offer professional assembly services to ensure perfect installation."
  },
  {
    number: 6,
    title: "Utility Connections",
    description: "Our technicians can connect your sauna to necessary utilities like electricity or water, ensuring everything is properly installed and code-compliant."
  },
  {
    number: 7,
    title: "Final Inspection & Orientation",
    description: "We perform a thorough inspection and provide complete instructions on operation, maintenance, and sauna best practices."
  }
];

const OutdoorSaunaKits = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen">
        <Navigation />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">Outdoor Sauna Kits</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Premium pre-built outdoor sauna solutions for your backyard or garden space
                </p>
                <p className="text-lg mb-8">
                  Our outdoor sauna kits provide a convenient and cost-effective way to add a premium sauna experience to your property. These carefully designed, pre-built structures combine quality craftsmanship with simplified installation, allowing you to transform your outdoor space into a wellness retreat with minimal effort and maximum enjoyment.
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
                  alt="Outdoor sauna kit" 
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
                <h2 className="text-4xl font-bold mb-8">Our Outdoor Sauna Kit Process</h2>
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
                      "The outdoor barrel sauna kit we purchased has become the highlight of our backyard. The quality of materials is excellent, and with the help of the Saunas Plus team for the electrical hookup, the whole process was surprisingly easy. Now we enjoy sauna sessions under the stars year-round!"
                    </p>
                    <div className="font-bold">Chris & Abigail Turner</div>
                    <div className="text-sm text-muted-foreground">Minneapolis, MN</div>
                  </div>
                </div>
              </Card>

              <div className="mb-16">
                <h2 className="text-4xl font-bold mb-8 text-center">Our Work</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[gallery1, gallery2, gallery3, gallery4, gallery5].map((img, index) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-lg">
                      <img 
                        src={img} 
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Link to="/gallery">
                    <Button variant="outline" size="lg">View Full Gallery</Button>
                  </Link>
                </div>
              </div>

              <Card className="p-8 md:p-12 bg-primary text-primary-foreground">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Space Into a Wellness Sanctuary?</h2>
                  <p className="text-lg mb-6 text-primary-foreground/90">
                    Get your FREE consultation today and discover how we can bring the luxury and health benefits of an outdoor sauna to your home.
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

export default OutdoorSaunaKits;

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
    title: "Custom-Sized Solutions",
    description: "We build saunas that maximize your available space while ensuring proper proportions for optimal heat distribution and comfort."
  },
  {
    title: "Premium Material Selection",
    description: "Choose from a variety of high-quality woods like Canadian Hemlock, Western Red Cedar, or Nordic White Spruce for beautiful aesthetics and longevity."
  },
  {
    title: "Heating Options",
    description: "Select from traditional electric, wood-burning, or infrared heating systems based on your preferences and available utilities."
  },
  {
    title: "Integrated Home Design",
    description: "Your sauna will be designed to complement your home's architecture and interior design for a cohesive look."
  },
  {
    title: "Energy-Efficient Construction",
    description: "We incorporate proper insulation and sealing techniques to minimize heat loss and optimize energy usage."
  },
  {
    title: "Value-Adding Home Feature",
    description: "A professionally built sauna increases your property value while providing years of health benefits and relaxation."
  }
];

const processSteps = [
  {
    number: 1,
    title: "Initial Consultation",
    description: "We discuss your vision, space options, preferences, and budget to determine the best sauna solution for your home."
  },
  {
    number: 2,
    title: "Site Evaluation",
    description: "Our team evaluates potential locations in your home, considering factors like available space, access to utilities, ventilation requirements, and structural considerations."
  },
  {
    number: 3,
    title: "Design Development",
    description: "We create detailed designs for your sauna, including layout, bench configuration, material selections, and heating system specifications."
  },
  {
    number: 4,
    title: "Material & Equipment Selection",
    description: "We help you select the perfect wood, heater type, and accessories to match your wellness goals and aesthetic preferences."
  },
  {
    number: 5,
    title: "Construction & Installation",
    description: "Our skilled craftsmen build your sauna with meticulous attention to detail, ensuring proper insulation, ventilation, and electrical safety."
  },
  {
    number: 6,
    title: "Final Inspection & Orientation",
    description: "We thoroughly test all systems and provide a comprehensive orientation on operation, maintenance, and sauna best practices."
  }
];

const ResidentialSaunaBuilds = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen">
        <Navigation />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">Residential Sauna Builds</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Custom residential sauna construction for homes of all sizes
                </p>
                <p className="text-lg mb-8">
                  Our residential sauna building service creates premium, custom saunas perfectly tailored to your home. Whether you're looking to add a sauna to your basement, convert an existing space, or build a standalone structure in your backyard, our team delivers beautifully crafted saunas that enhance your property value while providing exceptional wellness benefits for you and your family.
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
                  alt="Residential sauna build" 
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
                <h2 className="text-4xl font-bold mb-8">Our Residential Build Process</h2>
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
                      "From design to completion, the team at Saunas Plus exceeded our expectations. They transformed an unused corner of our basement into a stunning cedar sauna that our entire family enjoys several times a week. The craftsmanship is exceptional, and they were respectful of our home throughout the construction process."
                    </p>
                    <div className="font-bold">The Wilson Family</div>
                    <div className="text-sm text-muted-foreground">Denver, CO</div>
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
                    Get your FREE consultation today and discover how we can bring the luxury and health benefits of a custom sauna to your home or business.
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

export default ResidentialSaunaBuilds;

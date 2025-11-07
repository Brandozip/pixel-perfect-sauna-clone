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
    title: "Fully Customized Designs",
    description: "Every aspect of your sauna is tailored to your preferences, from wood selection and bench configuration to lighting and heater options."
  },
  {
    title: "Expert Space Planning",
    description: "We analyze your available space to create the optimal sauna layout, maximizing the usable area while ensuring proper proportions."
  },
  {
    title: "Architectural Integration",
    description: "Your sauna will be designed to complement your existing architecture and interior design, creating a cohesive look."
  },
  {
    title: "Material Selection",
    description: "We help you choose from premium sauna woods and materials that match your aesthetic preferences and performance requirements."
  },
  {
    title: "Energy Efficiency",
    description: "Our designs incorporate energy-efficient features to minimize operating costs while maintaining optimal sauna performance."
  },
  {
    title: "Future-Proof Planning",
    description: "We design with longevity in mind, considering maintenance access, component upgradability, and potential future enhancements."
  }
];

const processSteps = [
  {
    number: 1,
    title: "Initial Consultation",
    description: "We begin by discussing your wellness goals, space constraints, design preferences, and budget considerations."
  },
  {
    number: 2,
    title: "Site Assessment",
    description: "Our team evaluates your space, taking precise measurements and noting any technical considerations such as ventilation, electrical access, and structural requirements."
  },
  {
    number: 3,
    title: "Concept Development",
    description: "We create preliminary designs that visualize your sauna, including layout options, material selections, and feature recommendations."
  },
  {
    number: 4,
    title: "Design Refinement",
    description: "Based on your feedback, we refine the design, incorporating any desired changes and providing detailed specifications."
  },
  {
    number: 5,
    title: "Final Design & Proposal",
    description: "We present the final design along with a comprehensive proposal outlining costs, timeline, and implementation details."
  }
];

const CustomSaunaDesign = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen">
        <Navigation />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">Custom Sauna Design</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Personalized sauna design services tailored to your space and wellness goals
                </p>
                <p className="text-lg mb-8">
                  Our custom sauna design service creates the perfect wellness space for your home or business. We work closely with you to understand your needs, preferences, and space constraints, developing a sauna solution that integrates seamlessly with your environment while delivering maximum wellness benefits.
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
                  alt="Custom sauna design" 
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
                <h2 className="text-4xl font-bold mb-8">Our Design Process</h2>
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
                      "The design team at Saunas Plus was exceptional. They transformed an awkward corner of our basement into a stunning Finnish sauna that feels like it was always meant to be there. Their attention to detail and understanding of our aesthetic preferences exceeded our expectations."
                    </p>
                    <div className="font-bold">Robert & Jennifer Adams</div>
                    <div className="text-sm text-muted-foreground">Seattle, WA</div>
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

export default CustomSaunaDesign;

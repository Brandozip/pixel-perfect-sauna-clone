import CleanNavbar from "@/components/navigation/CleanNavbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Phone, Clock, Zap, Shield } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { Link } from "react-router-dom";
import heroImage from "@/assets/custom-sauna-design.png";

const benefits = [
  {
    icon: Clock,
    title: "Expedited Timeline",
    description: "From consultation to installation in 2-3 weeks instead of typical 6-8 weeks."
  },
  {
    icon: Zap,
    title: "Priority Scheduling",
    description: "Jump ahead in our installation queue with priority service."
  },
  {
    icon: Shield,
    title: "Same Premium Quality",
    description: "No compromise on materials or craftsmanship—just faster service."
  }
];

const process = [
  {
    week: "Week 1",
    title: "Design & Planning",
    description: "Initial consultation, design finalization, and material selection completed in 3-5 days."
  },
  {
    week: "Week 2",
    title: "Material Procurement",
    description: "All materials ordered, received, and staged for installation."
  },
  {
    week: "Week 3",
    title: "Installation",
    description: "Professional installation completed in 2-4 days depending on project scope."
  }
];

const comparison = [
  {
    type: "Standard Service",
    features: [
      "6-8 week timeline",
      "Regular scheduling",
      "Standard communication",
      "Great value"
    ]
  },
  {
    type: "Fast-Track Service",
    features: [
      "2-3 week timeline",
      "Priority scheduling",
      "Dedicated manager",
      "Premium service"
    ]
  }
];

const FastTrackLanding = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen">
        <CleanNavbar />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Fast-Track Your Wellness Journey</h1>
            <p className="text-xl text-muted-foreground mb-12">
              Get Your Custom Sauna Installed in Record Time
            </p>
            
            <Card className="p-8 mb-12 border-l-4 border-l-accent bg-accent/5">
              <p className="text-lg font-semibold mb-2">Limited Availability</p>
              <p className="text-muted-foreground">
                Express service for those who want premium quality without the wait. Limited availability for fast-track installation slots.
              </p>
            </Card>

            <div className="mb-16">
              <img 
                src={heroImage} 
                alt="Fast-track sauna installation" 
                className="w-full rounded-lg shadow-xl mb-8"
              />
            </div>

            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-8">Why Fast-Track?</h2>
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
                <ul className="grid md:grid-cols-2 gap-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>Dedicated Project Manager</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>Express Material Sourcing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>Guaranteed Completion Date</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>Penalty-Backed Guarantee</span>
                  </li>
                </ul>
              </Card>
            </div>

            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-8">How It Works</h2>
              <div className="space-y-6">
                {process.map((step, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-20 h-12 rounded-lg bg-accent text-accent-foreground flex items-center justify-center font-bold">
                        {step.week}
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
              <h2 className="text-4xl font-bold mb-8">Fast-Track Comparison</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {comparison.map((service, index) => (
                  <Card key={index} className={`p-6 ${index === 1 ? 'border-accent border-2' : ''}`}>
                    <h3 className="text-2xl font-bold mb-4">{service.type}</h3>
                    <ul className="space-y-3">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="p-8 mb-16 border-l-4 border-l-amber-500">
              <h3 className="text-2xl font-bold mb-4">Limited Availability</h3>
              <p className="text-muted-foreground mb-4">
                We maintain quality by limiting fast-track slots to 2-3 per month. Don't miss your opportunity.
              </p>
              <p className="text-sm text-muted-foreground">
                Fast-track service includes 15% premium for expedited materials and priority scheduling. All installations include our standard comprehensive warranty.
              </p>
            </Card>

            <Card className="p-8 md:p-12 bg-primary text-primary-foreground">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Reserve Your Fast-Track Slot Today</h2>
                <p className="text-lg mb-6 text-primary-foreground/90">
                  Contact us immediately to secure one of our limited fast-track installation slots.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                  <Link to="/contact">
                    <Button size="lg" variant="secondary">
                      Reserve Your Slot
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
                    <span>Limited Availability</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Premium Service</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Guaranteed Timeline</span>
                  </div>
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

export default FastTrackLanding;

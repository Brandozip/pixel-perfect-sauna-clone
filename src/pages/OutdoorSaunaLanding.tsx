import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Phone, Award, Shield, Users } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { Link } from "react-router-dom";
import heroImage from "@/assets/outdoor-sauna.png";
import outdoorImage2 from "@/assets/hero-sauna.jpg";

const benefits = [
  {
    icon: Award,
    title: "Custom Designs",
    description: "Tailored to your outdoor space, style preferences, and wellness requirements."
  },
  {
    icon: Shield,
    title: "Weather-Resistant Materials",
    description: "Premium construction designed to withstand the elements year-round."
  },
  {
    icon: Users,
    title: "Expert Installation",
    description: "Professional installation ensuring your sauna is built to last decades."
  }
];

const process = [
  {
    number: 1,
    title: "Free Consultation",
    description: "We assess your outdoor space and discuss your vision and requirements."
  },
  {
    number: 2,
    title: "Custom Design",
    description: "Our team creates a personalized sauna design that fits your space perfectly."
  },
  {
    number: 3,
    title: "Professional Installation",
    description: "Expert installation ensuring your outdoor sauna is built to perfection."
  },
  {
    number: 4,
    title: "Enjoy & Maintain",
    description: "Relax in your new outdoor retreat with our ongoing support."
  }
];

const OutdoorSaunaLanding = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen">
        <Navigation />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Transform Your Backyard with a Custom Outdoor Sauna</h1>
            <p className="text-xl text-muted-foreground mb-12">
              Professional Design and Installation Services
            </p>
            
            <div className="mb-12">
              <img 
                src={heroImage} 
                alt="Custom outdoor sauna" 
                className="w-full rounded-lg shadow-xl mb-6"
              />
              <p className="text-lg text-muted-foreground">
                Premium outdoor saunas that enhance your property and wellness lifestyle. Expert craftsmanship with 15+ years of experience.
              </p>
            </div>

            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-8">Why Choose Our Outdoor Sauna Services?</h2>
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
                    <span>Comprehensive Warranty</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>Ongoing Support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>Property Value Increase</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>15+ Years Experience</span>
                  </li>
                </ul>
              </Card>
            </div>

            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-8">Our Simple 4-Step Process</h2>
              <div className="space-y-6">
                {process.map((step, index) => (
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
              <h2 className="text-4xl font-bold mb-8">Featured Projects</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <img src={heroImage} alt="Outdoor sauna project" className="w-full rounded-lg shadow-lg" />
                <img src={outdoorImage2} alt="Outdoor sauna project" className="w-full rounded-lg shadow-lg" />
              </div>
            </div>

            <Card className="p-8 mb-16 border-l-4 border-l-accent">
              <h3 className="text-2xl font-bold mb-4">Customer Testimonial</h3>
              <p className="text-lg italic text-muted-foreground mb-4">
                "The team at Saunas Plus created the most beautiful outdoor sauna for our backyard. The craftsmanship is exceptional, and it's become our favorite place to unwind after long days. Worth every penny!"
              </p>
              <div className="font-bold">David & Lisa Johnson</div>
              <div className="text-sm text-muted-foreground">Atlanta, GA</div>
            </Card>

            <Card className="p-8 md:p-12 bg-primary text-primary-foreground">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Create Your Outdoor Wellness Retreat?</h2>
                <p className="text-lg mb-6 text-primary-foreground/90">
                  Contact us today for a free consultation and quote.
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
                    <span>15+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Free Estimates</span>
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

export default OutdoorSaunaLanding;

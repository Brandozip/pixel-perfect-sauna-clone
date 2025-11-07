import CleanNavbar from "@/components/navigation/CleanNavbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { Link } from "react-router-dom";
import customSaunaDesign from "@/assets/custom-sauna-design.png";
import steamShower from "@/assets/steam-shower.png";
import residentialSauna from "@/assets/residential-sauna.png";
import outdoorSauna from "@/assets/outdoor-sauna.png";

const services = [
  {
    title: "Custom Sauna Design",
    description: "Personalized designs that blend seamlessly with your space and lifestyle. Our design team works closely with you to create a sauna that perfectly fits your vision, whether it's a modern minimalist retreat or a traditional Finnish experience.",
    image: customSaunaDesign,
    link: "/services/custom-sauna-design",
    features: [
      "3D design visualization",
      "Material selection consultation",
      "Space optimization",
      "Custom wood species options"
    ]
  },
  {
    title: "Steam Shower Installation",
    description: "Transform your bathroom into a spa-like retreat with our professional steam shower solutions. Experience the therapeutic benefits of steam therapy in the comfort of your own home.",
    image: steamShower,
    link: "/services/steam-shower-installation",
    features: [
      "Commercial-grade steam generators",
      "Waterproof construction",
      "Digital controls & aromatherapy",
      "Lifetime warranty on installation"
    ]
  },
  {
    title: "Residential Sauna Builds",
    description: "Complete home sauna design and installation for the ultimate wellness sanctuary. From basement conversions to dedicated sauna rooms, we handle every aspect of your project.",
    image: residentialSauna,
    link: "/services/residential-sauna-builds",
    features: [
      "Full electrical integration",
      "Ventilation systems",
      "Premium heater installation",
      "Complete finishing work"
    ]
  },
  {
    title: "Outdoor Sauna Kits",
    description: "Pre-built sauna kits designed for easy installation in your backyard or garden. Enjoy the authentic outdoor sauna experience with our weather-resistant, premium quality kits.",
    image: outdoorSauna,
    link: "/services/outdoor-sauna-kits",
    features: [
      "Weather-resistant construction",
      "Pre-fabricated components",
      "Installation support",
      "Multiple size options"
    ]
  }
];

const Services = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen">
        <CleanNavbar />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Premium Sauna Services</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive sauna solutions tailored to your needs and preferences. From custom designs to complete installations, we deliver excellence in every project.
              </p>
            </div>
            
            <div className="space-y-16">
              {services.map((service, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                    <div className={`aspect-[4/3] ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <h2 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h2>
                      <p className="text-lg text-muted-foreground mb-6">{service.description}</p>
                      <ul className="space-y-3 mb-6">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <a href={service.link}>
                        <Button className="bg-primary hover:bg-primary-emphasis text-primary-foreground w-fit">
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-16">
              <h2 className="heading-2 mb-4">Ready to Get Started?</h2>
              <p className="body-lg text-muted-foreground mb-8">
                Contact us today for a free consultation and quote
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary-emphasis text-primary-foreground">
                  Get Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Services;

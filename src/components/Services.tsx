import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import customSaunaDesign from "@/assets/custom-sauna-design.png";
import steamShower from "@/assets/steam-shower.png";
import residentialSauna from "@/assets/residential-sauna.png";
import outdoorSauna from "@/assets/outdoor-sauna.png";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Custom Sauna Design",
    description: "Personalized designs that blend seamlessly with your space and lifestyle.",
    image: customSaunaDesign,
    link: "/services/custom-sauna-design"
  },
  {
    title: "Steam Shower Installation",
    description: "Transform your bathroom into a spa-like retreat with our steam shower solutions.",
    image: steamShower,
    link: "/services/steam-shower-installation"
  },
  {
    title: "Residential Sauna Builds",
    description: "Complete home sauna design and installation for the ultimate wellness sanctuary.",
    image: residentialSauna,
    link: "/services/residential-sauna-builds"
  },
  {
    title: "Outdoor Sauna Kits",
    description: "Pre-built sauna kits designed for easy installation in your backyard or garden.",
    image: outdoorSauna,
    link: "/services/outdoor-sauna-kits"
  }
];

export const Services = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Premium Sauna Services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From custom designs to complete installations, we provide comprehensive sauna solutions tailored to your needs and preferences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Button variant="link" className="text-accent hover:text-accent/90 p-0 h-auto">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/services">
            <Button variant="outline" size="lg" className="text-lg">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

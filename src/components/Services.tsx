import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import customSaunaImage from "@/assets/custom-sauna-design.png";
import steamShowerImage from "@/assets/steam-shower.png";
import residentialSaunaImage from "@/assets/residential-sauna.png";
import outdoorSaunaImage from "@/assets/outdoor-sauna.png";

const services = [
  {
    title: "Custom Sauna Design",
    description: "Personalized designs that blend seamlessly with your space and lifestyle.",
    image: customSaunaImage,
    link: "/services/custom-sauna-design"
  },
  {
    title: "Steam Shower Installation",
    description: "Transform your bathroom into a spa-like retreat with our steam shower solutions.",
    image: steamShowerImage,
    link: "/services/steam-shower-installation"
  },
  {
    title: "Residential Sauna Builds",
    description: "Complete home sauna design and installation for the ultimate wellness sanctuary.",
    image: residentialSaunaImage,
    link: "/services/residential-sauna-builds"
  },
  {
    title: "Outdoor Sauna Kits",
    description: "Pre-built sauna kits designed for easy installation in your backyard or garden.",
    image: outdoorSaunaImage,
    link: "/services/outdoor-sauna-kits"
  }
];

export const Services = () => {
  return (
    <section className="py-20 bg-primary-muted">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Our Premium Sauna Services</h2>
          <p className="body-lg text-muted-foreground max-w-3xl mx-auto">
            From custom designs to complete installations, we provide comprehensive sauna solutions tailored to your needs and preferences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {services.map((service, index) => (
            <Card key={index} className="card-elevated overflow-hidden group">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="card-content">
                <h3 className="heading-4 mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Link to={service.link}>
                  <Button variant="link" className="text-primary hover:text-primary-emphasis p-0 h-auto font-semibold">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/services">
            <Button variant="outline" size="lg" className="text-lg border-2">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

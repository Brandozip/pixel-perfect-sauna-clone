import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "next-themes";
import customSaunaDesign from "@/assets/custom-sauna-design.png";
import steamShower from "@/assets/steam-shower.png";
import residentialSauna from "@/assets/residential-sauna.png";
import outdoorSauna from "@/assets/outdoor-sauna.png";
import heroSauna from "@/assets/hero-sauna.jpg";
import luxurySauna from "@/assets/luxury-sauna.jpg";

const projects = [
  {
    title: "Modern Basement Sauna",
    location: "Buckhead, Atlanta",
    description: "Custom-built traditional Finnish sauna with LED lighting and premium cedar construction.",
    image: customSaunaDesign,
    category: "Residential"
  },
  {
    title: "Luxury Steam Shower",
    location: "Midtown, Atlanta",
    description: "Spa-grade steam shower installation with aromatherapy and chromotherapy features.",
    image: steamShower,
    category: "Steam Room"
  },
  {
    title: "Home Wellness Suite",
    location: "Brookhaven",
    description: "Complete home sauna transformation with custom wood paneling and state-of-the-art heating.",
    image: residentialSauna,
    category: "Residential"
  },
  {
    title: "Backyard Retreat",
    location: "Roswell",
    description: "Outdoor sauna installation featuring panoramic windows and natural wood finishes.",
    image: outdoorSauna,
    category: "Outdoor"
  },
  {
    title: "Contemporary Sauna Design",
    location: "Sandy Springs",
    description: "Minimalist sauna design with integrated bench lighting and premium materials.",
    image: heroSauna,
    category: "Residential"
  },
  {
    title: "Luxury Home Spa",
    location: "Dunwoody",
    description: "High-end residential sauna with glass doors and modern aesthetic.",
    image: luxurySauna,
    category: "Residential"
  }
];

const Gallery = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen">
        <Navigation />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Project Gallery</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore our portfolio of custom sauna installations across Atlanta. Each project showcases our commitment to quality craftsmanship and attention to detail.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card key={index} className="overflow-hidden group hover:shadow-xl transition-shadow">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-3">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{project.location}</p>
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-16">
              <h2 className="text-3xl font-bold mb-4">Ready to Create Your Own Wellness Sanctuary?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let us bring your vision to life with a custom sauna designed specifically for your space and needs.
              </p>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Start Your Project
              </Button>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Gallery;

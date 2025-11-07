import CleanNavbar from "@/components/navigation/CleanNavbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Dumbbell, Sparkles, Hotel, Heart, CheckCircle2, Phone } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { Link } from "react-router-dom";
import gallery1 from "@/assets/gallery-4.png";
import gallery2 from "@/assets/service-detail-hero.png";

const applications = [
  {
    icon: Dumbbell,
    title: "Fitness Centers & Gyms",
    features: [
      "Member amenity upgrades",
      "Multiple sauna rooms",
      "High-traffic designs",
      "Durable construction",
      "Energy-efficient systems"
    ]
  },
  {
    icon: Sparkles,
    title: "Spas & Wellness Centers",
    features: [
      "Luxury spa experiences",
      "Multiple treatment rooms",
      "Custom aesthetics",
      "Premium materials",
      "Integrated services"
    ]
  },
  {
    icon: Hotel,
    title: "Hotels & Resorts",
    features: [
      "Guest amenities",
      "Rooftop installations",
      "Pool and spa areas",
      "Brand-aligned designs",
      "High-end finishes"
    ]
  },
  {
    icon: Building2,
    title: "Corporate Wellness Centers",
    features: [
      "Employee wellness programs",
      "Modern designs",
      "Efficient space utilization",
      "Professional aesthetics",
      "Low maintenance"
    ]
  },
  {
    icon: Heart,
    title: "Medical & Rehabilitation Facilities",
    features: [
      "Therapeutic applications",
      "ADA compliance",
      "Safety features",
      "Clinical designs",
      "Specialized requirements"
    ]
  }
];

const CommercialProjects = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen">
        <CleanNavbar />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Commercial Sauna Projects</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Large-Scale Commercial Solutions: Professional commercial sauna installations for gyms, spas, hotels, and wellness centers. Expert project management from design through completion.
              </p>
            </div>

            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-8 text-center">Commercial Applications</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {applications.map((app, index) => {
                  const Icon = app.icon;
                  return (
                    <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold">{app.title}</h3>
                      </div>
                      <ul className="space-y-2">
                        {app.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  );
                })}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
              <Card className="p-8">
                <h2 className="text-3xl font-bold mb-6">Commercial Features</h2>
                <ul className="space-y-3">
                  {[
                    "Heavy-duty construction",
                    "Commercial-grade heaters",
                    "ADA compliant options",
                    "Multiple capacity options",
                    "Durable materials",
                    "Easy maintenance",
                    "Safety features",
                    "Code compliance",
                    "Warranty coverage"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-8">
                <h2 className="text-3xl font-bold mb-6">Project Management</h2>
                <ul className="space-y-3">
                  {[
                    "Comprehensive planning",
                    "Licensed contractors",
                    "Permit handling",
                    "Timeline management",
                    "Budget control",
                    "Quality assurance",
                    "Final inspections",
                    "Staff training"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <Card className="p-8 md:p-12 mb-16 max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Commercial Advantages</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Attract and retain members/guests",
                  "Differentiate your facility",
                  "Generate additional revenue",
                  "Enhance brand reputation",
                  "Provide health benefits",
                  "Low operating costs",
                  "Long-term investment"
                ].map((advantage, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{advantage}</span>
                  </div>
                ))}
              </div>
            </Card>

            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-8 text-center">Gallery</h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <img src={gallery1} alt="Commercial Project 1" className="w-full rounded-lg shadow-xl" />
                <img src={gallery2} alt="Commercial Project 2" className="w-full rounded-lg shadow-xl" />
              </div>
            </div>

            <Card className="p-8 md:p-12 bg-primary text-primary-foreground max-w-4xl mx-auto">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Ready for Your Commercial Project?</h2>
                <p className="text-lg mb-6 text-primary-foreground/90">
                  Contact us today to discuss your commercial sauna installation needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button size="lg" variant="secondary">
                      Get Free Consultation
                    </Button>
                  </Link>
                  <a href="tel:+16782459966">
                    <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                      <Phone className="mr-2 h-5 w-5" /> Call (678) 245-9966
                    </Button>
                  </a>
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

export default CommercialProjects;

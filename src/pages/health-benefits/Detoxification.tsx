import CleanNavbar from "@/components/navigation/CleanNavbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplets, Sparkles, Shield, Activity, Phone } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: Droplets,
    title: "Enhanced Detoxification",
    description: "Sauna-induced sweating helps eliminate toxins, heavy metals, and other harmful substances through the skin."
  },
  {
    icon: Sparkles,
    title: "Improved Skin Appearance",
    description: "Increased circulation delivers more nutrients to skin cells, promoting a healthy, radiant complexion."
  },
  {
    icon: Activity,
    title: "Deep Pore Cleansing",
    description: "Intense sweating opens and cleanses pores, removing dirt, oil, and dead skin cells."
  },
  {
    icon: Shield,
    title: "Increased Collagen Production",
    description: "Heat exposure can stimulate collagen synthesis, improving skin elasticity and reducing signs of aging."
  },
  {
    icon: Sparkles,
    title: "Reduced Acne",
    description: "Regular sauna use may help reduce acne by unclogging pores and reducing bacteria on the skin."
  },
  {
    icon: Activity,
    title: "Enhanced Circulation",
    description: "Improved blood flow to the skin delivers oxygen and nutrients while removing waste products."
  }
];

const Detoxification = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen">
        <CleanNavbar />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Detoxification & Skin Health Benefits</h1>
            <p className="text-xl text-muted-foreground mb-12">
              Deep Cleansing Through Heat
            </p>
            
            <div className="mb-12">
              <p className="text-lg text-muted-foreground">
                Regular sauna use promotes detoxification and improves skin health through deep sweating and enhanced circulation.
              </p>
            </div>

            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-8">Key Benefits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <Card key={index} className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                          <p className="text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            <Card className="p-8 mb-16">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  When exposed to sauna heat, your body's core temperature rises, triggering an intense sweating response. This sweating process helps eliminate various toxins including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Heavy metals (lead, mercury, cadmium)</li>
                  <li>BPA and other plastics</li>
                  <li>PCBs and other chemicals</li>
                  <li>Alcohol and nicotine metabolites</li>
                </ul>
                <p>
                  The increased circulation brings fresh, oxygenated blood to skin cells, delivering nutrients and removing metabolic waste. This enhanced blood flow gives skin a healthy glow and supports natural healing processes.
                </p>
              </div>
            </Card>

            <Card className="p-8 mb-16">
              <h2 className="text-3xl font-bold mb-4">Scientific Evidence</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Research published in the Journal of Environmental and Public Health found that sweating can eliminate significant amounts of toxic heavy metals from the body.
                </p>
                <p>
                  Studies in the Archives of Environmental Contamination and Toxicology demonstrated that certain toxins are more efficiently eliminated through sweat than through urine.
                </p>
              </div>
            </Card>

            <Card className="p-8 mb-16">
              <h2 className="text-3xl font-bold mb-4">Best Practices</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Stay hydrated before, during, and after sessions</li>
                <li>Cleanse skin before sauna use</li>
                <li>Shower after to rinse away eliminated toxins</li>
                <li>Use 2-3 times per week for optimal benefits</li>
                <li>Moisturize skin after sessions</li>
              </ul>
            </Card>

            <Card className="p-8 md:p-12 bg-primary text-primary-foreground">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Support Your Body's Natural Detox</h2>
                <p className="text-lg mb-6 text-primary-foreground/90">
                  Contact us today to learn how a custom sauna can enhance your detoxification and skin health.
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

export default Detoxification;

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Activity, Heart, Zap, Phone } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: Activity,
    title: "Increased White Blood Cell Production",
    description: "Heat stress triggers increases in lymphocytes, neutrophils, and basophils, strengthening immune response."
  },
  {
    icon: Zap,
    title: "Enhanced Lymphatic Circulation",
    description: "Heat exposure stimulates lymphatic flow, helping remove toxins and pathogens from tissues."
  },
  {
    icon: Shield,
    title: "Heat Shock Protein Production",
    description: "Sauna sessions activate proteins that repair damaged cells and enhance immune function."
  },
  {
    icon: Heart,
    title: "Reduced Stress Hormone Production",
    description: "Regular use helps lower cortisol that can suppress immune function when chronically elevated."
  },
  {
    icon: Activity,
    title: "Improved Mucous Membrane Function",
    description: "Heat and steam enhance protective function of respiratory tract mucous membranes."
  },
  {
    icon: Shield,
    title: "Fever-Like Immune Stimulation",
    description: "Elevated body temperature mimics fever, activating immune responses and inhibiting pathogen replication."
  }
];

const ImmuneSystem = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen">
        <Navigation />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Immune System Boosting Benefits</h1>
            <p className="text-xl text-muted-foreground mb-12">
              Strengthen Your Body's Natural Defenses
            </p>
            
            <div className="mb-12">
              <p className="text-lg text-muted-foreground">
                Regular sauna bathing supports immune function through increased white blood cell production, improved lymphatic circulation, and heat shock protein activation.
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
                  When exposed to sauna heat, your body interprets it as mild stress, activating immune responses without damaging effects of chronic stress.
                </p>
                <p>
                  Core body temperature rises to about 38-39°C (100.4-102.2°F), similar to mild fever. This hyperthermia stimulates white blood cells and enhances their activity.
                </p>
                <p>
                  Heat induces heat shock proteins that repair damaged proteins, protect immune cells, and enhance innate and adaptive immunity.
                </p>
                <p>
                  Increased sweating helps eliminate toxins that burden the immune system, while improved circulation delivers immune cells efficiently throughout the body.
                </p>
              </div>
            </Card>

            <Card className="p-8 mb-16">
              <h2 className="text-3xl font-bold mb-4">Scientific Evidence</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  A Finnish study of 2,210 men found those using saunas 2-3 times per week had 27% lower risk of pneumonia.
                </p>
                <p>
                  Research showed regular sauna bathing increased white blood cell production, suggesting enhanced immune vigilance.
                </p>
                <p>
                  Studies demonstrated heat stress triggered HSP production, playing key roles in immune regulation and infection protection.
                </p>
              </div>
            </Card>

            <Card className="p-8 mb-16">
              <h2 className="text-3xl font-bold mb-4">Best Practices</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>2-4 sessions per week</li>
                <li>15-20 minutes per session</li>
                <li>Stay well hydrated</li>
                <li>Avoid if actively sick with fever</li>
                <li>Regular consistent use</li>
                <li>Combine with healthy lifestyle</li>
              </ul>
            </Card>

            <Card className="p-8 md:p-12 bg-primary text-primary-foreground">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Strengthen Your Immune System</h2>
                <p className="text-lg mb-6 text-primary-foreground/90">
                  Contact us today to learn how a custom sauna can support your immune health.
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

export default ImmuneSystem;

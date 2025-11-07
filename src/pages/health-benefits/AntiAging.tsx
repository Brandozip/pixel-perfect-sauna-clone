import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Sparkles, Heart, Activity, Phone } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: Activity,
    title: "Cellular Repair Activation",
    description: "Heat shock proteins repair damaged cellular components and protect against age-related decline."
  },
  {
    icon: Sparkles,
    title: "Improved Skin Elasticity",
    description: "Enhanced collagen production and circulation promote youthful, healthy skin."
  },
  {
    icon: Shield,
    title: "Reduced Oxidative Stress",
    description: "Sauna use may enhance antioxidant systems that protect against cellular aging."
  },
  {
    icon: Activity,
    title: "Enhanced Autophagy",
    description: "Heat exposure triggers cellular cleanup processes that remove damaged components."
  },
  {
    icon: Activity,
    title: "Improved Mitochondrial Function",
    description: "Regular sauna use supports energy production and metabolic health."
  },
  {
    icon: Heart,
    title: "Cardiovascular Protection",
    description: "Reduced cardiovascular disease risk contributes significantly to longevity."
  }
];

const AntiAging = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen">
        <Navigation />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Anti-Aging & Longevity Benefits</h1>
            <p className="text-xl text-muted-foreground mb-12">
              Promote Youthful Vitality Through Heat Therapy
            </p>
            
            <div className="mb-12">
              <p className="text-lg text-muted-foreground">
                Regular sauna use activates cellular mechanisms that may slow aging, improve longevity, and promote youthful vitality.
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
                  Heat exposure triggers multiple cellular mechanisms associated with longevity. Heat shock proteins (HSPs) help maintain cellular health by repairing damaged proteins and preventing protein aggregation associated with aging.
                </p>
                <p>
                  Sauna use activates autophagy—the body's cellular cleanup system—helping remove damaged organelles and protein aggregates that accumulate with age. This cellular maintenance is crucial for healthy aging.
                </p>
                <p>
                  The cardiovascular benefits of regular sauna use contribute significantly to longevity, as cardiovascular disease is a leading cause of mortality. Studies show frequent sauna users have substantially reduced cardiovascular and all-cause mortality.
                </p>
                <p>
                  Heat exposure may activate longevity pathways similar to caloric restriction and exercise, including FOXO genes and sirtuins associated with extended lifespan in animal studies.
                </p>
              </div>
            </Card>

            <Card className="p-8 mb-16">
              <h2 className="text-3xl font-bold mb-4">Scientific Evidence</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The landmark Finnish Sauna Study following 2,315 men over 20+ years found those using saunas 4-7 times weekly had 40% lower all-cause mortality compared to once-weekly users.
                </p>
                <p>
                  Research shows sauna use associated with reduced risk of dementia and Alzheimer's disease—major factors affecting healthspan.
                </p>
                <p>
                  Studies demonstrate heat shock protein activation through sauna use, proteins strongly associated with longevity across species.
                </p>
              </div>
            </Card>

            <Card className="p-8 mb-16">
              <h2 className="text-3xl font-bold mb-4">Best Practices</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Regular, consistent use (4-7x weekly)</li>
                <li>15-20 minute sessions</li>
                <li>Moderate temperatures (165-195°F)</li>
                <li>Stay well hydrated</li>
                <li>Combine with healthy lifestyle</li>
                <li>Make it lifelong habit</li>
                <li>Listen to your body</li>
              </ul>
            </Card>

            <Card className="p-8 md:p-12 bg-primary text-primary-foreground">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Start Your Longevity Journey?</h2>
                <p className="text-lg mb-6 text-primary-foreground/90">
                  Contact us today to learn how a custom sauna can support your health and longevity goals.
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

export default AntiAging;

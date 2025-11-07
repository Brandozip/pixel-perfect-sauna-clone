import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Activity, TrendingDown, Phone } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: Activity,
    title: "Improved Circulation",
    description: "Heat causes blood vessels to dilate, increasing blood flow throughout the body."
  },
  {
    icon: TrendingDown,
    title: "Lower Blood Pressure",
    description: "Regular sauna use has been shown to reduce both systolic and diastolic blood pressure."
  },
  {
    icon: Heart,
    title: "Enhanced Cardiac Output",
    description: "The heart works harder to cool the body, providing a cardiovascular workout similar to moderate exercise."
  },
  {
    icon: Activity,
    title: "Reduced Arterial Stiffness",
    description: "Heat exposure improves arterial compliance, allowing blood vessels to expand and contract more effectively."
  },
  {
    icon: Heart,
    title: "Decreased Cardiovascular Disease Risk",
    description: "Studies show frequent sauna use significantly reduces risk of fatal cardiovascular events."
  },
  {
    icon: Activity,
    title: "Improved Endothelial Function",
    description: "Heat therapy enhances the function of the endothelium, the inner lining of blood vessels."
  }
];

const Cardiovascular = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen">
        <Navigation />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Cardiovascular & Heart Health</h1>
            <p className="text-xl text-muted-foreground mb-12">
              Strengthening Your Heart Through Heat Therapy
            </p>
            
            <div className="mb-12">
              <p className="text-lg text-muted-foreground">
                Regular sauna use provides significant cardiovascular benefits, improving heart health and reducing risk of cardiovascular disease.
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
                  During a sauna session, your heart rate increases to 100-150 beats per minute, similar to moderate exercise. This cardiovascular workout strengthens the heart muscle and improves cardiac output.
                </p>
                <p>
                  Heat causes blood vessels to dilate, reducing vascular resistance and lowering blood pressure. This vasodilation improves blood flow to all organs and tissues.
                </p>
                <p>
                  Regular heat exposure triggers adaptive responses that improve cardiovascular function over time, including increased plasma volume, improved heart rate variability, and enhanced thermoregulatory capacity.
                </p>
              </div>
            </Card>

            <Card className="p-8 mb-16">
              <h2 className="text-3xl font-bold mb-4">Scientific Evidence</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  A landmark Finnish study following 2,315 men over 20 years found that those who used saunas 4-7 times per week had a 50% lower risk of fatal cardiovascular disease compared to once-weekly users.
                </p>
                <p>
                  Research published in the American Journal of Hypertension showed that regular sauna use significantly reduced blood pressure in hypertensive patients.
                </p>
              </div>
            </Card>

            <Card className="p-8 mb-16 border-l-4 border-l-amber-500">
              <h2 className="text-2xl font-bold mb-4">Safety Considerations</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Consult physician if you have heart conditions</li>
                <li>Avoid if recently had heart attack</li>
                <li>Stay hydrated</li>
                <li>Limit alcohol before sessions</li>
                <li>Listen to your body</li>
                <li>Cool down gradually</li>
              </ul>
            </Card>

            <Card className="p-8 md:p-12 bg-primary text-primary-foreground">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Support Your Heart Health</h2>
                <p className="text-lg mb-6 text-primary-foreground/90">
                  Contact us today to learn how a custom sauna can benefit your cardiovascular health.
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

export default Cardiovascular;

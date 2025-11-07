import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Zap, TrendingUp, Heart, Phone } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: Activity,
    title: "Reduced Muscle Soreness",
    description: "Heat exposure reduces delayed onset muscle soreness (DOMS) by increasing blood flow and removing metabolic waste."
  },
  {
    icon: Zap,
    title: "Increased Muscle Pliability",
    description: "Deep heat relaxes muscle fibers and connective tissue, improving flexibility and range of motion."
  },
  {
    icon: TrendingUp,
    title: "Enhanced Glycogen Resynthesis",
    description: "Post-exercise sauna sessions help muscles efficiently replenish glycogen stores for faster recovery."
  },
  {
    icon: Heart,
    title: "Growth Hormone Stimulation",
    description: "Heat stress increases growth hormone production, crucial for muscle repair and growth."
  },
  {
    icon: Activity,
    title: "Improved Blood Flow",
    description: "Vasodilation brings nutrient-rich blood to recovering muscles with oxygen and amino acids."
  },
  {
    icon: TrendingUp,
    title: "Heat Adaptation Benefits",
    description: "Regular sauna use improves heat tolerance and cardiovascular adaptations enhancing endurance performance."
  }
];

const MuscleRecovery = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen">
        <Navigation />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Muscle Recovery & Athletic Performance</h1>
            <p className="text-xl text-muted-foreground mb-12">
              Accelerate Recovery and Enhance Performance
            </p>
            
            <div className="mb-12">
              <p className="text-lg text-muted-foreground">
                Sauna bathing accelerates muscle recovery, reduces soreness, and potentially improves athletic performance through multiple mechanisms.
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
                  When exposed to sauna heat, blood flow to skeletal muscles increases by 200-400%, delivering oxygen and nutrients while removing metabolic byproducts like lactic acid.
                </p>
                <p>
                  Heat activates heat shock proteins (HSPs) that repair damaged proteins and protect cells from stress, accelerating muscle repair.
                </p>
                <p>
                  Sauna sessions stimulate growth hormone release, with increases of up to 200-300% after a single session. Growth hormone is crucial for muscle repair and growth.
                </p>
                <p>
                  The parasympathetic activation during cool-down promotes deep relaxation, reducing muscle tension and allowing complete recovery.
                </p>
              </div>
            </Card>

            <Card className="p-8 mb-16">
              <h2 className="text-3xl font-bold mb-4">Scientific Evidence</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Research with endurance runners found post-exercise sauna bathing over three weeks increased time to exhaustion by 32%.
                </p>
                <p>
                  Studies show sauna use after strength training reduces perceived muscle soreness and accelerates recovery of neuromuscular power.
                </p>
                <p>
                  A systematic review concluded sauna bathing shows promising results for reducing DOMS and accelerating strength recovery.
                </p>
              </div>
            </Card>

            <Card className="p-8 mb-16">
              <h2 className="text-3xl font-bold mb-4">Best Practices</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Use post-workout</li>
                <li>15-20 minutes at 165-195°F</li>
                <li>Hydrate before and after</li>
                <li>Allow proper cool-down</li>
                <li>Use 3-4 times per week</li>
                <li>Combine with stretching</li>
              </ul>
            </Card>

            <Card className="p-8 md:p-12 bg-primary text-primary-foreground">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Accelerate Your Recovery</h2>
                <p className="text-lg mb-6 text-primary-foreground/90">
                  Contact us today to learn how a custom sauna can enhance your athletic performance and recovery.
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

export default MuscleRecovery;

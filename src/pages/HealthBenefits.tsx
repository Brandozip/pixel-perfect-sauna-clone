import CleanNavbar from "@/components/navigation/CleanNavbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplets, Heart, Activity, Zap, Moon, Sparkles, Brain, Shield } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: Droplets,
    title: "Detoxification",
    description: "Eliminate toxins through sweating in high temperatures. Regular sauna use helps your body flush out heavy metals, chemicals, and other harmful substances through perspiration.",
    details: [
      "Removes environmental toxins",
      "Cleanses skin pores deeply",
      "Supports kidney and liver function",
      "Enhances natural detox processes"
    ]
  },
  {
    icon: Heart,
    title: "Stress Relief",
    description: "Relax the body and mind, reducing cortisol levels. The heat helps release endorphins, nature's feel-good chemicals, promoting a sense of well-being and relaxation.",
    details: [
      "Lowers cortisol levels",
      "Reduces anxiety and tension",
      "Promotes mental clarity",
      "Improves mood naturally"
    ]
  },
  {
    icon: Activity,
    title: "Improved Circulation",
    description: "Enhance blood flow and cardiovascular health. Heat exposure causes blood vessels to dilate, improving circulation throughout your body and supporting heart health.",
    details: [
      "Increases heart rate safely",
      "Improves vascular function",
      "Enhances oxygen delivery",
      "Supports cardiovascular fitness"
    ]
  },
  {
    icon: Zap,
    title: "Muscle Recovery",
    description: "Speed up recovery after workouts and reduce soreness. The heat helps relax muscles, reduce inflammation, and accelerate healing of minor injuries.",
    details: [
      "Reduces muscle soreness",
      "Accelerates healing",
      "Improves flexibility",
      "Relieves joint pain"
    ]
  },
  {
    icon: Moon,
    title: "Improved Sleep",
    description: "Achieve deeper, more restorative sleep patterns. The temperature drop after sauna use signals your body to prepare for sleep, promoting better sleep quality.",
    details: [
      "Promotes deep sleep",
      "Regulates circadian rhythm",
      "Reduces insomnia",
      "Enhances sleep quality"
    ]
  },
  {
    icon: Sparkles,
    title: "Skin Health",
    description: "Cleanse pores and promote skin rejuvenation. Sweating opens pores, removes dead skin cells, and improves overall skin tone and texture.",
    details: [
      "Deep cleanses pores",
      "Improves skin elasticity",
      "Promotes collagen production",
      "Enhances natural glow"
    ]
  },
  {
    icon: Brain,
    title: "Mental Clarity",
    description: "Enhance cognitive function and focus. Regular sauna use has been linked to improved mental performance, better memory, and reduced risk of cognitive decline.",
    details: [
      "Improves concentration",
      "Enhances memory",
      "Reduces brain fog",
      "Supports neuroplasticity"
    ]
  },
  {
    icon: Shield,
    title: "Immune Support",
    description: "Strengthen your body's natural defenses. The heat stress from saunas activates immune responses, potentially reducing the frequency of common illnesses.",
    details: [
      "Boosts white blood cell production",
      "Reduces illness frequency",
      "Strengthens immune response",
      "Fights inflammation"
    ]
  }
];

const HealthBenefits = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen">
        <CleanNavbar />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Health Benefits of Regular Sauna Use</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience the numerous health and wellness advantages that come with incorporating saunas into your lifestyle. Backed by scientific research and centuries of tradition.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="p-8 hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{benefit.title}</h3>
                        <p className="text-muted-foreground mb-4">{benefit.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-2 ml-[72px]">
                      {benefit.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
            </div>
            
            <Card className="card-elevated p-8 md:p-12 bg-primary-muted border-primary/20">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="heading-2 mb-4">Start Your Wellness Journey Today</h2>
                <p className="body-lg text-muted-foreground mb-8">
                  Discover how regular sauna sessions can significantly improve your overall wellbeing and quality of life. Our expert team is ready to help you create the perfect wellness sanctuary in your home.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button size="lg" className="bg-primary hover:bg-primary-emphasis text-primary-foreground">
                      Get Free Consultation
                    </Button>
                  </Link>
                  <Link to="/services">
                    <Button size="lg" variant="outline" className="border-2">
                      View Our Services
                    </Button>
                  </Link>
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

export default HealthBenefits;

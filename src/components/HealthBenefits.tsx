import { Droplets, Heart, Activity, Zap, Moon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Droplets,
    title: "Detoxification",
    description: "Eliminate toxins through sweating in high temperatures."
  },
  {
    icon: Heart,
    title: "Stress Relief",
    description: "Relax the body and mind, reducing cortisol levels."
  },
  {
    icon: Activity,
    title: "Improved Circulation",
    description: "Enhance blood flow and cardiovascular health."
  },
  {
    icon: Zap,
    title: "Muscle Recovery",
    description: "Speed up recovery after workouts and reduce soreness."
  },
  {
    icon: Moon,
    title: "Improved Sleep",
    description: "Achieve deeper, more restorative sleep patterns."
  },
  {
    icon: Sparkles,
    title: "Skin Health",
    description: "Cleanse pores and promote skin rejuvenation."
  }
];

export const HealthBenefits = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Health Benefits of Regular Sauna Use</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the numerous health and wellness advantages that come with incorporating saunas into your lifestyle.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Discover how regular sauna sessions can significantly improve your overall wellbeing and quality of life.
          </p>
          <Button variant="outline" size="lg" className="text-lg">
            Explore All Health Benefits
          </Button>
        </div>
      </div>
    </section>
  );
};

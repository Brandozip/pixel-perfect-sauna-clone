import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-sauna.jpg";

export const Hero = () => {
  return (
    <section 
      className="relative h-[700px] flex items-center justify-center text-white"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container relative z-10 text-center max-w-4xl">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Elevate Your Wellness Journey with Custom Saunas
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
          Transform your space with premium custom sauna solutions designed for health, relaxation, and luxury. Experience the ultimate in wellness.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6">
            Free Consultation
          </Button>
          <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 py-6 backdrop-blur-sm">
            Explore Our Work
          </Button>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-accent" />
            <span className="font-medium">Licensed & Insured</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-accent" />
            <span className="font-medium">20+ Years Experience</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-accent" />
            <span className="font-medium">5-Star Rated</span>
          </div>
        </div>
      </div>
    </section>
  );
};

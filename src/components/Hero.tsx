import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { trackButtonClick } from "@/utils/analytics";
import heroImage from "@/assets/hero-sauna.jpg";

export const Hero = () => {
  return (
    <section 
      className="relative h-[700px] flex items-center justify-center text-white bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%), url(${heroImage})`,
      }}
    >
      <div className="container relative z-10 text-center max-w-4xl">
        <h1 className="heading-1 text-white mb-6">
          Elevate Your Wellness Journey with Custom Saunas
        </h1>
        <p className="body-lg text-white/90 max-w-3xl mx-auto mb-8">
          Transform your space with premium custom sauna solutions designed for health, relaxation, and luxury. Experience the ultimate in wellness.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/contact">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-emphasis text-primary-foreground text-lg px-8 py-6 shadow-elevated"
              onClick={() => trackButtonClick('Free Consultation', 'Hero')}
            >
              Free Consultation
            </Button>
          </Link>
          <Link to="/gallery">
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 py-6 backdrop-blur-sm"
              onClick={() => trackButtonClick('Explore Our Work', 'Hero')}
            >
              Explore Our Work
            </Button>
          </Link>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <span className="font-medium">Licensed & Insured</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <span className="font-medium">20+ Years Experience</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <span className="font-medium">5-Star Rated</span>
          </div>
        </div>
      </div>
    </section>
  );
};

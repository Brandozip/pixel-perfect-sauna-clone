import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { trackButtonClick } from "@/utils/analytics";

export const CTASection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-2 mb-4">Ready to Transform Your Space?</h2>
          <p className="body-lg text-muted-foreground mb-8">
            Start your sauna journey today. Contact us for a free consultation and discover how we can create the perfect wellness solution for your home or business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-emphasis text-primary-foreground text-lg px-8 py-6 shadow-elevated"
              onClick={() => trackButtonClick('Get Free Consultation', 'CTA Section')}
              asChild
            >
              <Link to="/contact">Get Free Consultation</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-2"
              onClick={() => trackButtonClick('View Our Projects', 'CTA Section')}
              asChild
            >
              <Link to="/gallery">View Our Projects</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

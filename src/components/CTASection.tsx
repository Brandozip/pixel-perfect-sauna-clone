import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Transform Your Space?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start your sauna journey today. Contact us for a free consultation and discover how we can create the perfect wellness solution for your home or business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6">
              Get Free Consultation
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              View Our Projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

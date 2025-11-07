import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNewsletterSignup } from "@/hooks/useNewsletterSignup";

export const Newsletter = () => {
  const { email, setEmail, isLoading, subscribe } = useNewsletterSignup();

  return (
    <section className="py-20 bg-accent text-accent-foreground">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Wellness Revolution</h2>
          <p className="text-lg mb-8 text-accent-foreground/90">
            Get expert sauna tips, health insights, and exclusive offers delivered monthly to your inbox.
          </p>
          
          <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="bg-white text-foreground border-none"
            />
            <Button type="submit" variant="secondary" className="whitespace-nowrap" disabled={isLoading}>
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
          
          <p className="text-sm mt-4 text-accent-foreground/80">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

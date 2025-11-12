import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNewsletterSignup } from "@/hooks/useNewsletterSignup";

export const Newsletter = () => {
  const { email, setEmail, isLoading, subscribe, isGeoAllowed, geoMessage, isGeoLoading } = useNewsletterSignup();

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="heading-3 mb-4">Join the Wellness Revolution</h2>
          <p className="body-lg text-muted-foreground mb-8">
            Get expert sauna tips, health insights, and exclusive offers delivered monthly to your inbox.
          </p>
          
          {!isGeoLoading && !isGeoAllowed && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4 mb-6 max-w-md mx-auto">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                {geoMessage || 'Newsletter signup is currently only available to visitors from the United States.'}
              </p>
            </div>
          )}
          
          <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="bg-background border-input"
            />
            <Button type="submit" className="whitespace-nowrap bg-primary hover:bg-primary-emphasis" disabled={isLoading || !isGeoAllowed || isGeoLoading}>
              {isGeoLoading ? 'Checking...' : isLoading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
          
          <p className="text-sm mt-4 text-muted-foreground">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

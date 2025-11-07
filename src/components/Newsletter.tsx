import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thank you for subscribing!",
      description: "You'll receive our wellness tips and exclusive offers.",
    });
    setEmail("");
  };

  return (
    <section className="py-20 bg-accent text-accent-foreground">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Wellness Revolution</h2>
          <p className="text-lg mb-8 text-accent-foreground/90">
            Get expert sauna tips, health insights, and exclusive offers delivered monthly to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white text-foreground border-none"
            />
            <Button type="submit" variant="secondary" className="whitespace-nowrap">
              Subscribe
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

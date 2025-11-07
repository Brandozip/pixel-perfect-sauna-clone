import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Clock, MapPin, Phone, Mail } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen">
        <Navigation />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Ready to start your sauna project? Contact us for a free consultation and personalized quote.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(678) 245-9966"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
                    Send Message
                  </Button>
                </form>
              </Card>
              
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-accent mt-1" />
                      <div>
                        <div className="font-semibold">Business Hours</div>
                        <div className="text-muted-foreground">Monday - Friday: 9AM - 6PM</div>
                        <div className="text-muted-foreground">Saturday - Sunday: Closed</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-accent mt-1" />
                      <div>
                        <div className="font-semibold">Location</div>
                        <div className="text-muted-foreground">Serving Atlanta, GA</div>
                        <div className="text-muted-foreground">and surrounding areas</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-accent mt-1" />
                      <div>
                        <div className="font-semibold">Phone</div>
                        <a href="tel:+16782459966" className="text-accent hover:underline">
                          678-245-9966
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-accent mt-1" />
                      <div>
                        <div className="font-semibold">Email</div>
                        <a href="mailto:contact@saunasplus.com" className="text-accent hover:underline">
                          contact@saunasplus.com
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 bg-accent/5 border-accent/20">
                  <h3 className="text-xl font-bold mb-3">What to Expect</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span>We'll respond within 24 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span>Schedule a free consultation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span>Receive a personalized quote</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span>Begin your sauna journey</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Contact;

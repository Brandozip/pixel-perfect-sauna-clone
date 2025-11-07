import { Clock, MapPin, Phone, Mail, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export const Navigation = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="hidden lg:flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Mon-Fri 9AM-6PM</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Atlanta, GA</span>
          </div>
          <a href="tel:+16782459966" className="flex items-center gap-2 hover:text-foreground transition-colors">
            <Phone className="h-4 w-4" />
            <span>678-245-9966</span>
          </a>
          <a href="mailto:contact@saunasplus.com" className="flex items-center gap-2 hover:text-foreground transition-colors">
            <Mail className="h-4 w-4" />
            <span>contact@saunasplus.com</span>
          </a>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Free Consultation
          </Button>
        </div>
      </div>
      
      <nav className="container border-t border-border">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="text-2xl font-bold">
            Saunas<span className="text-accent">Plus</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-sm font-medium hover:text-accent transition-colors">Home</a>
            <a href="/services" className="text-sm font-medium hover:text-accent transition-colors">Services</a>
            <a href="/health-benefits" className="text-sm font-medium hover:text-accent transition-colors">Health Benefits</a>
            <a href="/gallery" className="text-sm font-medium hover:text-accent transition-colors">Gallery</a>
            <a href="/about" className="text-sm font-medium hover:text-accent transition-colors">About</a>
            <a href="/faq" className="text-sm font-medium hover:text-accent transition-colors">FAQ</a>
            <a href="/contact" className="text-sm font-medium hover:text-accent transition-colors">Contact</a>
          </div>
        </div>
      </nav>
    </header>
  );
};

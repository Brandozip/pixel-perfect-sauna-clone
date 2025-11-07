import { Clock, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Saunas<span className="text-accent">Plus</span>
            </h3>
            <p className="text-primary-foreground/80">
              Transform your space with premium custom sauna solutions designed for health, relaxation, and luxury.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-primary-foreground/80 hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-primary-foreground/80 hover:text-accent transition-colors">Services</Link></li>
              <li><Link to="/health-benefits" className="text-primary-foreground/80 hover:text-accent transition-colors">Health Benefits</Link></li>
              <li><Link to="/gallery" className="text-primary-foreground/80 hover:text-accent transition-colors">Gallery</Link></li>
              <li><Link to="/about" className="text-primary-foreground/80 hover:text-accent transition-colors">About</Link></li>
              <li><Link to="/faq" className="text-primary-foreground/80 hover:text-accent transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-primary-foreground/80 hover:text-accent transition-colors">Contact</Link></li>
              <li><Link to="/commercial-projects" className="text-primary-foreground/80 hover:text-accent transition-colors">Commercial</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/services/custom-sauna-design" className="text-primary-foreground/80 hover:text-accent transition-colors">Custom Sauna Design</Link></li>
              <li><Link to="/services/steam-shower-installation" className="text-primary-foreground/80 hover:text-accent transition-colors">Steam Shower Installation</Link></li>
              <li><Link to="/services/residential-sauna-builds" className="text-primary-foreground/80 hover:text-accent transition-colors">Residential Sauna Builds</Link></li>
              <li><Link to="/services/outdoor-sauna-kits" className="text-primary-foreground/80 hover:text-accent transition-colors">Outdoor Sauna Kits</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-primary-foreground/80 hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-primary-foreground/80 hover:text-accent transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Clock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">Mon-Fri 9AM-6PM</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">Atlanta, GA</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <a href="tel:+16782459966" className="text-primary-foreground/80 hover:text-accent transition-colors">678-245-9966</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <a href="mailto:contact@saunasplus.com" className="text-primary-foreground/80 hover:text-accent transition-colors">contact@saunasplus.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
          <p>&copy; {new Date().getFullYear()} Saunas Plus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

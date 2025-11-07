import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Home, Info, Wrench, Image, HelpCircle, MessageCircle, Heart } from "lucide-react";
import NewsletterSignup from '@/components/marketing/NewsletterSignup';
import { Logo } from './branding/Logo';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Logo className="text-background" />
            </div>
            <p className="mb-4 text-background/80">
              Premium custom sauna solutions for residential and commercial properties. Elevate your wellness experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="flex items-center space-x-2 text-background/80 hover:text-primary transition-colors">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center space-x-2 text-background/80 hover:text-primary transition-colors">
                  <Info className="h-4 w-4" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="flex items-center space-x-2 text-background/80 hover:text-primary transition-colors">
                  <Wrench className="h-4 w-4" />
                  <span>Services</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="flex items-center space-x-2 text-background/80 hover:text-primary transition-colors">
                  <Image className="h-4 w-4" />
                  <span>Gallery</span>
                </Link>
              </li>
              <li>
                <Link to="/health-benefits" className="flex items-center space-x-2 text-background/80 hover:text-primary transition-colors">
                  <Heart className="h-4 w-4" />
                  <span>Health Benefits</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="flex items-center space-x-2 text-background/80 hover:text-primary transition-colors">
                  <HelpCircle className="h-4 w-4" />
                  <span>FAQ</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center space-x-2 text-background/80 hover:text-primary transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-background/80">Atlanta, GA</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <a href="tel:+16782459966" className="text-background/80 hover:text-primary transition-colors">
                  678-245-9966
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <a href="mailto:contact@saunasplus.com" className="text-background/80 hover:text-primary transition-colors">
                  contact@saunasplus.com
                </a>
              </li>
            </ul>
            
            {/* Legal Links */}
            <div className="mt-6">
              <h4 className="text-lg font-heading font-semibold mb-3">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy-policy" className="text-background/80 hover:text-primary transition-colors text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="text-background/80 hover:text-primary transition-colors text-sm">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <NewsletterSignup />
          </div>
        </div>
        
        <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/80">
          <p>&copy; {year} Saunas Plus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

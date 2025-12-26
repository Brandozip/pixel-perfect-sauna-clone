import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Home, Info, Wrench, Image, HelpCircle, MessageCircle, Heart } from "lucide-react";
import NewsletterSignup from '@/components/marketing/NewsletterSignup';
import { Logo } from './branding/Logo';
import { trackPhoneClick, trackEmailClick } from '@/utils/analytics';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <Logo className="text-background" />
            </div>
            <p className="text-background/90 leading-relaxed">
              Premium custom sauna solutions for residential and commercial properties. Elevate your wellness experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4 text-background">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="flex items-center space-x-2 text-background/80 hover:text-primary transition-colors group">
                  <Home className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center space-x-2 text-background/80 hover:text-primary transition-colors group">
                  <Info className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="flex items-center space-x-2 text-background/80 hover:text-primary transition-colors group">
                  <Wrench className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  <span>Services</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="flex items-center space-x-2 text-background/80 hover:text-primary transition-colors group">
                  <Image className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  <span>Gallery</span>
                </Link>
              </li>
              <li>
                <Link to="/health-benefits" className="flex items-center space-x-2 text-background/80 hover:text-primary transition-colors group">
                  <Heart className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  <span>Health Benefits</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" className="flex items-center space-x-2 text-background/80 hover:text-primary transition-colors group">
                  <HelpCircle className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  <span>Blog</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center space-x-2 text-background/80 hover:text-primary transition-colors group">
                  <MessageCircle className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4 text-background">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                <span className="text-background/90">Atlanta, GA</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                <a 
                  href="tel:+16782459966" 
                  className="text-background/90 hover:text-primary transition-colors"
                  onClick={trackPhoneClick}
                >
                  678-245-9966
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                <a 
                  href="mailto:contact@saunasplus.com" 
                  className="text-background/90 hover:text-primary transition-colors"
                  onClick={trackEmailClick}
                >
                  contact@saunasplus.com
                </a>
              </li>
            </ul>
            
            {/* Legal Links */}
            <div className="mt-8">
              <h3 className="text-lg font-heading font-semibold mb-3 text-background">Legal</h3>
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
                <li>
                  <Link to="/site-map" className="text-background/80 hover:text-primary transition-colors text-sm">
                    Site Map
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
        
        <div className="border-t border-background/20 mt-12 pt-8 text-center">
          <p className="text-background/80">&copy; {year} Saunas Plus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

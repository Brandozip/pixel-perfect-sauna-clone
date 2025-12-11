import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted">
      <Helmet>
        <title>404 - Page Not Found | Saunas Plus</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="The page you're looking for doesn't exist. Return to Saunas Plus homepage for custom sauna solutions in Atlanta." />
      </Helmet>
      
      <div className="text-center px-4 max-w-lg">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. 
          Don't worry, let's get you back to exploring our premium sauna solutions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default" size="lg">
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go to Homepage
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/services" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Browse Services
            </Link>
          </Button>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link to="/contact" className="text-primary hover:underline">Contact Us</Link>
            <span className="text-muted-foreground">•</span>
            <Link to="/faq" className="text-primary hover:underline">FAQ</Link>
            <span className="text-muted-foreground">•</span>
            <Link to="/site-map" className="text-primary hover:underline">Site Map</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Phone } from "lucide-react";
import { trackPhoneClick, trackButtonClick } from '@/utils/analytics';

interface NavActionsProps {
  isMobile?: boolean;
  toggleMenu?: () => void;
}

const NavActions: React.FC<NavActionsProps> = ({ isMobile = false, toggleMenu }) => {
  if (isMobile) {
    return (
      <div className="mt-6 flex flex-col space-y-4 px-4 pb-4">
        <a 
          href="tel:+16782459966" 
          className="flex items-center text-primary font-medium"
          onClick={trackPhoneClick}
        >
          <Phone className="mr-2 h-4 w-4" />
          <span>678-245-9966</span>
        </a>
        <Button asChild className="w-full">
          <Link 
            to="/contact" 
            onClick={() => {
              trackButtonClick('Free Consultation', 'Mobile Nav');
              toggleMenu?.();
            }}
          >
            Free Consultation
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex items-center space-x-4">
      <a 
        href="tel:+16782459966" 
        className="flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
        onClick={trackPhoneClick}
      >
        <Phone className="mr-2 h-4 w-4" />
        <span>678-245-9966</span>
      </a>
      <Button asChild>
        <Link 
          to="/contact"
          onClick={() => trackButtonClick('Free Consultation', 'Desktop Nav')}
        >
          Free Consultation
        </Link>
      </Button>
    </div>
  );
};

export default NavActions;

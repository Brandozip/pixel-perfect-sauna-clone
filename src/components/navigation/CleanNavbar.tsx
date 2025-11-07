import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun } from "lucide-react";
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import SiteSearch from '../search/SiteSearch';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import NavActions from './NavActions';
import { navigationLinks } from './navigation-data';

const CleanNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <nav 
      className={cn(
        "bg-background/95 backdrop-blur-sm border-b border-border transition-all duration-300 sticky top-0 z-50",
        isScrolled && "shadow-custom"
      )}
    >
      <div className="container-fluid">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-heading font-bold text-foreground">
              Saunas<span className="text-primary">Plus</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <DesktopNav 
            links={navigationLinks} 
            activeDropdown={activeDropdown} 
            toggleDropdown={toggleDropdown} 
          />

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <SiteSearch />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <NavActions />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center space-x-3">
            <SiteSearch />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <button
              onClick={toggleMenu}
              className="text-foreground focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav 
        links={navigationLinks}
        activeDropdown={activeDropdown}
        toggleDropdown={toggleDropdown}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
      />
      {isMenuOpen && <NavActions isMobile toggleMenu={toggleMenu} />}
    </nav>
  );
};

export default CleanNavbar;

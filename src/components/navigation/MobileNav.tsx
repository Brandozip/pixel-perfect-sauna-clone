import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkItem {
  name: string;
  path: string;
  children?: NavLinkItem[];
}

interface MobileNavProps {
  links: NavLinkItem[];
  activeDropdown: string | null;
  toggleDropdown: (name: string) => void;
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

const MobileNav: React.FC<MobileNavProps> = ({ 
  links, 
  activeDropdown, 
  toggleDropdown, 
  toggleMenu, 
  isMenuOpen 
}) => {
  if (!isMenuOpen) return null;

  return (
    <div className="lg:hidden bg-card shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border">
      <div className="container-fluid py-4">
        {links.map((link) => (
          <div key={link.name} className="py-2">
            {link.children ? (
              <>
                <button 
                  className="flex items-center justify-between w-full text-left py-2 font-medium text-foreground"
                  onClick={() => toggleDropdown(link.name)}
                >
                  {link.name}
                  <svg 
                    className={`w-4 h-4 transition-transform ${activeDropdown === link.name ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {activeDropdown === link.name && (
                  <div className="mt-2 ml-4 border-l-2 border-primary/20 pl-4">
                    {link.children.map((childLink) => (
                      <Link
                        key={childLink.name}
                        to={childLink.path}
                        className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        onClick={toggleMenu}
                      >
                        {childLink.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={link.path}
                className="block py-2 font-medium text-foreground hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;

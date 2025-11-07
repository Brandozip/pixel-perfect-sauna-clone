import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkItem {
  name: string;
  path: string;
  children?: NavLinkItem[];
}

interface DesktopNavProps {
  links: NavLinkItem[];
  activeDropdown: string | null;
  toggleDropdown: (name: string) => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ links, activeDropdown, toggleDropdown }) => {
  return (
    <div className="hidden lg:flex items-center space-x-8">
      {links.map((link) => (
        <div key={link.name} className="relative group">
          {link.children ? (
            <>
              <button 
                className="flex items-center font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => toggleDropdown(link.name)}
              >
                {link.name}
                <svg 
                  className="ml-1 w-4 h-4" 
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
              <div className="absolute left-0 mt-2 w-64 bg-card rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-border">
                <div className="py-2">
                  {link.children.map((childLink) => (
                    <Link
                      key={childLink.name}
                      to={childLink.path}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-accent/10 hover:text-primary transition-colors"
                    >
                      {childLink.name}
                    </Link>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <Link 
              to={link.path}
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default DesktopNav;

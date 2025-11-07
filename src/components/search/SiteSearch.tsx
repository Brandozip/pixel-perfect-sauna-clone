import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchResult {
  title: string;
  path: string;
  description: string;
  category: string;
}

const searchableContent: SearchResult[] = [
  // Pages
  { title: 'Home', path: '/', description: 'Premium custom sauna solutions', category: 'Page' },
  { title: 'About Us', path: '/about', description: 'Learn about our company', category: 'Page' },
  { title: 'Services', path: '/services', description: 'Our sauna services', category: 'Page' },
  { title: 'Gallery', path: '/gallery', description: 'View our projects', category: 'Page' },
  { title: 'FAQ', path: '/faq', description: 'Frequently asked questions', category: 'Page' },
  { title: 'Contact', path: '/contact', description: 'Get in touch with us', category: 'Page' },
  
  // Services
  { title: 'Custom Sauna Design', path: '/services/custom-sauna-design', description: 'Tailored sauna designs', category: 'Service' },
  { title: 'Custom Sauna Installation', path: '/services/custom-sauna-installation', description: 'Professional installation', category: 'Service' },
  { title: 'Steam Shower Installation', path: '/services/steam-shower-installation', description: 'Steam shower solutions', category: 'Service' },
  { title: 'Residential Sauna Builds', path: '/services/residential-sauna-builds', description: 'Home sauna construction', category: 'Service' },
  { title: 'Outdoor Sauna Kits', path: '/services/outdoor-sauna-kits', description: 'Outdoor sauna packages', category: 'Service' },
  { title: 'Indoor Infrared Sauna', path: '/services/indoor-infrared-sauna', description: 'Infrared sauna solutions', category: 'Service' },
  
  // Health Benefits
  { title: 'Detoxification', path: '/health-benefits/detoxification', description: 'Cleanse your body', category: 'Health' },
  { title: 'Mental Health', path: '/health-benefits/mental-health', description: 'Reduce stress and anxiety', category: 'Health' },
  { title: 'Cardiovascular Health', path: '/health-benefits/cardiovascular', description: 'Heart health benefits', category: 'Health' },
  { title: 'Muscle Recovery', path: '/health-benefits/muscle-recovery', description: 'Athletic recovery', category: 'Health' },
  { title: 'Immune System', path: '/health-benefits/immune-system', description: 'Boost your immunity', category: 'Health' },
  { title: 'Anti-Aging', path: '/health-benefits/anti-aging', description: 'Age gracefully', category: 'Health' },
  { title: 'Chronic Pain Relief', path: '/health-benefits/chronic-pain-relief', description: 'Manage chronic pain', category: 'Health' },
];

const SiteSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    // Fuzzy search implementation
    const searchQuery = query.toLowerCase();
    const filtered = searchableContent.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(searchQuery);
      const descMatch = item.description.toLowerCase().includes(searchQuery);
      const categoryMatch = item.category.toLowerCase().includes(searchQuery);
      return titleMatch || descMatch || categoryMatch;
    });

    setResults(filtered.slice(0, 6)); // Limit to 6 results
  }, [query]);

  const handleResultClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div ref={searchRef} className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Search className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search site..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-10"
                autoFocus
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>

            {results.length > 0 && (
              <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
                {results.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleResultClick(result.path)}
                    className="w-full text-left p-3 rounded-md hover:bg-accent/10 transition-colors border border-transparent hover:border-border"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{result.title}</div>
                        <div className="text-sm text-muted-foreground mt-1">{result.description}</div>
                      </div>
                      <span className="text-xs text-muted-foreground ml-2 mt-1">{result.category}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {query && results.length === 0 && (
              <div className="mt-4 text-center text-muted-foreground py-8">
                No results found for "{query}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteSearch;

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface LinkSuggestion {
  url: string;
  title: string;
  type: string;
  relevance: number;
  excerpt?: string;
}

export function useLinkSuggestions(title: string, category?: string, content?: string) {
  const [suggestions, setSuggestions] = useState<{
    services: LinkSuggestion[];
    health: LinkSuggestion[];
    blogs: LinkSuggestion[];
    contact: LinkSuggestion;
  }>({
    services: [],
    health: [],
    blogs: [],
    contact: { url: '/contact', title: 'Contact Us', type: 'page', relevance: 100 }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (title) {
      fetchSuggestions();
    }
  }, [title, category]);

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      
      // Fetch all indexed content
      const { data: allContent, error } = await supabase
        .from('site_content')
        .select('url, title, page_type, excerpt, main_keywords')
        .order('page_type');

      if (error) throw error;
      if (!allContent) return;

      // Calculate relevance scores based on title and keywords
      const titleWords = title.toLowerCase().split(' ').filter(w => w.length > 3);
      
      const scoredContent = allContent.map(item => {
        let score = 0;
        const itemTitle = item.title.toLowerCase();
        const itemKeywords = item.main_keywords || [];

        // Title word matches
        titleWords.forEach(word => {
          if (itemTitle.includes(word)) score += 30;
          if (itemKeywords.some((k: string) => k.toLowerCase().includes(word))) score += 20;
        });

        // Category match
        if (category && item.page_type === category) score += 25;

        return {
          ...item,
          relevance: Math.min(score, 100)
        };
      });

      // Filter and sort by relevance
      const relevant = scoredContent
        .filter(item => item.relevance > 15)
        .sort((a, b) => b.relevance - a.relevance);

      // Group by type
      const services = relevant
        .filter(item => item.page_type === 'service')
        .slice(0, 3)
        .map(item => ({
          url: item.url,
          title: item.title,
          type: item.page_type,
          relevance: item.relevance,
          excerpt: item.excerpt
        }));

      const health = relevant
        .filter(item => item.page_type === 'health-benefit')
        .slice(0, 3)
        .map(item => ({
          url: item.url,
          title: item.title,
          type: item.page_type,
          relevance: item.relevance,
          excerpt: item.excerpt
        }));

      const blogs = relevant
        .filter(item => item.page_type === 'blog')
        .slice(0, 3)
        .map(item => ({
          url: item.url,
          title: item.title,
          type: item.page_type,
          relevance: item.relevance,
          excerpt: item.excerpt
        }));

      setSuggestions({
        services,
        health,
        blogs,
        contact: suggestions.contact
      });
    } catch (error) {
      console.error('Error fetching link suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  return { suggestions, loading };
}

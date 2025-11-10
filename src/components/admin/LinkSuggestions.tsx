import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLinkSuggestions } from '@/hooks/useLinkSuggestions';
import { Link2, Sparkles, ExternalLink } from 'lucide-react';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

interface LinkSuggestionsProps {
  title: string;
  category?: string;
  content?: string;
  onInsertLink: (url: string, text: string) => void;
}

export function LinkSuggestions({ title, category, content, onInsertLink }: LinkSuggestionsProps) {
  const { suggestions, loading } = useLinkSuggestions(title, category, content);
  const [openSections, setOpenSections] = useState<string[]>(['services', 'health', 'contact']);

  const toggleSection = (section: string) => {
    setOpenSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5" />
            Link Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalLinks = 
    suggestions.services.length + 
    suggestions.health.length + 
    suggestions.blogs.length + 
    1; // contact

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-primary" />
          Link Suggestions
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {totalLinks} relevant links found
        </p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {/* Services */}
            {suggestions.services.length > 0 && (
              <Collapsible
                open={openSections.includes('services')}
                onOpenChange={() => toggleSection('services')}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-2 hover:bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Services</Badge>
                      <span className="text-sm font-medium">{suggestions.services.length}</span>
                    </div>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-2">
                  {suggestions.services.map((link) => (
                    <div key={link.url} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{link.title}</p>
                          <p className="text-xs text-muted-foreground">{link.url}</p>
                          {link.excerpt && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {link.excerpt}
                            </p>
                          )}
                        </div>
                        <Badge variant="outline" className="shrink-0">
                          {link.relevance}%
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => onInsertLink(link.url, link.title)}
                      >
                        <Link2 className="h-3 w-3 mr-2" />
                        Insert Link
                      </Button>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Health Benefits */}
            {suggestions.health.length > 0 && (
              <Collapsible
                open={openSections.includes('health')}
                onOpenChange={() => toggleSection('health')}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-2 hover:bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Health Benefits</Badge>
                      <span className="text-sm font-medium">{suggestions.health.length}</span>
                    </div>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-2">
                  {suggestions.health.map((link) => (
                    <div key={link.url} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{link.title}</p>
                          <p className="text-xs text-muted-foreground">{link.url}</p>
                          {link.excerpt && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {link.excerpt}
                            </p>
                          )}
                        </div>
                        <Badge variant="outline" className="shrink-0">
                          {link.relevance}%
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => onInsertLink(link.url, link.title)}
                      >
                        <Link2 className="h-3 w-3 mr-2" />
                        Insert Link
                      </Button>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Blog Posts */}
            {suggestions.blogs.length > 0 && (
              <Collapsible
                open={openSections.includes('blogs')}
                onOpenChange={() => toggleSection('blogs')}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-2 hover:bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Related Posts</Badge>
                      <span className="text-sm font-medium">{suggestions.blogs.length}</span>
                    </div>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-2">
                  {suggestions.blogs.map((link) => (
                    <div key={link.url} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{link.title}</p>
                          <p className="text-xs text-muted-foreground">{link.url}</p>
                          {link.excerpt && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {link.excerpt}
                            </p>
                          )}
                        </div>
                        <Badge variant="outline" className="shrink-0">
                          {link.relevance}%
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => onInsertLink(link.url, link.title)}
                      >
                        <Link2 className="h-3 w-3 mr-2" />
                        Insert Link
                      </Button>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Contact (Always shown) */}
            <Collapsible
              open={openSections.includes('contact')}
              onOpenChange={() => toggleSection('contact')}
            >
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between p-2 hover:bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Required</Badge>
                    <span className="text-sm font-medium">Contact Page</span>
                  </div>
                  <ExternalLink className="h-4 w-4" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-2">
                <div className="border rounded-lg p-3 space-y-2 bg-primary/5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{suggestions.contact.title}</p>
                      <p className="text-xs text-muted-foreground">{suggestions.contact.url}</p>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      Required
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    variant="default"
                    className="w-full"
                    onClick={() => onInsertLink(suggestions.contact.url, suggestions.contact.title)}
                  >
                    <Link2 className="h-3 w-3 mr-2" />
                    Insert Link
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

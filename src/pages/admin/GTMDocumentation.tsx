import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, CheckCircle, Copy, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  GTM_CONTAINER_ID,
  GA4_PRIMARY,
  GA4_SECONDARY,
  VARIABLES,
  TRIGGERS,
  TAGS,
  TESTING_METHODS,
  TROUBLESHOOTING
} from '@/constants/gtmConfig';
import { VariableCard } from '@/components/admin/gtm/VariableCard';
import { TriggerCard } from '@/components/admin/gtm/TriggerCard';
import { TagCard } from '@/components/admin/gtm/TagCard';
import { TestingCard } from '@/components/admin/gtm/TestingCard';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function GTMDocumentation() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(label);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const configTags = TAGS.filter(tag => tag.isConfig);
  const eventTags = TAGS.filter(tag => !tag.isConfig);

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Google Tag Manager Setup Guide</h1>
        <p className="text-muted-foreground">
          Complete documentation for configuring GTM with dual GA4 properties
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          <TabsTrigger value="variables">Variables</TabsTrigger>
          <TabsTrigger value="triggers">Triggers</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">GTM Container</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold font-mono">{GTM_CONTAINER_ID}</p>
                    <Badge variant="default" className="mt-2">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Installed
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(GTM_CONTAINER_ID, 'Container ID')}
                  >
                    {copiedId === 'Container ID' ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Primary GA4</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold font-mono">{GA4_PRIMARY}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(GA4_PRIMARY, 'Primary GA4')}
                  >
                    {copiedId === 'Primary GA4' ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Secondary GA4</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold font-mono">{GA4_SECONDARY}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(GA4_SECONDARY, 'Secondary GA4')}
                  >
                    {copiedId === 'Secondary GA4' ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Variables</CardTitle>
                <CardDescription>Data Layer Variables needed</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{VARIABLES.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Total to create</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Triggers</CardTitle>
                <CardDescription>Custom Event Triggers needed</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{TRIGGERS.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Total to create</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tags</CardTitle>
                <CardDescription>Configuration + Event Tags</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{TAGS.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Total to create</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button
                variant="default"
                onClick={() => window.open('https://tagmanager.google.com/', '_blank')}
              >
                Open GTM Dashboard
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(`https://analytics.google.com/analytics/web/#/p${GA4_PRIMARY.replace('G-', '')}/reports/intelligenthome`, '_blank')}
              >
                Open Primary GA4
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(`https://analytics.google.com/analytics/web/#/p${GA4_SECONDARY.replace('G-', '')}/reports/intelligenthome`, '_blank')}
              >
                Open Secondary GA4
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Workspace Tab */}
        <TabsContent value="workspace" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Container Information</CardTitle>
              <CardDescription>Your GTM container is installed and ready</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm font-medium">Container ID</p>
                  <p className="text-xl font-mono mt-1">{GTM_CONTAINER_ID}</p>
                </div>
                <Badge variant="default" className="ml-4">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm font-medium">Container Name</p>
                  <p className="text-xl mt-1">saunasplus.com</p>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  variant="default"
                  onClick={() => window.open('https://tagmanager.google.com/', '_blank')}
                >
                  Open in GTM
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>GA4 Properties Configuration</CardTitle>
              <CardDescription>Two GA4 properties tracking this website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <Badge>Primary Property</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(GA4_PRIMARY, 'Primary GA4')}
                  >
                    {copiedId === 'Primary GA4' ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-lg font-mono">{GA4_PRIMARY}</p>
                <p className="text-sm text-muted-foreground">Main analytics property</p>
              </div>

              <div className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Secondary Property</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(GA4_SECONDARY, 'Secondary GA4')}
                  >
                    {copiedId === 'Secondary GA4' ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-lg font-mono">{GA4_SECONDARY}</p>
                <p className="text-sm text-muted-foreground">Backup analytics property</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Variables Tab */}
        <TabsContent value="variables" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Layer Variables</CardTitle>
              <CardDescription>
                Create these {VARIABLES.length} Data Layer Variables to capture event data
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {VARIABLES.map((variable) => (
              <VariableCard key={variable.name} variable={variable} />
            ))}
          </div>
        </TabsContent>

        {/* Triggers Tab */}
        <TabsContent value="triggers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Event Triggers</CardTitle>
              <CardDescription>
                Create these {TRIGGERS.length} Custom Event Triggers to fire your tags
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="space-y-4">
            {TRIGGERS.map((trigger) => (
              <TriggerCard key={trigger.name} trigger={trigger} />
            ))}
          </div>
        </TabsContent>

        {/* Tags Tab */}
        <TabsContent value="tags" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuration Tags</CardTitle>
              <CardDescription>
                Create these 2 GA4 Configuration tags first - they must fire on all pages
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {configTags.map((tag) => (
              <TagCard key={tag.name} tag={tag} />
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Event Tags</CardTitle>
              <CardDescription>
                Create these {eventTags.length} event tags - 2 tags per event (one for each GA4 property)
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="space-y-4">
            {eventTags.map((tag) => (
              <TagCard key={tag.name} tag={tag} />
            ))}
          </div>

          <Card className="bg-muted">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Important: Publish Your Container
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                After creating all tags, you must publish your GTM container for changes to go live.
              </p>
              <ol className="text-sm space-y-2 list-decimal list-inside">
                <li>Click "Submit" in the top right of GTM</li>
                <li>Add a version name (e.g., "Initial GA4 Setup with Dual Properties")</li>
                <li>Add a description of changes</li>
                <li>Click "Publish"</li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Testing Tab */}
        <TabsContent value="testing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Testing Methods</CardTitle>
              <CardDescription>
                Use these methods to validate your GTM setup before going live
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {TESTING_METHODS.map((method) => (
              <TestingCard key={method.title} method={method} />
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Troubleshooting Common Issues</CardTitle>
              <CardDescription>
                Solutions to common problems you might encounter
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {TROUBLESHOOTING.map((item, index) => (
                  <AccordionItem key={index} value={`issue-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                        {item.issue}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-2">Possible Causes:</p>
                          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                            {item.causes.map((cause, i) => (
                              <li key={i}>{cause}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">Solutions:</p>
                          <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                            {item.solutions.map((solution, i) => (
                              <li key={i}>{solution}</li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

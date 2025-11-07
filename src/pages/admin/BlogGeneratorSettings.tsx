import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { useToast } from '@/hooks/use-toast';
import { Save, Settings2, Clock, Wand2, FileText, CheckCircle, Image } from 'lucide-react';

interface BlogGeneratorSettings {
  id: string;
  schedule_enabled: boolean;
  cron_expression: string;
  topic_prompt: string;
  research_prompt: string;
  outline_prompt: string;
  content_prompt: string;
  fact_check_prompt: string;
  clarity_edit_prompt: string;
  sentence_improve_prompt: string;
  image_suggestions_prompt: string;
  seo_prompt: string;
  use_pro_for_content: boolean;
  use_pro_for_fact_check: boolean;
  target_word_count: number;
  generate_images: boolean;
  max_images: number;
}

export default function BlogGeneratorSettings() {
  const [settings, setSettings] = useState<BlogGeneratorSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_generator_settings')
        .select('*')
        .single();

      if (error) throw error;
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to load settings',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;

    try {
      setSaving(true);
      const { error } = await supabase
        .from('blog_generator_settings')
        .update(settings)
        .eq('id', settings.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Settings saved successfully'
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: keyof BlogGeneratorSettings, value: any) => {
    if (!settings) return;
    setSettings({ ...settings, [key]: value });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No settings found. Please contact support.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings2 className="h-8 w-8" />
            Blog Generator Settings
          </h1>
          <p className="text-muted-foreground mt-1">Configure automated blog generation</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="schedule" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="schedule">
            <Clock className="mr-2 h-4 w-4" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="prompts">
            <FileText className="mr-2 h-4 w-4" />
            Prompts
          </TabsTrigger>
          <TabsTrigger value="models">
            <Wand2 className="mr-2 h-4 w-4" />
            Models
          </TabsTrigger>
          <TabsTrigger value="content">
            <Image className="mr-2 h-4 w-4" />
            Content
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Generation Schedule</CardTitle>
              <CardDescription>
                Configure when automated blog posts are generated
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="schedule-enabled">Enable Automated Generation</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Generate blog posts automatically on schedule
                  </p>
                </div>
                <Switch
                  id="schedule-enabled"
                  checked={settings.schedule_enabled}
                  onCheckedChange={(checked) => updateSetting('schedule_enabled', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cron-expression">Cron Expression</Label>
                <Input
                  id="cron-expression"
                  value={settings.cron_expression}
                  onChange={(e) => updateSetting('cron_expression', e.target.value)}
                  placeholder="0 0,12 * * *"
                />
                <p className="text-sm text-muted-foreground">
                  Current: {settings.cron_expression === '0 0,12 * * *' ? 'Twice daily (12 AM and 12 PM)' : 'Custom schedule'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Examples: "0 */6 * * *" (every 6 hours), "0 9 * * *" (daily at 9 AM)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prompts" className="space-y-4">
          {[
            { key: 'topic_prompt', label: 'Topic Generation', icon: '🎯', description: 'Generates unique blog topic ideas' },
            { key: 'research_prompt', label: 'Research & Information Gathering', icon: '🔍', description: 'Gathers comprehensive information and sources' },
            { key: 'outline_prompt', label: 'Outline Creation', icon: '📝', description: 'Creates detailed article structure' },
            { key: 'content_prompt', label: 'Content Writing', icon: '✍️', description: 'Writes the full blog post' },
            { key: 'fact_check_prompt', label: 'Fact Checking', icon: '✅', description: 'Verifies claims and statistics' },
            { key: 'clarity_edit_prompt', label: 'Clarity Editing', icon: '📖', description: 'Enhances readability and flow' },
            { key: 'sentence_improve_prompt', label: 'Sentence Improvement', icon: '💡', description: 'Improves sentence structure' },
            { key: 'image_suggestions_prompt', label: 'Image Suggestions', icon: '🖼️', description: 'Suggests where to place images' },
            { key: 'seo_prompt', label: 'SEO Metadata', icon: '🔍', description: 'Generates SEO titles and descriptions' },
          ].map((prompt) => (
            <Card key={prompt.key}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>{prompt.icon}</span>
                  {prompt.label}
                </CardTitle>
                <CardDescription>{prompt.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={settings[prompt.key as keyof BlogGeneratorSettings] as string}
                  onChange={(e) => updateSetting(prompt.key as keyof BlogGeneratorSettings, e.target.value)}
                  rows={6}
                  className="font-mono text-sm"
                />
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="models">
          <Card>
            <CardHeader>
              <CardTitle>AI Model Selection</CardTitle>
              <CardDescription>
                Choose which AI models to use for different tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="pro-content">Use Gemini Pro for Content Writing</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Pro model provides higher quality but uses more credits
                  </p>
                </div>
                <Switch
                  id="pro-content"
                  checked={settings.use_pro_for_content}
                  onCheckedChange={(checked) => updateSetting('use_pro_for_content', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="pro-fact-check">Use Gemini Pro for Fact Checking</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Pro model provides more thorough fact verification
                  </p>
                </div>
                <Switch
                  id="pro-fact-check"
                  checked={settings.use_pro_for_fact_check}
                  onCheckedChange={(checked) => updateSetting('use_pro_for_fact_check', checked)}
                />
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">Model Information:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>Gemini Flash</strong>: Fast, efficient, good for most tasks</li>
                  <li>• <strong>Gemini Pro</strong>: Higher quality, better reasoning, more credits</li>
                  <li>• <strong>Gemini Flash Image</strong>: Used for generating images</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Generation Settings</CardTitle>
              <CardDescription>
                Configure content length and image generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="word-count">Target Word Count</Label>
                <Input
                  id="word-count"
                  type="number"
                  value={settings.target_word_count}
                  onChange={(e) => updateSetting('target_word_count', parseInt(e.target.value))}
                  min={1000}
                  max={5000}
                />
                <p className="text-sm text-muted-foreground">
                  Recommended: 1800-2500 words for SEO
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="generate-images">Generate Images</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Automatically generate and insert images into posts
                  </p>
                </div>
                <Switch
                  id="generate-images"
                  checked={settings.generate_images}
                  onCheckedChange={(checked) => updateSetting('generate_images', checked)}
                />
              </div>

              {settings.generate_images && (
                <div className="space-y-2">
                  <Label htmlFor="max-images">Maximum Images Per Post</Label>
                  <Input
                    id="max-images"
                    type="number"
                    value={settings.max_images}
                    onChange={(e) => updateSetting('max_images', parseInt(e.target.value))}
                    min={1}
                    max={10}
                  />
                  <p className="text-sm text-muted-foreground">
                    More images improve engagement but increase generation time
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

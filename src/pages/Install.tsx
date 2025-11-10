import { useState, useEffect } from 'react';
import CleanNavbar from "@/components/navigation/CleanNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeProvider } from "next-themes";
import { 
  Download, 
  Smartphone, 
  Zap, 
  Wifi, 
  CheckCircle2,
  Share2,
  MoreVertical,
  Chrome
} from "lucide-react";
import { toast } from "sonner";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if running on iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      toast.info('Install prompt not available', {
        description: 'Please use your browser menu to install'
      });
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      toast.success('Installing app...', {
        description: 'Check your home screen in a moment!'
      });
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
  };

  const benefits = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant loading and smooth performance optimized for mobile"
    },
    {
      icon: Wifi,
      title: "Works Offline",
      description: "Access key features even without internet connection"
    },
    {
      icon: Smartphone,
      title: "Home Screen Access",
      description: "Launch directly from your phone like a native app"
    }
  ];

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen">
        <CleanNavbar />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container max-w-4xl">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                <Download className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Install Saunas Plus App
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Get the best experience with our Progressive Web App. Fast, reliable, and works offline.
              </p>
            </div>

            {/* Installation Status */}
            {isInstalled ? (
              <Card className="mb-12 border-2 border-green-500/20 bg-green-500/5">
                <CardContent className="flex items-center gap-3 p-6">
                  <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-900 dark:text-green-100">
                      App Already Installed!
                    </h3>
                    <p className="text-sm text-green-700 dark:text-green-200">
                      You're all set. Look for the Saunas Plus icon on your home screen.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="mb-12">
                <CardContent className="p-6">
                  {isIOS ? (
                    // iOS Instructions
                    <div>
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Share2 className="h-5 w-5" />
                        Install on iPhone/iPad
                      </h3>
                      <ol className="space-y-3 text-muted-foreground">
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                            1
                          </span>
                          <span>Tap the <Share2 className="inline h-4 w-4" /> Share button in Safari</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                            2
                          </span>
                          <span>Scroll down and tap "Add to Home Screen"</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                            3
                          </span>
                          <span>Tap "Add" in the top right corner</span>
                        </li>
                      </ol>
                    </div>
                  ) : deferredPrompt ? (
                    // Android with install prompt
                    <div className="text-center">
                      <h3 className="font-semibold text-lg mb-4">Ready to Install</h3>
                      <p className="text-muted-foreground mb-6">
                        Click the button below to add Saunas Plus to your home screen
                      </p>
                      <Button onClick={handleInstall} size="lg" className="gap-2">
                        <Download className="h-5 w-5" />
                        Install App Now
                      </Button>
                    </div>
                  ) : (
                    // Android fallback instructions
                    <div>
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Chrome className="h-5 w-5" />
                        Install on Android
                      </h3>
                      <ol className="space-y-3 text-muted-foreground">
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                            1
                          </span>
                          <span>Tap the <MoreVertical className="inline h-4 w-4" /> menu icon in Chrome</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                            2
                          </span>
                          <span>Select "Add to Home screen" or "Install app"</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                            3
                          </span>
                          <span>Tap "Add" or "Install" to confirm</span>
                        </li>
                      </ol>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <Card key={idx}>
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Additional Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">What is a Progressive Web App?</h3>
                <p className="text-muted-foreground mb-4">
                  A Progressive Web App (PWA) combines the best of websites and mobile apps. 
                  It works like a native app but doesn't require downloading from an app store.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>No app store required - install directly from your browser</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Automatic updates - always get the latest features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Uses less storage than traditional apps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Works on any device with a modern browser</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Install;

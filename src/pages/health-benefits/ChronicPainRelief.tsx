import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Zap, Heart, Phone } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: Activity,
    title: "Arthritis Pain Relief",
    description: "Heat therapy reduces joint stiffness and pain associated with osteoarthritis and rheumatoid arthritis."
  },
  {
    icon: Zap,
    title: "Fibromyalgia Symptom Reduction",
    description: "Consistent sauna use may significantly reduce pain, stiffness, and fatigue in fibromyalgia patients."
  },
  {
    icon: Activity,
    title: "Back Pain Management",
    description: "Deep heat penetration relaxes muscles and reduces inflammation contributing to chronic back pain."
  },
  {
    icon: Heart,
    title: "Headache Relief",
    description: "Improved circulation and stress reduction can decrease frequency and intensity of tension headaches."
  },
  {
    icon: Zap,
    title: "Neuropathic Pain Reduction",
    description: "Heat therapy may help manage nerve pain through improved circulation and reduced inflammation."
  },
  {
    icon: Activity,
    title: "Reduced Need for Pain Medication",
    description: "Regular sauna use may allow some individuals to reduce reliance on pain medications."
  }
];

const ChronicPainRelief = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen">
        <Navigation />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Chronic Pain Relief Through Heat Therapy</h1>
            <p className="text-xl text-muted-foreground mb-12">
              Natural Pain Management Solutions
            </p>
            
            <div className="mb-12">
              <p className="text-lg text-muted-foreground">
                Regular sauna use provides significant relief for various types of chronic pain through improved circulation, reduced inflammation, and muscle relaxation.
              </p>
            </div>

            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-8">Key Benefits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <Card key={index} className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                          <p className="text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            <Card className="p-8 mb-16">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Heat therapy works through multiple mechanisms to reduce pain. First, heat increases blood flow to affected areas, delivering oxygen and nutrients while removing inflammatory compounds and metabolic waste products.
                </p>
                <p>
                  The deep, penetrating heat causes muscles to relax, reducing tension and spasm that contribute to many types of pain. Heat also reduces nerve sensitivity, decreasing pain signal transmission.
                </p>
                <p>
                  Sauna use triggers endorphin release—the body's natural painkillers—providing relief without medication. The relaxation and stress reduction effects also help break the pain-stress cycle that can worsen chronic pain.
                </p>
                <p>
                  For inflammatory conditions like arthritis, the anti-inflammatory effects of regular heat exposure can reduce pain and improve joint mobility over time.
                </p>
              </div>
            </Card>

            <Card className="p-8 mb-16">
              <h2 className="text-3xl font-bold mb-4">Scientific Evidence</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Studies on rheumatoid arthritis patients show significant pain reduction and improved mobility with regular sauna therapy.
                </p>
                <p>
                  Research on fibromyalgia patients demonstrated reduced pain scores and improved quality of life with infrared sauna use.
                </p>
                <p>
                  Clinical trials show heat therapy effective for chronic low back pain, providing relief comparable to some medications.
                </p>
              </div>
            </Card>

            <Card className="p-8 mb-16 border-l-4 border-l-amber-500">
              <h2 className="text-2xl font-bold mb-4">Safety Considerations</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Consult physician about your specific condition</li>
                <li>Start with shorter, cooler sessions</li>
                <li>Avoid if experiencing acute injury or inflammation</li>
                <li>Stay hydrated</li>
                <li>Combine with other pain management strategies</li>
                <li>Stop if pain increases</li>
              </ul>
            </Card>

            <Card className="p-8 mb-16">
              <h2 className="text-3xl font-bold mb-4">Best Practices</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Use 3-4 times per week</li>
                <li>20-30 minute sessions</li>
                <li>Moderate temperatures</li>
                <li>Follow with gentle stretching</li>
                <li>Track pain levels</li>
                <li>Be consistent</li>
                <li>Combine with physical therapy</li>
              </ul>
            </Card>

            <Card className="p-8 md:p-12 bg-primary text-primary-foreground">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Find Natural Pain Relief</h2>
                <p className="text-lg mb-6 text-primary-foreground/90">
                  Contact us today to learn how a custom sauna can help manage your chronic pain.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button size="lg" variant="secondary">
                      Get Free Consultation
                    </Button>
                  </Link>
                  <a href="tel:+16782459966">
                    <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                      <Phone className="mr-2 h-5 w-5" /> Call (678) 245-9966
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </section>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default ChronicPainRelief;

import CleanNavbar from "@/components/navigation/CleanNavbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Smile, Users, Activity, Phone } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: Brain,
    title: "Depression Symptom Reduction",
    description: "Heat therapy has been shown to reduce symptoms of major depressive disorder."
  },
  {
    icon: Heart,
    title: "Anxiety Relief",
    description: "Reduced stress hormones and increased endorphins help alleviate anxiety symptoms."
  },
  {
    icon: Activity,
    title: "Improved Emotional Regulation",
    description: "Better stress management supports more stable moods and emotional responses."
  },
  {
    icon: Smile,
    title: "Enhanced Sense of Wellbeing",
    description: "Endorphin release and relaxation create feelings of contentment and happiness."
  },
  {
    icon: Brain,
    title: "Reduced Rumination",
    description: "The mindful environment breaks patterns of negative thinking."
  },
  {
    icon: Users,
    title: "Social Connection",
    description: "Shared sauna experiences support mental health through social bonding."
  }
];

const MentalHealth = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen">
        <CleanNavbar />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Mental Health & Mood Improvement</h1>
            <p className="text-xl text-muted-foreground mb-12">
              Natural Support for Emotional Wellbeing
            </p>
            
            <div className="mb-12">
              <p className="text-lg text-muted-foreground">
                Regular sauna use can significantly improve mental health and mood through neurochemical changes, stress reduction, and mindfulness promotion.
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
                  Sauna use affects mental health through multiple pathways. Heat exposure triggers significant increases in endorphins and other feel-good neurotransmitters, providing natural mood elevation.
                </p>
                <p>
                  The activation of the parasympathetic nervous system during and after sauna use promotes deep relaxation, counteracting the fight-or-flight response associated with anxiety and depression.
                </p>
                <p>
                  Regular sauna use reduces cortisol and other stress hormones that, when chronically elevated, contribute to mood disorders. This hormonal rebalancing supports mental health.
                </p>
                <p>
                  The sauna environment promotes mindfulness—being present in the moment—which has been shown to reduce symptoms of depression and anxiety. The enforced period of stillness and relaxation provides valuable respite for the mind.
                </p>
                <p>
                  Heat exposure may also increase production of brain-derived neurotrophic factor (BDNF), a protein that supports the growth and maintenance of neurons and is often reduced in depression.
                </p>
              </div>
            </Card>

            <Card className="p-8 mb-16">
              <h2 className="text-3xl font-bold mb-4">Scientific Evidence</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  A clinical trial published in JAMA Psychiatry found that a single session of whole-body hyperthermia significantly reduced depression symptoms, with effects lasting six weeks.
                </p>
                <p>
                  Finnish research found frequent sauna users had substantially lower rates of psychotic disorders.
                </p>
                <p>
                  Studies show improvements in mood, anxiety, and stress levels following regular sauna use.
                </p>
              </div>
            </Card>

            <Card className="p-8 mb-16 border-l-4 border-l-amber-500">
              <h2 className="text-2xl font-bold mb-4">Safety Considerations</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Not a replacement for professional mental health treatment</li>
                <li>Consult mental health provider</li>
                <li>Can be complementary to therapy and medication</li>
                <li>Avoid if experiencing severe mental health crisis</li>
                <li>Use as part of comprehensive treatment plan</li>
              </ul>
            </Card>

            <Card className="p-8 mb-16">
              <h2 className="text-3xl font-bold mb-4">Best Practices</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Regular, consistent use</li>
                <li>15-20 minute sessions</li>
                <li>Create peaceful ritual</li>
                <li>Practice mindfulness</li>
                <li>3-4 times per week</li>
                <li>Combine with other mental health strategies</li>
                <li>Track mood improvements</li>
              </ul>
            </Card>

            <Card className="p-8 md:p-12 bg-primary text-primary-foreground">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Support Your Mental Wellbeing</h2>
                <p className="text-lg mb-6 text-primary-foreground/90">
                  Contact us today to learn how a custom sauna can enhance your mental health and mood.
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

export default MentalHealth;

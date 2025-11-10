import { useEffect, useState } from 'react';
import CleanNavbar from "@/components/navigation/CleanNavbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Wrench, Heart, Phone, Mail, Shield, CheckCircle } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { SocialMetaTags, aboutPageMeta } from "@/components/seo/SocialMetaTags";
import { supabase } from '@/integrations/supabase/client';
import luxurySauna from "@/assets/luxury-sauna.jpg";

const values = [
  {
    icon: Award,
    title: "Quality Craftsmanship",
    description: "We take pride in every installation, using only premium materials and proven techniques to ensure lasting quality."
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Your vision and satisfaction drive everything we do. We listen, collaborate, and deliver solutions that exceed expectations."
  },
  {
    icon: Wrench,
    title: "Expert Installation",
    description: "With over 20 years of experience, our certified technicians bring unmatched expertise to every project."
  },
  {
    icon: Heart,
    title: "Wellness Focus",
    description: "We believe in the transformative power of sauna therapy and are passionate about bringing wellness into homes."
  }
];

const milestones = [
  { year: "2004", event: "Saunas Plus founded in Atlanta" },
  { year: "2010", event: "Expanded to commercial installations" },
  { year: "2015", event: "Reached 500+ successful installations" },
  { year: "2020", event: "Introduced steam shower services" },
  { year: "2024", event: "Over 1,000 satisfied customers" }
];

const About = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await supabase
        .from('owner_profile')
        .select('*')
        .single();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching owner profile:', error);
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <SocialMetaTags {...aboutPageMeta} />
      <div className="min-h-screen">
        <CleanNavbar />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">About Saunas Plus</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Bringing authentic sauna experiences to homes and businesses across Atlanta for over 20 years.
              </p>
            </div>
            
            {/* Owner Profile Section */}
            {profile && (
              <Card className="p-8 md:p-12 mb-20 bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="grid md:grid-cols-[300px_1fr] gap-8 items-start">
                  <div>
                    {profile.photo_url ? (
                      <img
                        src={profile.photo_url}
                        alt={profile.full_name}
                        className="w-full aspect-square object-cover rounded-lg shadow-lg"
                      />
                    ) : (
                      <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                        <span className="text-6xl font-bold text-primary/40">
                          {profile.full_name.charAt(0)}
                        </span>
                      </div>
                    )}
                    
                    {/* Contact Info */}
                    <div className="mt-6 space-y-3">
                      {profile.phone && (
                        <Button variant="default" className="w-full" asChild>
                          <a href={`tel:${profile.phone}`}>
                            <Phone className="h-4 w-4 mr-2" />
                            {profile.phone}
                          </a>
                        </Button>
                      )}
                      {profile.email && (
                        <Button variant="outline" className="w-full" asChild>
                          <a href={`mailto:${profile.email}`}>
                            <Mail className="h-4 w-4 mr-2" />
                            Email {profile.full_name.split(' ')[0]}
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="mb-6">
                      <h2 className="text-4xl font-bold mb-2">{profile.full_name}</h2>
                      <p className="text-xl text-primary font-medium mb-4">{profile.title}</p>
                      {profile.years_of_experience && (
                        <Badge variant="secondary" className="text-base py-1 px-3">
                          <Award className="h-4 w-4 mr-1" />
                          {profile.years_of_experience}+ Years Experience
                        </Badge>
                      )}
                    </div>

                    {profile.bio && (
                      <div className="prose prose-lg max-w-none mb-6">
                        <p className="text-muted-foreground whitespace-pre-line">{profile.bio}</p>
                      </div>
                    )}

                    {/* Certifications */}
                    {profile.certifications && profile.certifications.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          Certifications
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {profile.certifications.map((cert: string, idx: number) => (
                            <Badge key={idx} variant="outline">{cert}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Specialties */}
                    {profile.specialties && profile.specialties.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">Areas of Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                          {profile.specialties.map((specialty: string, idx: number) => (
                            <Badge key={idx} variant="secondary">{specialty}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Trust Signals */}
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                      {profile.insurance_info && (
                        <div className="flex items-start gap-2">
                          <Shield className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <div className="font-medium text-sm">Insurance</div>
                            <div className="text-sm text-muted-foreground">{profile.insurance_info}</div>
                          </div>
                        </div>
                      )}
                      {profile.bbb_rating && (
                        <div className="flex items-start gap-2">
                          <Award className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <div className="font-medium text-sm">BBB Rating</div>
                            <div className="text-sm text-muted-foreground">{profile.bbb_rating}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            )}
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h2 className="text-4xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    Founded in 2004, Saunas Plus began with a simple mission: to bring the authentic Finnish sauna experience to homes across the Atlanta area. What started as a small operation has grown into the region's most trusted sauna installation company.
                  </p>
                  <p>
                    Our founder, Grayson, discovered the transformative power of sauna therapy while traveling in Scandinavia. Inspired by the tradition and the profound health benefits, he committed to bringing this experience to his community with the highest standards of quality and craftsmanship.
                  </p>
                  <p>
                    Today, we've completed over 1,000 installations, each one a testament to our commitment to excellence. Every project receives the same attention to detail and personalized care, whether it's a compact home sauna or a large commercial installation.
                  </p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src={luxurySauna} 
                  alt="Luxury Sauna" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="mb-20">
              <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <Card key={index} className="p-6 text-center hover:shadow-xl transition-shadow">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4">
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </Card>
                  );
                })}
              </div>
            </div>
            
            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-12 text-center">Our Journey</h2>
              <div className="max-w-3xl mx-auto">
                <div className="relative border-l-2 border-accent/30 pl-8 space-y-8">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-[41px] w-6 h-6 rounded-full bg-accent border-4 border-background" />
                      <div className="text-accent font-bold text-xl mb-2">{milestone.year}</div>
                      <div className="text-lg">{milestone.event}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <Card className="p-8 md:p-12 bg-accent/5 border-accent/20">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Let's Build Something Amazing Together</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Experience the difference that two decades of expertise and passion can make in your sauna project.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    Get Free Consultation
                  </Button>
                  <Button size="lg" variant="outline">
                    View Our Work
                  </Button>
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

export default About;

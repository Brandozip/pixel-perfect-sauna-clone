import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function MeetTheOwner() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('owner_profile')
        .select('*')
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching owner profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !profile) return null;

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container">
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Photo Section */}
            <div className="relative h-96 md:h-auto">
              {profile.photo_url ? (
                <img
                  src={profile.photo_url}
                  alt={profile.full_name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-8xl font-bold text-primary/40">
                    {profile.full_name.charAt(0)}
                  </div>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-4">
                <h2 className="text-4xl font-bold mb-2">Meet {profile.full_name}</h2>
                <p className="text-xl text-primary font-medium">{profile.title}</p>
              </div>

              {profile.short_bio && (
                <p className="text-lg text-muted-foreground mb-6">
                  {profile.short_bio}
                </p>
              )}

              {/* Trust Signals */}
              <div className="space-y-3 mb-6">
                {profile.years_of_experience && (
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    <span className="font-medium">{profile.years_of_experience}+ Years of Experience</span>
                  </div>
                )}
                {profile.response_time_guarantee && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>Responds {profile.response_time_guarantee}</span>
                  </div>
                )}
              </div>

              {/* Certifications */}
              {profile.certifications && profile.certifications.length > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {profile.certifications.map((cert: string, idx: number) => (
                      <Badge key={idx} variant="secondary">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact */}
              <div className="flex flex-col sm:flex-row gap-3">
                {profile.phone && (
                  <Button variant="default" asChild>
                    <a href={`tel:${profile.phone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call {profile.full_name}
                    </a>
                  </Button>
                )}
                <Button variant="outline" asChild>
                  <Link to="/about">
                    Learn More About Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

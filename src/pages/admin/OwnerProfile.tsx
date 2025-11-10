import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useOwnerProfile } from '@/hooks/useOwnerProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function OwnerProfile() {
  const { uploading, uploadPhoto, updateProfile } = useOwnerProfile();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Form state
  const [fullName, setFullName] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [shortBio, setShortBio] = useState('');
  const [yearsExp, setYearsExp] = useState(20);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [certifications, setCertifications] = useState<string[]>([]);
  const [newCert, setNewCert] = useState('');
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [newSpecialty, setNewSpecialty] = useState('');
  const [licenseNumbers, setLicenseNumbers] = useState<string[]>([]);
  const [newLicense, setNewLicense] = useState('');
  const [insuranceInfo, setInsuranceInfo] = useState('');
  const [bbbRating, setBbbRating] = useState('');
  const [responseTime, setResponseTime] = useState('');
  const [favoriteProject, setFavoriteProject] = useState('');
  const [personalSauna, setPersonalSauna] = useState('');
  const [communityInvolvement, setCommunityInvolvement] = useState('');

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

      if (data) {
        setProfile(data);
        setFullName(data.full_name || '');
        setTitle(data.title || '');
        setBio(data.bio || '');
        setShortBio(data.short_bio || '');
        setYearsExp(data.years_of_experience || 20);
        setPhone(data.phone || '');
        setEmail(data.email || '');
        setCertifications(data.certifications || []);
        setSpecialties(data.specialties || []);
        setLicenseNumbers(data.license_numbers || []);
        setInsuranceInfo(data.insurance_info || '');
        setBbbRating(data.bbb_rating || '');
        setResponseTime(data.response_time_guarantee || '');
        setFavoriteProject(data.favorite_project_description || '');
        setPersonalSauna(data.personal_sauna_details || '');
        setCommunityInvolvement(data.community_involvement || '');
        setPhotoPreview(data.photo_url || null);
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!profile) return;

    setSaving(true);
    try {
      let photoUrl = profile.photo_url;

      // Upload new photo if selected
      if (photoFile) {
        const uploadedUrl = await uploadPhoto(photoFile);
        if (uploadedUrl) {
          photoUrl = uploadedUrl;
        }
      }

      const success = await updateProfile(profile.id, {
        full_name: fullName,
        title,
        bio,
        short_bio: shortBio,
        years_of_experience: yearsExp,
        photo_url: photoUrl,
        phone,
        email,
        certifications,
        specialties,
        license_numbers: licenseNumbers,
        insurance_info: insuranceInfo,
        bbb_rating: bbbRating,
        response_time_guarantee: responseTime,
        favorite_project_description: favoriteProject,
        personal_sauna_details: personalSauna,
        community_involvement: communityInvolvement,
      });

      if (success) {
        await fetchProfile();
        setPhotoFile(null);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Owner Profile</h1>
        <p className="text-muted-foreground">Manage your personal profile and business credentials</p>
      </div>

      <div className="space-y-6">
        {/* Photo Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Photo</CardTitle>
            <CardDescription>Upload a professional headshot for your profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-6">
              <Avatar className="h-32 w-32">
                <AvatarImage src={photoPreview || undefined} />
                <AvatarFallback className="text-2xl">{fullName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  disabled={uploading}
                  className="mb-2"
                />
                <p className="text-sm text-muted-foreground">
                  Recommended: Square image, at least 400x400px
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Owner & Founder"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="shortBio">Short Bio (for homepage)</Label>
              <Textarea
                id="shortBio"
                value={shortBio}
                onChange={(e) => setShortBio(e.target.value)}
                rows={2}
                placeholder="A brief introduction for the homepage"
              />
            </div>
            <div>
              <Label htmlFor="bio">Full Biography</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={6}
                placeholder="Your complete story and background"
              />
            </div>
            <div>
              <Label htmlFor="yearsExp">Years of Experience</Label>
              <Input
                id="yearsExp"
                type="number"
                value={yearsExp}
                onChange={(e) => setYearsExp(parseInt(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="owner@saunasplus.com"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="responseTime">Response Time Guarantee</Label>
              <Input
                id="responseTime"
                value={responseTime}
                onChange={(e) => setResponseTime(e.target.value)}
                placeholder="Within 24 hours"
              />
            </div>
          </CardContent>
        </Card>

        {/* Credentials */}
        <Card>
          <CardHeader>
            <CardTitle>Certifications & Credentials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Certifications</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newCert}
                  onChange={(e) => setNewCert(e.target.value)}
                  placeholder="Add certification"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newCert.trim()) {
                      setCertifications([...certifications, newCert.trim()]);
                      setNewCert('');
                    }
                  }}
                />
                <Button
                  type="button"
                  size="icon"
                  onClick={() => {
                    if (newCert.trim()) {
                      setCertifications([...certifications, newCert.trim()]);
                      setNewCert('');
                    }
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert, idx) => (
                  <Badge key={idx} variant="secondary" className="gap-1">
                    {cert}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setCertifications(certifications.filter((_, i) => i !== idx))}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>License Numbers</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newLicense}
                  onChange={(e) => setNewLicense(e.target.value)}
                  placeholder="Add license number"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newLicense.trim()) {
                      setLicenseNumbers([...licenseNumbers, newLicense.trim()]);
                      setNewLicense('');
                    }
                  }}
                />
                <Button
                  type="button"
                  size="icon"
                  onClick={() => {
                    if (newLicense.trim()) {
                      setLicenseNumbers([...licenseNumbers, newLicense.trim()]);
                      setNewLicense('');
                    }
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {licenseNumbers.map((license, idx) => (
                  <Badge key={idx} variant="secondary" className="gap-1">
                    {license}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setLicenseNumbers(licenseNumbers.filter((_, i) => i !== idx))}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="insuranceInfo">Insurance Information</Label>
                <Input
                  id="insuranceInfo"
                  value={insuranceInfo}
                  onChange={(e) => setInsuranceInfo(e.target.value)}
                  placeholder="Fully insured and bonded"
                />
              </div>
              <div>
                <Label htmlFor="bbbRating">BBB Rating</Label>
                <Input
                  id="bbbRating"
                  value={bbbRating}
                  onChange={(e) => setBbbRating(e.target.value)}
                  placeholder="A+"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Specialties */}
        <Card>
          <CardHeader>
            <CardTitle>Specialties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Areas of Expertise</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  placeholder="Add specialty"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newSpecialty.trim()) {
                      setSpecialties([...specialties, newSpecialty.trim()]);
                      setNewSpecialty('');
                    }
                  }}
                />
                <Button
                  type="button"
                  size="icon"
                  onClick={() => {
                    if (newSpecialty.trim()) {
                      setSpecialties([...specialties, newSpecialty.trim()]);
                      setNewSpecialty('');
                    }
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {specialties.map((specialty, idx) => (
                  <Badge key={idx} variant="secondary" className="gap-1">
                    {specialty}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setSpecialties(specialties.filter((_, i) => i !== idx))}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Details */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="favoriteProject">Favorite Project Description</Label>
              <Textarea
                id="favoriteProject"
                value={favoriteProject}
                onChange={(e) => setFavoriteProject(e.target.value)}
                rows={3}
                placeholder="Describe your favorite or most memorable project"
              />
            </div>
            <div>
              <Label htmlFor="personalSauna">Personal Sauna Details</Label>
              <Textarea
                id="personalSauna"
                value={personalSauna}
                onChange={(e) => setPersonalSauna(e.target.value)}
                rows={3}
                placeholder="Tell customers about your own sauna at home"
              />
            </div>
            <div>
              <Label htmlFor="communityInvolvement">Community Involvement</Label>
              <Textarea
                id="communityInvolvement"
                value={communityInvolvement}
                onChange={(e) => setCommunityInvolvement(e.target.value)}
                rows={3}
                placeholder="How you're involved in the local community"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={fetchProfile}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving || uploading}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Profile'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface OwnerProfileData {
  full_name: string;
  title: string;
  bio: string;
  short_bio?: string;
  years_of_experience: number;
  photo_url?: string;
  certifications: string[];
  license_numbers: string[];
  insurance_info?: string;
  bbb_rating?: string;
  phone?: string;
  email?: string;
  response_time_guarantee?: string;
  specialties: string[];
  favorite_project_description?: string;
  personal_sauna_details?: string;
  community_involvement?: string;
}

export function useOwnerProfile() {
  const [uploading, setUploading] = useState(false);

  const uploadPhoto = async (file: File): Promise<string | null> => {
    try {
      setUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError, data } = await supabase.storage
        .from('owner-photos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('owner-photos')
        .getPublicUrl(filePath);

      toast.success('Photo uploaded successfully');
      return publicUrl;
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload photo');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const updateProfile = async (profileId: string, data: Partial<OwnerProfileData>) => {
    try {
      const { error } = await supabase
        .from('owner_profile')
        .update(data)
        .eq('id', profileId);

      if (error) throw error;

      toast.success('Profile updated successfully');
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
      return false;
    }
  };

  const deletePhoto = async (photoUrl: string) => {
    try {
      const path = photoUrl.split('/owner-photos/')[1];
      if (!path) return false;

      const { error } = await supabase.storage
        .from('owner-photos')
        .remove([path]);

      if (error) throw error;

      toast.success('Photo deleted successfully');
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete photo');
      return false;
    }
  };

  return {
    uploading,
    uploadPhoto,
    updateProfile,
    deletePhoto,
  };
}

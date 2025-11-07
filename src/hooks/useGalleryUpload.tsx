import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface GalleryImageMetadata {
  title: string;
  alt_text: string;
  description?: string;
  category: string;
  seo_keywords?: string;
  seo_title?: string;
  seo_description?: string;
  project_details?: Record<string, any>;
  is_published: boolean;
  featured: boolean;
}

export function useGalleryUpload() {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadImage = async (file: File, metadata: GalleryImageMetadata) => {
    setUploading(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      // Upload to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(filePath);

      // Save metadata to database
      const { data, error: dbError } = await supabase
        .from('gallery_images')
        .insert([{
          image_url: publicUrl,
          title: metadata.title,
          alt_text: metadata.alt_text,
          description: metadata.description || null,
          category: metadata.category,
          seo_keywords: metadata.seo_keywords || null,
          seo_title: metadata.seo_title || null,
          seo_description: metadata.seo_description || null,
          project_details: metadata.project_details || null,
          is_published: metadata.is_published,
          featured: metadata.featured,
        }])
        .select()
        .single();

      if (dbError) throw dbError;

      toast({
        title: 'Upload Successful',
        description: 'Image uploaded and saved to gallery',
      });

      return data;
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload Failed',
        description: 'Failed to upload image. Please try again.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (imageId: string, imageUrl: string) => {
    try {
      // Extract filename from URL
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('gallery-images')
        .remove([fileName]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', imageId);

      if (dbError) throw dbError;

      toast({
        title: 'Image Deleted',
        description: 'Image removed from gallery',
      });

      return true;
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: 'Delete Failed',
        description: 'Failed to delete image. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  };

  const updateImage = async (imageId: string, metadata: Partial<GalleryImageMetadata>) => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .update(metadata)
        .eq('id', imageId)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Image Updated',
        description: 'Image metadata updated successfully',
      });

      return data;
    } catch (error) {
      console.error('Update error:', error);
      toast({
        title: 'Update Failed',
        description: 'Failed to update image. Please try again.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return {
    uploading,
    uploadImage,
    deleteImage,
    updateImage,
  };
}

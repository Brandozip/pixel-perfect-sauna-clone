import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useGalleryUpload } from '@/hooks/useGalleryUpload';
import { migrateGalleryImages } from '@/utils/migrateGalleryImages';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Edit, Trash2, Eye, EyeOff, Image as ImageIcon, Star, Download, Sparkles } from 'lucide-react';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { useToast } from '@/hooks/use-toast';

interface GalleryImage {
  id: string;
  image_url: string;
  title: string;
  alt_text: string;
  description: string | null;
  category: string;
  featured: boolean;
  is_published: boolean;
  seo_keywords: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [imageToDelete, setImageToDelete] = useState<GalleryImage | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageMetadata, setImageMetadata] = useState<Record<number, any>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [migrating, setMigrating] = useState(false);
  const [migrationProgress, setMigrationProgress] = useState({ current: 0, total: 0, message: '' });
  const [generatingBatch, setGeneratingBatch] = useState(false);
  const [batchProgress, setBatchProgress] = useState<Record<number, 'pending' | 'generating' | 'complete' | 'error'>>({});
  const [showBatchProgress, setShowBatchProgress] = useState(false);

  const { uploading, generatingMetadata, uploadImage, deleteImage, updateImage, generateMetadata } = useGalleryUpload();
  const { toast } = useToast();

  // Form state for upload/edit
  const [formData, setFormData] = useState({
    title: '',
    alt_text: '',
    description: '',
    category: 'residential',
    seo_keywords: '',
    seo_title: '',
    seo_description: '',
    is_published: true,
    featured: false,
  });

  const fetchImages = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) return;

    setSelectedFiles(imageFiles);
    
    // Create preview URLs for all files
    const urls: string[] = [];
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        urls.push(reader.result as string);
        if (urls.length === imageFiles.length) {
          setPreviewUrls(urls);
        }
      };
      reader.readAsDataURL(file);
    });
    
    setUploadDialogOpen(true);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(Array.from(e.target.files));
    }
  };

  const handleGenerateMetadata = async () => {
    if (selectedFiles.length === 0) return;

    const metadata = await generateMetadata(selectedFiles[currentImageIndex]);
    
    if (metadata) {
      setImageMetadata(prev => ({
        ...prev,
        [currentImageIndex]: metadata
      }));
      setFormData({
        ...formData,
        title: metadata.title,
        alt_text: metadata.alt_text,
        description: metadata.description,
        category: metadata.suggested_category,
        seo_keywords: metadata.seo_keywords,
        seo_title: metadata.seo_title,
        seo_description: metadata.seo_description,
      });
    }
  };

  const handleGenerateAllMetadata = async () => {
    if (selectedFiles.length === 0) return;

    setGeneratingBatch(true);
    setShowBatchProgress(true);

    // Initialize progress for all images
    const initialProgress: Record<number, 'pending' | 'generating' | 'complete' | 'error'> = {};
    selectedFiles.forEach((_, index) => {
      initialProgress[index] = 'pending';
    });
    setBatchProgress(initialProgress);

    // Generate metadata for each image sequentially
    for (let i = 0; i < selectedFiles.length; i++) {
      setBatchProgress(prev => ({ ...prev, [i]: 'generating' }));

      try {
        const metadata = await generateMetadata(selectedFiles[i]);
        
        if (metadata) {
          setImageMetadata(prev => ({
            ...prev,
            [i]: metadata
          }));
          setBatchProgress(prev => ({ ...prev, [i]: 'complete' }));
        } else {
          setBatchProgress(prev => ({ ...prev, [i]: 'error' }));
        }
      } catch (error) {
        console.error(`Failed to generate metadata for image ${i}:`, error);
        setBatchProgress(prev => ({ ...prev, [i]: 'error' }));
      }

      // Small delay between requests to avoid rate limiting
      if (i < selectedFiles.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    setGeneratingBatch(false);
    
    toast({
      title: 'Batch Generation Complete',
      description: `Generated metadata for ${Object.values(batchProgress).filter(s => s === 'complete').length} images`,
    });
  };

  const handleNextImage = () => {
    if (currentImageIndex < selectedFiles.length - 1) {
      // Save current form data to metadata
      setImageMetadata(prev => ({
        ...prev,
        [currentImageIndex]: formData
      }));
      
      const nextIndex = currentImageIndex + 1;
      setCurrentImageIndex(nextIndex);
      
      // Load metadata for next image if it exists
      if (imageMetadata[nextIndex]) {
        setFormData(imageMetadata[nextIndex]);
      } else {
        resetFormToDefaults();
      }
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      // Save current form data to metadata
      setImageMetadata(prev => ({
        ...prev,
        [currentImageIndex]: formData
      }));
      
      const prevIndex = currentImageIndex - 1;
      setCurrentImageIndex(prevIndex);
      
      // Load metadata for previous image
      if (imageMetadata[prevIndex]) {
        setFormData(imageMetadata[prevIndex]);
      } else {
        resetFormToDefaults();
      }
    }
  };

  const resetFormToDefaults = () => {
    setFormData({
      title: '',
      alt_text: '',
      description: '',
      category: 'residential',
      seo_keywords: '',
      seo_title: '',
      seo_description: '',
      is_published: true,
      featured: false,
    });
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    try {
      // Save current form data for current image
      const finalMetadata = {
        ...imageMetadata,
        [currentImageIndex]: formData
      };

      // Upload all files with their respective metadata
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const savedMetadata = finalMetadata[i];
        
        // Ensure all required fields are present with defaults
        const metadata = {
          title: savedMetadata?.title || `Image ${i + 1}`,
          alt_text: savedMetadata?.alt_text || `Gallery image ${i + 1}`,
          description: savedMetadata?.description || '',
          category: savedMetadata?.category || savedMetadata?.suggested_category || 'residential',
          seo_keywords: savedMetadata?.seo_keywords || '',
          seo_title: savedMetadata?.seo_title || '',
          seo_description: savedMetadata?.seo_description || '',
          is_published: savedMetadata?.is_published ?? true,
          featured: savedMetadata?.featured ?? false,
        };
        
        await uploadImage(file, metadata);
      }
      
      toast({
        title: 'Upload Complete',
        description: `Successfully uploaded ${selectedFiles.length} image${selectedFiles.length > 1 ? 's' : ''}`,
      });
      
      setUploadDialogOpen(false);
      resetForm();
      fetchImages();
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleMigration = async () => {
    setMigrating(true);
    
    try {
      const results = await migrateGalleryImages((current, total, message) => {
        setMigrationProgress({ current, total, message });
      });

      toast({
        title: 'Migration Complete',
        description: `Successfully migrated ${results.success} images. ${results.failed > 0 ? `Failed: ${results.failed}` : ''}`,
        variant: results.failed > 0 ? 'destructive' : 'default',
      });

      if (results.errors.length > 0) {
        console.error('Migration errors:', results.errors);
      }

      fetchImages();
    } catch (error) {
      console.error('Migration failed:', error);
      toast({
        title: 'Migration Failed',
        description: 'Failed to migrate images. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setMigrating(false);
      setMigrationProgress({ current: 0, total: 0, message: '' });
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setSelectedImage(image);
    setFormData({
      title: image.title,
      alt_text: image.alt_text,
      description: image.description || '',
      category: image.category,
      seo_keywords: image.seo_keywords || '',
      seo_title: image.seo_title || '',
      seo_description: image.seo_description || '',
      is_published: image.is_published,
      featured: image.featured,
    });
    setEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedImage) return;

    try {
      await updateImage(selectedImage.id, formData);
      setEditDialogOpen(false);
      fetchImages();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleDeleteClick = (image: GalleryImage) => {
    setImageToDelete(image);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!imageToDelete) return;

    const success = await deleteImage(imageToDelete.id, imageToDelete.image_url);
    if (success) {
      setDeleteDialogOpen(false);
      setImageToDelete(null);
      fetchImages();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      alt_text: '',
      description: '',
      category: 'residential',
      seo_keywords: '',
      seo_title: '',
      seo_description: '',
      is_published: true,
      featured: false,
    });
    setSelectedFiles([]);
    setPreviewUrls([]);
    setSelectedImage(null);
    setCurrentImageIndex(0);
    setImageMetadata({});
    setShowBatchProgress(false);
    setBatchProgress({});
  };

  const filteredImages = images.filter(image => {
    const matchesSearch = 
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || image.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: images.length,
    published: images.filter(i => i.is_published).length,
    featured: images.filter(i => i.featured).length,
    draft: images.filter(i => !i.is_published).length,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gallery Management</h1>
          <p className="text-muted-foreground">Upload and manage gallery images with SEO optimization</p>
        </div>
        <div className="flex gap-2">
          {images.length === 0 && (
            <Button onClick={handleMigration} disabled={migrating} variant="outline">
              {migrating ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Migrating {migrationProgress.current}/{migrationProgress.total}
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Migrate Existing Images
                </>
              )}
            </Button>
          )}
          <Button onClick={() => setUploadDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Images
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Images</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <ImageIcon className="h-8 w-8 text-primary" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Published</p>
              <p className="text-2xl font-bold">{stats.published}</p>
            </div>
            <Eye className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Featured</p>
              <p className="text-2xl font-bold">{stats.featured}</p>
            </div>
            <Star className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Drafts</p>
              <p className="text-2xl font-bold">{stats.draft}</p>
            </div>
            <EyeOff className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="all">All Categories</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="outdoor">Outdoor</option>
            <option value="infrared">Infrared</option>
            <option value="traditional">Traditional</option>
            <option value="steam">Steam Room</option>
          </select>
        </div>
      </Card>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image) => (
          <Card key={image.id} className="overflow-hidden group">
            <div className="relative aspect-square">
              <img
                src={image.image_url}
                alt={image.alt_text}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="sm" variant="secondary" onClick={() => handleEdit(image)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDeleteClick(image)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              {image.featured && (
                <Badge className="absolute top-2 right-2 bg-yellow-500">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
              {!image.is_published && (
                <Badge className="absolute top-2 left-2 bg-muted">
                  Draft
                </Badge>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-semibold truncate">{image.title}</h3>
              <p className="text-sm text-muted-foreground capitalize">{image.category}</p>
            </div>
          </Card>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No images found</p>
        </div>
      )}

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
          </DialogHeader>
          
          {!selectedFiles.length ? (
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center ${
                dragActive ? 'border-primary bg-primary/5' : 'border-muted'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg mb-2">Drag and drop images here</p>
              <p className="text-sm text-muted-foreground mb-2">Supports multiple file upload</p>
              <p className="text-sm text-muted-foreground mb-4">or</p>
              <label htmlFor="file-upload">
                <Button type="button" onClick={() => document.getElementById('file-upload')?.click()}>
                  Choose Files
                </Button>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              {!showBatchProgress ? (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Image {currentImageIndex + 1} of {selectedFiles.length}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handlePrevImage}
                        disabled={currentImageIndex === 0}
                      >
                        Previous
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleNextImage}
                        disabled={currentImageIndex === selectedFiles.length - 1}
                      >
                        Next
                      </Button>
                    </div>
                  </div>

                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={previewUrls[currentImageIndex]} 
                      alt={`Preview ${currentImageIndex + 1}`} 
                      className="w-full h-full object-contain" 
                    />
                    {imageMetadata[currentImageIndex] && (
                      <Badge className="absolute top-2 right-2 bg-green-500">
                        <Star className="h-3 w-3 mr-1" />
                        AI Generated
                      </Badge>
                    )}
                  </div>

                  <div className="border-t pt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Metadata for this image:</p>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleGenerateMetadata}
                          disabled={generatingMetadata}
                        >
                          {generatingMetadata ? (
                            <>
                              <LoadingSpinner size="sm" className="mr-2" />
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-4 w-4 mr-2" />
                              Generate AI Metadata
                            </>
                          )}
                        </Button>
                        {selectedFiles.length > 1 && (
                          <Button
                            type="button"
                            variant="default"
                            size="sm"
                            onClick={handleGenerateAllMetadata}
                            disabled={generatingBatch}
                          >
                            {generatingBatch ? (
                              <>
                                <LoadingSpinner size="sm" className="mr-2" />
                                Generating All...
                              </>
                            ) : (
                              <>
                                <Sparkles className="h-4 w-4 mr-2" />
                                Generate All ({selectedFiles.length})
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Title*</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="Beautiful Sauna Installation"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category*</Label>
                        <select
                          id="category"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          <option value="residential">Residential</option>
                          <option value="commercial">Commercial</option>
                          <option value="outdoor">Outdoor</option>
                          <option value="infrared">Infrared</option>
                          <option value="traditional">Traditional</option>
                          <option value="steam">Steam Room</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="alt_text">Alt Text (SEO)*</Label>
                      <Input
                        id="alt_text"
                        value={formData.alt_text}
                        onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                        placeholder="Describe the image for accessibility and SEO"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Detailed description of the project"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="seo_keywords">SEO Keywords</Label>
                      <Input
                        id="seo_keywords"
                        value={formData.seo_keywords}
                        onChange={(e) => setFormData({ ...formData, seo_keywords: e.target.value })}
                        placeholder="sauna, residential, luxury, custom"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="published"
                          checked={formData.is_published}
                          onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                        />
                        <Label htmlFor="published">Published</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="featured"
                          checked={formData.featured}
                          onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                        />
                        <Label htmlFor="featured">Featured</Label>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Batch Generation Progress</h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowBatchProgress(false)}
                    >
                      Back to Edit
                    </Button>
                  </div>

                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <img 
                            src={previewUrls[index]} 
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {imageMetadata[index]?.title || 'No metadata yet'}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          {batchProgress[index] === 'pending' && (
                            <Badge variant="secondary">Pending</Badge>
                          )}
                          {batchProgress[index] === 'generating' && (
                            <div className="flex items-center gap-2">
                              <LoadingSpinner size="sm" />
                              <Badge variant="secondary">Generating...</Badge>
                            </div>
                          )}
                          {batchProgress[index] === 'complete' && (
                            <Badge className="bg-green-500">
                              <Star className="h-3 w-3 mr-1" />
                              Complete
                            </Badge>
                          )}
                          {batchProgress[index] === 'error' && (
                            <Badge variant="destructive">Error</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setUploadDialogOpen(false);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={selectedFiles.length === 0 || uploading}>
              {uploading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Uploading...
                </>
              ) : (
                `Upload ${selectedFiles.length} Image${selectedFiles.length > 1 ? 's' : ''}`
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog - Similar structure to upload dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {selectedImage && (
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img src={selectedImage.image_url} alt={selectedImage.alt_text} className="w-full h-full object-contain" />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-title">Title*</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category*</Label>
                <select
                  id="edit-category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="outdoor">Outdoor</option>
                  <option value="infrared">Infrared</option>
                  <option value="traditional">Traditional</option>
                  <option value="steam">Steam Room</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="edit-alt">Alt Text (SEO)*</Label>
              <Input
                id="edit-alt"
                value={formData.alt_text}
                onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="edit-keywords">SEO Keywords</Label>
              <Input
                id="edit-keywords"
                value={formData.seo_keywords}
                onChange={(e) => setFormData({ ...formData, seo_keywords: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                />
                <Label htmlFor="edit-published">Published</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
                <Label htmlFor="edit-featured">Featured</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{imageToDelete?.title}"? This action cannot be undone and will remove the image from storage.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Gallery;

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StarRating } from '@/components/ui/star-rating';
import { Edit, Trash2, Eye, EyeOff, Star, CheckCircle, XCircle, Clock, Download } from 'lucide-react';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Review {
  id: string;
  created_at: string;
  author_name: string;
  author_location: string;
  author_avatar_url: string | null;
  rating: number;
  review_text: string;
  project_type: string | null;
  project_date: string | null;
  status: 'pending' | 'approved' | 'rejected';
  is_published: boolean;
  is_featured: boolean;
  admin_notes: string | null;
  source: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    author_name: '',
    author_location: '',
    author_avatar_url: '',
    rating: 5,
    review_text: '',
    project_type: '',
    project_date: '',
    status: 'pending' as 'pending' | 'approved' | 'rejected',
    is_published: false,
    is_featured: false,
    admin_notes: '',
    source: 'website'
  });

  const fetchReviews = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews((data || []) as Review[]);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch reviews',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleCreateNew = () => {
    setSelectedReview(null);
    setFormData({
      author_name: '',
      author_location: '',
      author_avatar_url: '',
      rating: 5,
      review_text: '',
      project_type: '',
      project_date: '',
      status: 'pending',
      is_published: false,
      is_featured: false,
      admin_notes: '',
      source: 'website'
    });
    setCreateDialogOpen(true);
  };

  const handleCreate = async () => {
    if (!formData.author_name || !formData.author_location || !formData.review_text) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('reviews')
        .insert([{
          ...formData,
          published_at: formData.is_published && formData.status === 'approved' ? new Date().toISOString() : null
        }]);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Review created successfully'
      });

      setCreateDialogOpen(false);
      fetchReviews();
    } catch (error) {
      console.error('Create failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to create review',
        variant: 'destructive'
      });
    }
  };

  const handleEdit = (review: Review) => {
    setSelectedReview(review);
    setFormData({
      author_name: review.author_name,
      author_location: review.author_location,
      author_avatar_url: review.author_avatar_url || '',
      rating: review.rating,
      review_text: review.review_text,
      project_type: review.project_type || '',
      project_date: review.project_date || '',
      status: review.status,
      is_published: review.is_published,
      is_featured: review.is_featured,
      admin_notes: review.admin_notes || '',
      source: review.source
    });
    setEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedReview) return;

    try {
      const { error } = await supabase
        .from('reviews')
        .update({
          ...formData,
          published_at: formData.is_published && formData.status === 'approved' ? new Date().toISOString() : null
        })
        .eq('id', selectedReview.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Review updated successfully'
      });

      setEditDialogOpen(false);
      fetchReviews();
    } catch (error) {
      console.error('Update failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to update review',
        variant: 'destructive'
      });
    }
  };

  const handleApprove = async (reviewId: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ 
          status: 'approved',
          published_at: new Date().toISOString()
        })
        .eq('id', reviewId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Review approved'
      });

      fetchReviews();
    } catch (error) {
      console.error('Approval failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to approve review',
        variant: 'destructive'
      });
    }
  };

  const handleReject = async (reviewId: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ status: 'rejected' })
        .eq('id', reviewId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Review rejected'
      });

      fetchReviews();
    } catch (error) {
      console.error('Rejection failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to reject review',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteClick = (review: Review) => {
    setReviewToDelete(review);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!reviewToDelete) return;

    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewToDelete.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Review deleted successfully'
      });

      setDeleteDialogOpen(false);
      setReviewToDelete(null);
      fetchReviews();
    } catch (error) {
      console.error('Delete failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete review',
        variant: 'destructive'
      });
    }
  };

  const handleExportCSV = () => {
    const headers = ['Date', 'Author', 'Location', 'Rating', 'Review', 'Status', 'Published', 'Featured', 'Source'];
    const rows = filteredReviews.map(review => [
      format(new Date(review.created_at), 'yyyy-MM-dd'),
      review.author_name,
      review.author_location,
      review.rating,
      `"${review.review_text.replace(/"/g, '""')}"`,
      review.status,
      review.is_published ? 'Yes' : 'No',
      review.is_featured ? 'Yes' : 'No',
      review.source
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reviews-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.author_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.review_text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.author_location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    const matchesRating = ratingFilter === 'all' || review.rating.toString() === ratingFilter;
    
    return matchesSearch && matchesStatus && matchesRating;
  });

  const stats = {
    total: reviews.length,
    pending: reviews.filter(r => r.status === 'pending').length,
    approved: reviews.filter(r => r.status === 'approved').length,
    avgRating: reviews.length > 0 
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : '0.0'
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
          <h1 className="text-3xl font-bold">Review Management</h1>
          <p className="text-muted-foreground">Manage customer reviews and testimonials</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCreateNew}>
            <Star className="mr-2 h-4 w-4" />
            Add Review
          </Button>
          <Button onClick={handleExportCSV} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Reviews</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <Star className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold">{stats.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-orange-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Approved</p>
              <p className="text-2xl font-bold">{stats.approved}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
              <p className="text-2xl font-bold">{stats.avgRating}</p>
            </div>
            <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </Card>

      {/* Reviews Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Author</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Review</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{review.author_name}</div>
                    <div className="text-sm text-muted-foreground">{review.author_location}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <StarRating rating={review.rating} size="sm" />
                </TableCell>
                <TableCell className="max-w-md">
                  <p className="truncate">{review.review_text}</p>
                </TableCell>
                <TableCell>
                  {review.status === 'pending' && (
                    <Badge variant="secondary">
                      <Clock className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                  )}
                  {review.status === 'approved' && (
                    <Badge className="bg-green-500">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approved
                    </Badge>
                  )}
                  {review.status === 'rejected' && (
                    <Badge variant="destructive">
                      <XCircle className="h-3 w-3 mr-1" />
                      Rejected
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {review.is_published ? (
                    <Eye className="h-4 w-4 text-green-500" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  )}
                  {review.is_featured && (
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
                  )}
                </TableCell>
                <TableCell>
                  {format(new Date(review.created_at), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {review.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleApprove(review.id)}
                        >
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(review.id)}
                        >
                          <XCircle className="h-4 w-4 text-red-500" />
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(review)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteClick(review)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No reviews found</p>
          </div>
        )}
      </Card>

      {/* Create Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Review</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="create-author_name">Author Name*</Label>
                <Input
                  id="create-author_name"
                  value={formData.author_name}
                  onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="create-author_location">Location*</Label>
                <Input
                  id="create-author_location"
                  value={formData.author_location}
                  onChange={(e) => setFormData({ ...formData, author_location: e.target.value })}
                  placeholder="Atlanta, GA"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="create-author_avatar_url">Avatar URL (optional)</Label>
              <Input
                id="create-author_avatar_url"
                value={formData.author_avatar_url}
                onChange={(e) => setFormData({ ...formData, author_avatar_url: e.target.value })}
                placeholder="/assets/avatar.png"
              />
            </div>

            <div>
              <Label htmlFor="create-rating">Rating*</Label>
              <StarRating
                rating={formData.rating}
                interactive
                size="lg"
                onChange={(rating) => setFormData({ ...formData, rating })}
              />
            </div>

            <div>
              <Label htmlFor="create-review_text">Review Text*</Label>
              <Textarea
                id="create-review_text"
                value={formData.review_text}
                onChange={(e) => setFormData({ ...formData, review_text: e.target.value })}
                rows={5}
                placeholder="Write the customer's review..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="create-project_type">Project Type</Label>
                <Input
                  id="create-project_type"
                  value={formData.project_type}
                  onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                  placeholder="e.g., Residential Sauna"
                />
              </div>
              <div>
                <Label htmlFor="create-project_date">Project Date</Label>
                <Input
                  id="create-project_date"
                  type="date"
                  value={formData.project_date}
                  onChange={(e) => setFormData({ ...formData, project_date: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="create-status">Status*</Label>
                <select
                  id="create-status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div>
                <Label htmlFor="create-source">Source</Label>
                <select
                  id="create-source"
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="website">Website</option>
                  <option value="google">Google</option>
                  <option value="facebook">Facebook</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="create-admin_notes">Admin Notes</Label>
              <Textarea
                id="create-admin_notes"
                value={formData.admin_notes}
                onChange={(e) => setFormData({ ...formData, admin_notes: e.target.value })}
                rows={3}
                placeholder="Internal notes about this review"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="create-is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                />
                <Label htmlFor="create-is_published">Published</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="create-is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                />
                <Label htmlFor="create-is_featured">Featured</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>
              Create Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Review</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="author_name">Author Name*</Label>
                <Input
                  id="author_name"
                  value={formData.author_name}
                  onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="author_location">Location*</Label>
                <Input
                  id="author_location"
                  value={formData.author_location}
                  onChange={(e) => setFormData({ ...formData, author_location: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="rating">Rating*</Label>
              <StarRating
                rating={formData.rating}
                interactive
                size="lg"
                onChange={(rating) => setFormData({ ...formData, rating })}
              />
            </div>

            <div>
              <Label htmlFor="review_text">Review Text*</Label>
              <Textarea
                id="review_text"
                value={formData.review_text}
                onChange={(e) => setFormData({ ...formData, review_text: e.target.value })}
                rows={5}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="project_type">Project Type</Label>
                <Input
                  id="project_type"
                  value={formData.project_type}
                  onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                  placeholder="e.g., Residential Sauna"
                />
              </div>
              <div>
                <Label htmlFor="status">Status*</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="admin_notes">Admin Notes</Label>
              <Textarea
                id="admin_notes"
                value={formData.admin_notes}
                onChange={(e) => setFormData({ ...formData, admin_notes: e.target.value })}
                rows={3}
                placeholder="Internal notes about this review"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                />
                <Label htmlFor="is_published">Published</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                />
                <Label htmlFor="is_featured">Featured</Label>
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
            <AlertDialogTitle>Delete Review</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the review by "{reviewToDelete?.author_name}"? This action cannot be undone.
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

export default Reviews;

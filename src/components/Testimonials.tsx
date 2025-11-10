import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { StarRating } from "@/components/ui/star-rating";
import { LazyImage } from "@/components/ui/lazy-image";
import { supabase } from '@/integrations/supabase/client';

interface Review {
  id: string;
  author_name: string;
  author_location: string;
  author_avatar_url: string | null;
  rating: number;
  review_text: string;
}

export const Testimonials = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('id, author_name, author_location, author_avatar_url, rating, review_text')
        .eq('is_published', true)
        .eq('status', 'approved')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">What Our Clients Say</h2>
          <p className="body-lg text-muted-foreground max-w-3xl mx-auto">
            Hear directly from homeowners who have transformed their spaces with our custom sauna solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <Card key={review.id} className="card-elevated card-content">
              <Quote className="h-10 w-10 text-primary mb-4" />
              <div className="mb-4">
                <StarRating rating={review.rating} size="md" />
              </div>
              <blockquote className="text-muted-foreground mb-6 italic leading-relaxed">
                "{review.review_text}"
              </blockquote>
              <div className="flex items-center gap-4">
                {review.author_avatar_url && (
                  <LazyImage
                    src={review.author_avatar_url}
                    alt={review.author_name}
                    wrapperClassName="w-12 h-12 rounded-full"
                    className="w-full h-full rounded-full object-cover"
                  />
                )}
                <div>
                  <div className="font-heading font-semibold">{review.author_name}</div>
                  <div className="text-sm text-muted-foreground">{review.author_location}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

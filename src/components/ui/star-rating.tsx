import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  className?: string;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export const StarRating = ({
  rating,
  maxRating = 5,
  size = "md",
  showNumber = false,
  className,
  interactive = false,
  onChange
}: StarRatingProps) => {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  const handleStarClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxRating }).map((_, index) => {
        const isFilled = index < rating;
        const isPartial = !isFilled && index < Math.ceil(rating) && rating % 1 !== 0;
        
        return (
          <button
            key={index}
            type="button"
            disabled={!interactive}
            onClick={() => handleStarClick(index)}
            className={cn(
              "relative",
              interactive && "cursor-pointer hover:scale-110 transition-transform"
            )}
            aria-label={`Rate ${index + 1} stars`}
          >
            <Star
              className={cn(
                sizeClasses[size],
                isFilled 
                  ? "fill-yellow-400 text-yellow-400" 
                  : "fill-none text-muted-foreground"
              )}
            />
            {isPartial && (
              <Star
                className={cn(
                  sizeClasses[size],
                  "absolute inset-0 fill-yellow-400 text-yellow-400"
                )}
                style={{ clipPath: `inset(0 ${100 - (rating % 1) * 100}% 0 0)` }}
              />
            )}
          </button>
        );
      })}
      {showNumber && (
        <span className="ml-1 text-sm font-medium text-muted-foreground">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

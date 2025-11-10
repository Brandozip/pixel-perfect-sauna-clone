import { Skeleton } from "@/components/ui/skeleton";

export const NavbarSkeleton = () => {
  return (
    <div className="border-b border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Skeleton className="h-8 w-32" />
          <div className="hidden md:flex gap-8">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
};

export const HeroSkeleton = () => {
  return (
    <div className="relative h-[600px] bg-muted animate-pulse">
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl space-y-6">
          <Skeleton className="h-16 w-3/4" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-12 w-36" />
            <Skeleton className="h-12 w-36" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const CardGridSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border border-border rounded-lg p-6 space-y-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-10 w-32 mt-4" />
        </div>
      ))}
    </div>
  );
};

export const ContentSkeleton = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <div className="pt-4">
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
};

export const PageSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavbarSkeleton />
      <div className="container mx-auto px-4 py-12">
        <ContentSkeleton />
      </div>
    </div>
  );
};

export const FullPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavbarSkeleton />
      <HeroSkeleton />
      <div className="container mx-auto px-4 py-16 space-y-16">
        <section>
          <Skeleton className="h-12 w-64 mx-auto mb-12" />
          <CardGridSkeleton count={3} />
        </section>
        <section>
          <Skeleton className="h-12 w-64 mx-auto mb-12" />
          <CardGridSkeleton count={6} />
        </section>
      </div>
    </div>
  );
};

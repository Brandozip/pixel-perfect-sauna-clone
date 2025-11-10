import { lazy, Suspense } from "react";
import CleanNavbar from "@/components/navigation/CleanNavbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "next-themes";
import { LocalBusinessSchema, OrganizationSchema, WebsiteSchema } from "@/components/seo/StructuredData";
import { SocialMetaTags, homePageMeta } from "@/components/seo/SocialMetaTags";
import { ReviewSchema } from "@/components/seo/ReviewSchema";

// Lazy load below-the-fold components
const HealthBenefits = lazy(() => import("@/components/HealthBenefits").then(m => ({ default: m.HealthBenefits })));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs").then(m => ({ default: m.WhyChooseUs })));
const Testimonials = lazy(() => import("@/components/Testimonials").then(m => ({ default: m.Testimonials })));
const MeetTheOwner = lazy(() => import("@/components/MeetTheOwner").then(m => ({ default: m.MeetTheOwner })));
const BlogPreview = lazy(() => import("@/components/BlogPreview").then(m => ({ default: m.BlogPreview })));
const Newsletter = lazy(() => import("@/components/Newsletter").then(m => ({ default: m.Newsletter })));
const CTASection = lazy(() => import("@/components/CTASection").then(m => ({ default: m.CTASection })));

const Index = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <SocialMetaTags {...homePageMeta} />
      <LocalBusinessSchema />
      <OrganizationSchema />
      <WebsiteSchema />
      <ReviewSchema />
      <div className="min-h-screen">
        <CleanNavbar />
        <Hero />
        <Services />
        <Suspense fallback={<div className="h-20" />}>
          <MeetTheOwner />
          <HealthBenefits />
          <WhyChooseUs />
          <Testimonials />
          <BlogPreview />
          <Newsletter />
          <CTASection />
        </Suspense>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;

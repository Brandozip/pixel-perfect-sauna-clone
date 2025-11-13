import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageViewTracker } from "@/components/PageViewTracker";
import { PageSkeleton } from "@/components/ui/page-skeleton";

// Lazy load all pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const HealthBenefits = lazy(() => import("./pages/HealthBenefits"));
const Gallery = lazy(() => import("./pages/Gallery"));
const About = lazy(() => import("./pages/About"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const CustomSaunaDesign = lazy(() => import("./pages/services/CustomSaunaDesign"));
const SteamShowerInstallation = lazy(() => import("./pages/services/SteamShowerInstallation"));
const ResidentialSaunaBuilds = lazy(() => import("./pages/services/ResidentialSaunaBuilds"));
const OutdoorSaunaKits = lazy(() => import("./pages/services/OutdoorSaunaKits"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const AntiAging = lazy(() => import("./pages/health-benefits/AntiAging"));
const Cardiovascular = lazy(() => import("./pages/health-benefits/Cardiovascular"));
const ChronicPainRelief = lazy(() => import("./pages/health-benefits/ChronicPainRelief"));
const Detoxification = lazy(() => import("./pages/health-benefits/Detoxification"));
const ImmuneSystem = lazy(() => import("./pages/health-benefits/ImmuneSystem"));
const MentalHealth = lazy(() => import("./pages/health-benefits/MentalHealth"));
const MuscleRecovery = lazy(() => import("./pages/health-benefits/MuscleRecovery"));
const CommercialProjects = lazy(() => import("./pages/CommercialProjects"));
const IndoorInfraredSauna = lazy(() => import("./pages/services/IndoorInfraredSauna"));
const CustomSaunaInstallation = lazy(() => import("./pages/services/CustomSaunaInstallation"));
const OutdoorSaunaLanding = lazy(() => import("./pages/OutdoorSaunaLanding"));
const FastTrackLanding = lazy(() => import("./pages/FastTrackLanding"));
const CostCalculator = lazy(() => import("./pages/CostCalculator"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminNewsletters = lazy(() => import("./pages/admin/Newsletters"));
const AdminSubmissions = lazy(() => import("./pages/admin/Submissions"));
const AdminGallery = lazy(() => import("./pages/admin/Gallery"));
const AdminReviews = lazy(() => import("./pages/admin/Reviews"));
const AdminAnalytics = lazy(() => import("./pages/admin/Analytics"));
const AdminBlogPosts = lazy(() => import("./pages/admin/BlogPosts"));
const AdminBlogEditor = lazy(() => import("./pages/admin/BlogEditor"));
const AdminBlogGeneratorSettings = lazy(() => import("./pages/admin/BlogGeneratorSettings"));
const AdminContentKnowledge = lazy(() => import("./pages/admin/ContentKnowledge"));
const AdminOwnerProfile = lazy(() => import("./pages/admin/OwnerProfile"));
const AdminGTMDocumentation = lazy(() => import("./pages/admin/GTMDocumentation"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Install = lazy(() => import("./pages/Install"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const SitemapImages = lazy(() => import("./pages/SitemapImages"));
const SitemapIndex = lazy(() => import("./pages/SitemapIndex"));

import { AdminAuthProvider } from "./hooks/useAdminAuth";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { AdminLayout } from "./components/admin/AdminLayout";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PageViewTracker />
        <PWAInstallPrompt />
        <AdminAuthProvider>
          <Routes>
          <Route path="/" element={<Suspense fallback={<PageSkeleton />}><Index /></Suspense>} />
          <Route path="/services" element={<Suspense fallback={<PageSkeleton />}><Services /></Suspense>} />
          <Route path="/services/custom-sauna-design" element={<Suspense fallback={<PageSkeleton />}><CustomSaunaDesign /></Suspense>} />
          <Route path="/services/steam-shower-installation" element={<Suspense fallback={<PageSkeleton />}><SteamShowerInstallation /></Suspense>} />
          <Route path="/services/residential-sauna-builds" element={<Suspense fallback={<PageSkeleton />}><ResidentialSaunaBuilds /></Suspense>} />
          <Route path="/services/outdoor-sauna-kits" element={<Suspense fallback={<PageSkeleton />}><OutdoorSaunaKits /></Suspense>} />
          <Route path="/services/indoor-infrared-sauna" element={<Suspense fallback={<PageSkeleton />}><IndoorInfraredSauna /></Suspense>} />
          <Route path="/services/custom-sauna-installation" element={<Suspense fallback={<PageSkeleton />}><CustomSaunaInstallation /></Suspense>} />
          <Route path="/health-benefits" element={<Suspense fallback={<PageSkeleton />}><HealthBenefits /></Suspense>} />
          <Route path="/health-benefits/anti-aging" element={<Suspense fallback={<PageSkeleton />}><AntiAging /></Suspense>} />
          <Route path="/health-benefits/cardiovascular" element={<Suspense fallback={<PageSkeleton />}><Cardiovascular /></Suspense>} />
          <Route path="/health-benefits/chronic-pain-relief" element={<Suspense fallback={<PageSkeleton />}><ChronicPainRelief /></Suspense>} />
          <Route path="/health-benefits/detoxification" element={<Suspense fallback={<PageSkeleton />}><Detoxification /></Suspense>} />
          <Route path="/health-benefits/immune-system" element={<Suspense fallback={<PageSkeleton />}><ImmuneSystem /></Suspense>} />
          <Route path="/health-benefits/mental-health" element={<Suspense fallback={<PageSkeleton />}><MentalHealth /></Suspense>} />
          <Route path="/health-benefits/muscle-recovery" element={<Suspense fallback={<PageSkeleton />}><MuscleRecovery /></Suspense>} />
          <Route path="/gallery" element={<Suspense fallback={<PageSkeleton />}><Gallery /></Suspense>} />
          <Route path="/about" element={<Suspense fallback={<PageSkeleton />}><About /></Suspense>} />
          <Route path="/faq" element={<Suspense fallback={<PageSkeleton />}><FAQ /></Suspense>} />
          <Route path="/contact" element={<Suspense fallback={<PageSkeleton />}><Contact /></Suspense>} />
          <Route path="/commercial-projects" element={<Suspense fallback={<PageSkeleton />}><CommercialProjects /></Suspense>} />
          <Route path="/privacy-policy" element={<Suspense fallback={<PageSkeleton />}><PrivacyPolicy /></Suspense>} />
          <Route path="/terms-of-service" element={<Suspense fallback={<PageSkeleton />}><TermsOfService /></Suspense>} />
          <Route path="/outdoor-sauna-landing" element={<Suspense fallback={<PageSkeleton />}><OutdoorSaunaLanding /></Suspense>} />
          <Route path="/fast-track" element={<Suspense fallback={<PageSkeleton />}><FastTrackLanding /></Suspense>} />
          <Route path="/cost-calculator" element={<Suspense fallback={<PageSkeleton />}><CostCalculator /></Suspense>} />
          
          {/* Sitemap Routes */}
          <Route path="/sitemap.xml" element={<Suspense fallback={<PageSkeleton />}><Sitemap /></Suspense>} />
          <Route path="/sitemap-images.xml" element={<Suspense fallback={<PageSkeleton />}><SitemapImages /></Suspense>} />
          <Route path="/sitemap-index.xml" element={<Suspense fallback={<PageSkeleton />}><SitemapIndex /></Suspense>} />
          
          {/* Blog Routes */}
          <Route path="/blog" element={<Suspense fallback={<PageSkeleton />}><Blog /></Suspense>} />
          <Route path="/blog/:slug" element={<Suspense fallback={<PageSkeleton />}><BlogPost /></Suspense>} />
          
          {/* PWA Install Page */}
          <Route path="/install" element={<Suspense fallback={<PageSkeleton />}><Install /></Suspense>} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Suspense fallback={<PageSkeleton />}><AdminLogin /></Suspense>} />
          <Route 
            path="/admin/dashboard" 
            element={
              <Suspense fallback={<PageSkeleton />}>
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </ProtectedRoute>
              </Suspense>
            } 
          />
          <Route 
            path="/admin/newsletters" 
            element={
              <Suspense fallback={<PageSkeleton />}>
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminNewsletters />
                  </AdminLayout>
                </ProtectedRoute>
              </Suspense>
            } 
          />
          <Route 
            path="/admin/submissions" 
            element={
              <Suspense fallback={<PageSkeleton />}>
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminSubmissions />
                  </AdminLayout>
                </ProtectedRoute>
              </Suspense>
            } 
          />
          <Route 
            path="/admin/gallery" 
            element={
              <Suspense fallback={<PageSkeleton />}>
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminGallery />
                  </AdminLayout>
                </ProtectedRoute>
              </Suspense>
            } 
          />
          <Route 
            path="/admin/reviews" 
            element={
              <Suspense fallback={<PageSkeleton />}>
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminReviews />
                  </AdminLayout>
                </ProtectedRoute>
              </Suspense>
            } 
          />
          <Route 
            path="/admin/analytics" 
            element={
              <Suspense fallback={<PageSkeleton />}>
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminAnalytics />
                  </AdminLayout>
                </ProtectedRoute>
              </Suspense>
            } 
          />
          <Route 
            path="/admin/blog" 
            element={
              <Suspense fallback={<PageSkeleton />}>
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminBlogPosts />
                  </AdminLayout>
                </ProtectedRoute>
              </Suspense>
            } 
          />
          <Route 
            path="/admin/blog/:id" 
            element={
              <Suspense fallback={<PageSkeleton />}>
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminBlogEditor />
                  </AdminLayout>
                </ProtectedRoute>
              </Suspense>
            } 
          />
          <Route 
            path="/admin/blog-generator" 
            element={
              <Suspense fallback={<PageSkeleton />}>
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminBlogGeneratorSettings />
                  </AdminLayout>
                </ProtectedRoute>
              </Suspense>
            } 
          />
          <Route 
            path="/admin/content-knowledge" 
            element={
              <Suspense fallback={<PageSkeleton />}>
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminContentKnowledge />
                  </AdminLayout>
                </ProtectedRoute>
              </Suspense>
            } 
          />
          <Route 
            path="/admin/owner-profile" 
            element={
              <Suspense fallback={<PageSkeleton />}>
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminOwnerProfile />
                  </AdminLayout>
                </ProtectedRoute>
              </Suspense>
            } 
          />
          <Route 
            path="/admin/gtm-docs" 
            element={
              <Suspense fallback={<PageSkeleton />}>
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminGTMDocumentation />
                  </AdminLayout>
                </ProtectedRoute>
              </Suspense>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<Suspense fallback={<PageSkeleton />}><NotFound /></Suspense>} />
          </Routes>
        </AdminAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

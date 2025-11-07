import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import HealthBenefits from "./pages/HealthBenefits";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import CustomSaunaDesign from "./pages/services/CustomSaunaDesign";
import SteamShowerInstallation from "./pages/services/SteamShowerInstallation";
import ResidentialSaunaBuilds from "./pages/services/ResidentialSaunaBuilds";
import OutdoorSaunaKits from "./pages/services/OutdoorSaunaKits";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AntiAging from "./pages/health-benefits/AntiAging";
import Cardiovascular from "./pages/health-benefits/Cardiovascular";
import ChronicPainRelief from "./pages/health-benefits/ChronicPainRelief";
import Detoxification from "./pages/health-benefits/Detoxification";
import ImmuneSystem from "./pages/health-benefits/ImmuneSystem";
import MentalHealth from "./pages/health-benefits/MentalHealth";
import MuscleRecovery from "./pages/health-benefits/MuscleRecovery";
import CommercialProjects from "./pages/CommercialProjects";
import IndoorInfraredSauna from "./pages/services/IndoorInfraredSauna";
import CustomSaunaInstallation from "./pages/services/CustomSaunaInstallation";
import OutdoorSaunaLanding from "./pages/OutdoorSaunaLanding";
import FastTrackLanding from "./pages/FastTrackLanding";
import CostCalculator from "./pages/CostCalculator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/custom-sauna-design" element={<CustomSaunaDesign />} />
          <Route path="/services/steam-shower-installation" element={<SteamShowerInstallation />} />
          <Route path="/services/residential-sauna-builds" element={<ResidentialSaunaBuilds />} />
          <Route path="/services/outdoor-sauna-kits" element={<OutdoorSaunaKits />} />
          <Route path="/services/indoor-infrared-sauna" element={<IndoorInfraredSauna />} />
          <Route path="/services/custom-sauna-installation" element={<CustomSaunaInstallation />} />
          <Route path="/health-benefits" element={<HealthBenefits />} />
          <Route path="/health-benefits/anti-aging" element={<AntiAging />} />
          <Route path="/health-benefits/cardiovascular" element={<Cardiovascular />} />
          <Route path="/health-benefits/chronic-pain-relief" element={<ChronicPainRelief />} />
          <Route path="/health-benefits/detoxification" element={<Detoxification />} />
          <Route path="/health-benefits/immune-system" element={<ImmuneSystem />} />
          <Route path="/health-benefits/mental-health" element={<MentalHealth />} />
          <Route path="/health-benefits/muscle-recovery" element={<MuscleRecovery />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/commercial-projects" element={<CommercialProjects />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/outdoor-sauna-landing" element={<OutdoorSaunaLanding />} />
          <Route path="/fast-track" element={<FastTrackLanding />} />
          <Route path="/cost-calculator" element={<CostCalculator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

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
          <Route path="/health-benefits" element={<HealthBenefits />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import CleanNavbar from "@/components/navigation/CleanNavbar";
import { Footer } from "@/components/Footer";
import { CostCalculator } from "@/components/CostCalculator";
import { ThemeProvider } from "next-themes";

const CostCalculatorPage = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen">
        <CleanNavbar />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Sauna Cost Calculator
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Get an instant estimate for your custom sauna project with our interactive calculator.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <CostCalculator />
            </div>

            {/* How It Works Section */}
            <div className="max-w-4xl mx-auto mt-16">
              <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-accent">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Select Your Preferences</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred sauna type, size, and installation location
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-accent">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Add Premium Features</h3>
                  <p className="text-sm text-muted-foreground">
                    Customize with premium features and installation options
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-accent">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Get Your Estimate</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive an instant estimate and request a detailed quote
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default CostCalculatorPage;
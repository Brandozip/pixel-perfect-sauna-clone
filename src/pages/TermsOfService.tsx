import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { ThemeProvider } from "next-themes";

const TermsOfService = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen">
        <Navigation />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Terms of Service</h1>
            <p className="text-muted-foreground mb-12">Last updated: May 1, 2025</p>

            <div className="space-y-8">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using SaunasPlus services, you accept and agree to be bound by these Terms of Service.
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">2. Services Description</h2>
                <p className="text-muted-foreground">
                  SaunasPlus provides custom sauna design, installation, and related services for residential and commercial properties.
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">3. User Responsibilities</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Provide accurate information</li>
                  <li>Use services lawfully</li>
                  <li>Not interfere with services</li>
                  <li>Not gain unauthorized access</li>
                  <li>Not engage in harmful activities</li>
                </ul>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">4. Quotes and Estimates</h2>
                <p className="text-muted-foreground mb-4">Quotes are subject to change based on:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Final measurements</li>
                  <li>Material availability</li>
                  <li>Additional requests</li>
                  <li>Unforeseen circumstances</li>
                </ul>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">5. Payments and Billing</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Deposit required</li>
                  <li>Progress payments at milestones</li>
                  <li>Final payment upon completion</li>
                </ul>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">6. Warranties and Guarantees</h2>
                <p className="text-muted-foreground">
                  Warranties on workmanship and products as specified in service contract. Manufacturer warranties apply to equipment.
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">7. Cancellation Policy</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Deposits may be forfeited</li>
                  <li>Responsibility for ordered materials</li>
                  <li>Compensation for completed work</li>
                </ul>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">8. Intellectual Property</h2>
                <p className="text-muted-foreground">
                  All website content is property of SaunasPlus and protected by copyright laws.
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  SaunasPlus shall not be liable for indirect, incidental, special, or consequential damages.
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">10. Governing Law</h2>
                <p className="text-muted-foreground">
                  Governed by laws of the State of Georgia.
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">11. Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time.
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>Email: contact@saunasplus.com</p>
                  <p>Phone: 678-245-9966</p>
                  <p>Address: Atlanta, GA</p>
                </div>
              </Card>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default TermsOfService;

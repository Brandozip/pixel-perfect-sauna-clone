import CleanNavbar from "@/components/navigation/CleanNavbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { ThemeProvider } from "next-themes";

const PrivacyPolicy = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen">
        <CleanNavbar />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-muted-foreground mb-12">Last updated: May 1, 2025</p>

            <div className="space-y-8">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground">
                  At SaunasPlus, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information.
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Name, email address, phone number</li>
                  <li>Billing and shipping address</li>
                  <li>Payment information</li>
                  <li>Communication preferences</li>
                  <li>Any other information you provide</li>
                </ul>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Provide and maintain services</li>
                  <li>Process transactions</li>
                  <li>Send administrative information</li>
                  <li>Respond to inquiries</li>
                  <li>Send marketing communications</li>
                  <li>Improve our services</li>
                  <li>Protect against fraud</li>
                </ul>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">4. Information Sharing</h2>
                <p className="text-muted-foreground mb-4">We may share information with:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Service providers</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights</li>
                  <li>With your consent</li>
                </ul>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">5. Cookies and Tracking</h2>
                <p className="text-muted-foreground">
                  We use cookies and similar technologies to track activity and hold certain information.
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">6. Data Security</h2>
                <p className="text-muted-foreground">
                  We implement appropriate technical and organizational measures to protect your data.
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Access your data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion</li>
                  <li>Restrict processing</li>
                  <li>Data portability</li>
                  <li>Object to processing</li>
                </ul>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">8. Changes to Policy</h2>
                <p className="text-muted-foreground">
                  We may update this policy from time to time. Changes are effective upon posting.
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
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

export default PrivacyPolicy;

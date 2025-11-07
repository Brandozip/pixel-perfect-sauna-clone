import CleanNavbar from "@/components/navigation/CleanNavbar";
import { Footer } from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "next-themes";
import { Link } from "react-router-dom";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { BreadcrumbSchema } from "@/components/seo/ServiceSchema";

const faqs = [
  {
    question: "How long does a sauna installation take?",
    answer: "Most residential sauna installations take 3-7 days, depending on the complexity of the project. Custom builds may take 2-3 weeks. We'll provide a detailed timeline during your consultation."
  },
  {
    question: "What type of wood is best for saunas?",
    answer: "Cedar, hemlock, and Nordic spruce are the most popular choices. Cedar is naturally resistant to moisture and insects, hemlock is hypoallergenic and doesn't splinter, while Nordic spruce offers excellent heat resistance. We'll help you choose based on your preferences and budget."
  },
  {
    question: "How much does a custom sauna cost?",
    answer: "Costs vary widely based on size, materials, and features. A basic home sauna starts around $8,000-$12,000, while luxury custom installations can range from $20,000-$50,000+. Contact us for a personalized quote."
  },
  {
    question: "Do I need special electrical work for a sauna?",
    answer: "Yes, most saunas require dedicated electrical circuits. Traditional saunas typically need 220V/240V power, similar to an electric dryer. Our team includes licensed electricians who handle all electrical requirements."
  },
  {
    question: "How often should I use my sauna?",
    answer: "For optimal health benefits, we recommend 3-4 sessions per week, each lasting 15-30 minutes. However, you can safely use your sauna daily if desired. Start with shorter sessions and gradually increase duration as your body adapts."
  },
  {
    question: "What's the difference between a traditional sauna and a steam room?",
    answer: "Traditional saunas use dry heat (typically 150-195°F with 10-20% humidity), while steam rooms use moist heat (110-120°F with near 100% humidity). Both offer health benefits; the choice depends on your preference for dry vs. moist heat."
  },
  {
    question: "Can I install a sauna in a small space?",
    answer: "Absolutely! We specialize in space-efficient designs. Even a closet-sized area (as small as 4x4 feet) can accommodate a compact sauna. We'll optimize your available space to create a comfortable sauna experience."
  },
  {
    question: "How do I maintain my sauna?",
    answer: "Saunas require minimal maintenance. Wipe down benches after each use, clean with mild soap monthly, and ensure proper ventilation. Wood may need light sanding every few years. We provide detailed maintenance guides with every installation."
  },
  {
    question: "Are saunas safe for everyone?",
    answer: "Saunas are generally safe for most healthy adults. However, pregnant women, people with heart conditions, or those with certain medical conditions should consult their doctor before use. Children should always be supervised."
  },
  {
    question: "What's included in your warranty?",
    answer: "We offer a comprehensive warranty covering workmanship for 5 years and materials for 2 years. Heaters typically come with manufacturer warranties of 1-3 years. Extended warranties are available for premium installations."
  },
  {
    question: "Can you install saunas outdoors?",
    answer: "Yes! We offer outdoor sauna installations using weather-resistant materials and proper weatherproofing. Outdoor saunas are popular for backyard wellness spaces and provide a unique connection with nature."
  },
  {
    question: "Do you offer financing options?",
    answer: "Yes, we partner with several financing companies to offer flexible payment plans. During your consultation, we can discuss financing options that fit your budget."
  }
];

const FAQ = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.saunasplus.com/" },
          { name: "FAQ", url: "https://www.saunasplus.com/faq" }
        ]}
      />
      <div className="min-h-screen">
        <CleanNavbar />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container max-w-4xl">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Frequently Asked Questions</h1>
              <p className="text-xl text-muted-foreground">
                Find answers to common questions about our sauna services, installation process, and maintenance.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-accent">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="text-center mt-16 p-8 rounded-lg bg-primary-muted border border-primary/20">
              <h2 className="heading-2 mb-4">Still Have Questions?</h2>
              <p className="body-lg text-muted-foreground mb-6">
                Our team is here to help. Contact us for personalized answers to your specific questions.
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary-emphasis text-primary-foreground">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default FAQ;

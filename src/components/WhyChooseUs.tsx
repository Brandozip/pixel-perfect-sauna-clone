import { Award, Ruler, Wrench, Zap } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Premium Materials",
    description: "We source the highest quality woods and components for durability and performance."
  },
  {
    icon: Ruler,
    title: "Custom Design",
    description: "Every sauna is tailored to your specific requirements and space constraints."
  },
  {
    icon: Wrench,
    title: "Expert Installation",
    description: "Our certified technicians ensure proper assembly and electrical integration."
  },
  {
    icon: Zap,
    title: "Energy Efficiency",
    description: "Our saunas are designed to minimize energy consumption while maximizing performance."
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-primary-muted">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Why Choose Saunas Plus?</h2>
          <p className="body-lg text-muted-foreground max-w-3xl mx-auto">
            With decades of experience and a passion for quality, we deliver sauna solutions that exceed expectations. Our commitment to craftsmanship and customer satisfaction sets us apart.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="heading-4 mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className="relative rounded-lg overflow-hidden mb-8">
          <img 
            src="/src/assets/luxury-sauna.jpg"
            alt="Luxury Sauna"
            loading="lazy"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-8 text-white">
              <p className="text-2xl md:text-3xl font-heading font-medium italic">
                "Our mission is to bring the authentic sauna experience into homes and businesses across the country."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

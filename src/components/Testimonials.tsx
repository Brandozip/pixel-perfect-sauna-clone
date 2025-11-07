import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";
import nickAvatar from "@/assets/testimonial-nick.png";
import residentialSauna from "@/assets/residential-sauna.png";
import outdoorSauna from "@/assets/outdoor-sauna.png";

const testimonials = [
  {
    quote: "We had our sauna installed by Grayson in May 2024. The room was originally a closet turned into a wine cellar. Meeting with Grayson the first visit inspired confidence and a vision. He told us to plan and the timelines and stuck to it. In addition he was always available after the installation to fine tune some extras. I think it's rare to get this kind of professionalism and I recommend him without reservation.",
    author: "Nick S.",
    location: "Buckhead",
    avatar: nickAvatar
  },
  {
    quote: "Grayson is the consummate professional. His work is exemplary. Punctual, straightforward, honest and cleans up afterwards which more than I can say for many contractors.",
    author: "Anonymous",
    location: "Atlanta",
    avatar: residentialSauna
  },
  {
    quote: "We wanted a custom-cut sauna as part of an extensive home remodel, and had a clear idea of how the sauna should complement our home's overall design. Of the three companies we spoke with, Grayson was the only one who didn't try to force a sale by phone, and after a site visit, he presented a design that fit our aesthetic and space perfectly. It was clear that he had actually listened and could honor our vision. Through the build, Grayson and his helpers were honest, professional, and accessible. We love our beautiful new sauna and can't recommend Grayson highly enough.",
    author: "Katherine and John",
    location: "Brookhaven",
    avatar: outdoorSauna
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear directly from homeowners who have transformed their spaces with our custom sauna solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
              <Quote className="h-10 w-10 text-accent mb-4" />
              <blockquote className="text-muted-foreground mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

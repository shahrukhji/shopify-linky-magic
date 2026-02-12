import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Maine pehli baar online jewelry order ki thi, bohot darr lag raha tha. But Reelcraft ne exact wahi bheja jo photo mein tha. Quality ekdum solid! Plating bhi ekdum smooth — 2 mahine ho gaye, bilkul nahi fade hua. Ab toh regular customer ban gayi hoon 😍",
    name: "Priya S.",
    city: "Mumbai",
  },
  {
    quote: "₹399 mein itni sundar jhumkis? I literally got so many compliments at my cousin's wedding. Everyone kept asking 'ye kahan se li?' I felt like a queen without spending like one. Thank you Reelcraft! 💕",
    name: "Ananya M.",
    city: "Jaipur",
  },
  {
    quote: "Bhai Shahrukh se WhatsApp pe baat ki, usne personally suggest kiya mere lehenga ke saath kaunsi jhumki match karegi. Even sent me comparison photos. This level of personal service is RARE in online shopping. 10/10 recommend! 🔥",
    name: "Neha K.",
    city: "Delhi",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gold-light">
      <div className="container">
        <h2 className="text-3xl font-display font-bold text-center mb-3">Sunlo Humari Customers Se 💬</h2>
        <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto">
          Real reviews from real girls across India!
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-card rounded-2xl p-6 md:p-8 shadow-md border border-border relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/15" />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground mb-4">"{t.quote}"</p>
              <p className="text-sm font-semibold">— {t.name}, <span className="text-muted-foreground font-normal">{t.city}</span></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

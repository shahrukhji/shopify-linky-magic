import { Gift, Truck, CreditCard, Percent, ShieldCheck, RotateCcw } from "lucide-react";

const offers = [
  { icon: <Percent className="h-6 w-6" />, title: "Buy More, Save More!", desc: "Buy 2 → 10% OFF • Buy 3 → 15% OFF • Buy 5 → 20% OFF" },
  { icon: <Gift className="h-6 w-6" />, title: "Free Jewelry Box", desc: "Orders above ₹1499 get a FREE carry box worth ₹499!" },
  { icon: <CreditCard className="h-6 w-6" />, title: "₹100 OFF Online Payment", desc: "Pay online & save extra ₹100 instantly!" },
  { icon: <Truck className="h-6 w-6" />, title: "Free Shipping", desc: "Free delivery on all orders above ₹999" },
  { icon: <ShieldCheck className="h-6 w-6" />, title: "Quality Checked", desc: "Every piece handpicked & quality verified" },
  { icon: <RotateCcw className="h-6 w-6" />, title: "Easy Returns", desc: "7-day hassle-free return policy" },
];

export const OffersSection = () => {
  return (
    <section className="py-16 bg-magenta-light">
      <div className="container">
        <h2 className="text-3xl font-display font-bold text-center mb-3">Why Shop with JhumkaWali? 💕</h2>
        <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto">
          Dilli ki sabse trendy jhumkas, seedha aapke doorstep pe!
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {offers.map((offer, i) => (
            <div key={i} className="bg-card rounded-xl p-6 text-center hover:shadow-md transition-shadow border">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                {offer.icon}
              </div>
              <h3 className="font-semibold text-sm mb-1">{offer.title}</h3>
              <p className="text-xs text-muted-foreground">{offer.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

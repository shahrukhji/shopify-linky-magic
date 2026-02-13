import { Gift, Truck, CreditCard, Tag, ShieldCheck, RotateCcw } from "lucide-react";

const offers = [
  { icon: <Truck className="h-6 w-6" />, title: "Free Shipping + ₹50 OFF", desc: "On all orders above ₹499" },
  { icon: <Tag className="h-6 w-6" />, title: "₹100 OFF on ₹999+", desc: "Flat ₹100 discount on bigger orders!" },
  { icon: <Gift className="h-6 w-6" />, title: "Free Jewelry Box", desc: "Orders above ₹1499 get a FREE carry box worth ₹499!" },
  
  { icon: <ShieldCheck className="h-6 w-6" />, title: "Quality Checked", desc: "Every piece handpicked & quality verified" },
  { icon: <RotateCcw className="h-6 w-6" />, title: "Easy Returns", desc: "7-day hassle-free return policy" },
];

export const OffersSection = () => {
  return (
    <section className="py-16 bg-magenta-light">
      <div className="container">
        <h2 className="text-3xl font-display font-bold text-center mb-3">Why Shop with Reelcraft.store? 💕</h2>
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

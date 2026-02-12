import { ShieldCheck, Truck, RotateCcw, CreditCard, BadgeCheck } from "lucide-react";

const badges = [
  { icon: <ShieldCheck className="h-5 w-5" />, label: "100% Quality Checked" },
  { icon: <Truck className="h-5 w-5" />, label: "Free Shipping ₹499+" },
  { icon: <RotateCcw className="h-5 w-5" />, label: "7-Day Easy Returns" },
  { icon: <CreditCard className="h-5 w-5" />, label: "Secure Payments" },
  { icon: <BadgeCheck className="h-5 w-5" />, label: "10,000+ Happy Customers" },
];

export const TrustBadges = () => {
  return (
    <section className="py-8 border-y border-border bg-card">
      <div className="container">
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {badges.map((b, i) => (
            <div key={i} className="flex items-center gap-2 text-muted-foreground">
              <span className="text-primary">{b.icon}</span>
              <span className="text-xs md:text-sm font-medium">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

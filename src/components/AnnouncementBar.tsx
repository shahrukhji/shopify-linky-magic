import { Gift, Truck, CreditCard, Sparkles } from "lucide-react";

const messages = [
  { icon: <Gift className="h-3.5 w-3.5" />, text: "🎁 FREE Jewelry Box worth ₹499 on orders above ₹1499!" },
  { icon: <CreditCard className="h-3.5 w-3.5" />, text: "💳 Pay Online & Get EXTRA ₹100 OFF instantly!" },
  { icon: <Truck className="h-3.5 w-3.5" />, text: "🚚 FREE Shipping on orders above ₹999!" },
  { icon: <Sparkles className="h-3.5 w-3.5" />, text: "✨ Buy 2 Get 10% OFF | Buy 3 Get 15% OFF!" },
];

export const AnnouncementBar = () => {
  return (
    <div className="bg-gradient-primary text-primary-foreground py-2 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...messages, ...messages].map((msg, i) => (
          <span key={i} className="inline-flex items-center gap-2 mx-8 text-xs sm:text-sm font-medium">
            {msg.icon}
            {msg.text}
          </span>
        ))}
      </div>
    </div>
  );
};

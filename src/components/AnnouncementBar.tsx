import { Gift, Truck, CreditCard, Sparkles, Tag } from "lucide-react";

const messages = [
  { icon: <Truck className="h-3.5 w-3.5" />, text: "🚚 FREE Shipping + ₹50 OFF on ₹499+" },
  { icon: <Tag className="h-3.5 w-3.5" />, text: "💰 Flat ₹100 OFF on ₹999+" },
  { icon: <Gift className="h-3.5 w-3.5" />, text: "🎁 FREE Jewelry Box worth ₹499 on ₹1,499+" },
  
  { icon: <Sparkles className="h-3.5 w-3.5" />, text: "✨ Unlock 3 Reward Milestones — Buy More Save More!" },
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

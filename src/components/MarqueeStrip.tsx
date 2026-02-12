const marqueeItems = [
  "★ TRENDING IN DELHI",
  "★ HANDPICKED DESIGNS",
  "★ 10,000+ HAPPY CUSTOMERS",
  "★ AFFORDABLE LUXURY",
  "★ FAST DELIVERY ACROSS INDIA",
];

export const MarqueeStrip = () => {
  return (
    <div className="bg-gold-light py-3 overflow-hidden border-y border-gold/30">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span key={i} className="mx-8 text-sm font-semibold text-foreground/80 tracking-wide">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

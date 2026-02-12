import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="Beautiful jhumka earrings collection from Reelcraft.store"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>
      <div className="container relative z-10 py-20 md:py-32 lg:py-40">
        <div className="max-w-lg">
          <p className="text-gold font-medium text-sm uppercase tracking-widest mb-3">✦ Handpicked from Delhi</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-background leading-tight mb-4">
            Trending Jhumkas Starting <span className="text-gold">₹199</span>
          </h1>
          <p className="text-background/80 text-lg mb-8 leading-relaxed">
            Discover stunning jhumkas for every occasion — weddings, festivals, college, and everyday glam! 💕
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/shop">
              <Button size="lg" className="bg-gradient-primary text-primary-foreground font-semibold px-8">
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

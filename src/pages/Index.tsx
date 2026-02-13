import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { ProductGrid } from "@/components/ProductGrid";
import { OffersSection } from "@/components/OffersSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TrustBadges } from "@/components/TrustBadges";
import { CategoriesSection } from "@/components/CategoriesSection";
import { Footer } from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Trendy Jhumkas & Earrings from Delhi",
    description: "Shop artificial jhumkas & earrings starting at ₹199. Handpicked from Delhi, free shipping on ₹499+, 7-day returns. 10,000+ happy customers.",
    keywords: "jhumkas online, artificial earrings, trendy jewelry, jhumka designs, Delhi jewelry",
    url: "https://reelcraft.store/",
    schema: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Reelcraft.store",
      "url": "https://reelcraft.store",
      "logo": "https://reelcraft.store/logo.png",
      "description": "Handpicked jhumkas & earrings from Delhi. Affordable luxury, trendy designs, fast delivery.",
      "sameAs": ["https://instagram.com/reelcraft.store"],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-8595661134",
        "contactType": "Customer Service"
      }
    }
  });
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <TrustBadges />
        <MarqueeStrip />
        <CategoriesSection />
        <div className="container">
          <ProductGrid title="Our Collection ✨" limit={8} />
        </div>
        <OffersSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

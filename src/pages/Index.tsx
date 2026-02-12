import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { ProductGrid } from "@/components/ProductGrid";
import { OffersSection } from "@/components/OffersSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <MarqueeStrip />
        <div className="container">
          <ProductGrid title="Our Collection ✨" limit={8} />
        </div>
        <OffersSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

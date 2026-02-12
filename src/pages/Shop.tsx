import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";
import { RewardsProgressBar } from "@/components/RewardsProgressBar";

const Shop = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <RewardsProgressBar />
      <main className="flex-1 container">
        <div className="pt-8 pb-4">
          <h1 className="text-4xl font-display font-bold text-center">Shop All Jhumkas ✦</h1>
          <p className="text-muted-foreground text-center mt-2">Discover our entire collection of handpicked jhumkas</p>
        </div>
        <ProductGrid limit={40} />
      </main>
      <Footer />
    </div>
  );
};

export default Shop;

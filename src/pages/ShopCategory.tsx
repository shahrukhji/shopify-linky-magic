import { useParams } from "react-router-dom";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";
import { RewardsProgressBar } from "@/components/RewardsProgressBar";
import { useSEO } from "@/hooks/useSEO";

const categoryMeta: Record<string, { title: string; description: string; query?: string }> = {
  small: {
    title: "Small Earrings – Delicate & Everyday Wear",
    description: "Shop delicate small jhumkas & earrings perfect for daily wear. Lightweight, elegant designs starting at ₹199.",
  },
  medium: {
    title: "Medium Earrings – Perfect for Occasions",
    description: "Browse medium-sized jhumkas ideal for parties and occasions. Stunning designs with free shipping on ₹499+.",
  },
  large: {
    title: "Large Earrings – Bold Statement Pieces",
    description: "Shop bold, large statement jhumkas & earrings. Eye-catching designs for weddings and festive occasions.",
  },
  "jewellery-box": {
    title: "Jewellery Box – Travel Cases & Organisers",
    description: "Shop premium jewellery travel cases & organisers. Keep your precious collection safe and stylish.",
    query: "product_type:Jewellery Box",
  },
};

const ShopCategory = () => {
  const { category } = useParams<{ category: string }>();
  const meta = categoryMeta[category || ""] || { title: "Shop Earrings", description: "Browse our earring collection." };

  useSEO({
    title: meta.title,
    description: meta.description,
    keywords: `${category} jhumkas, ${category} earrings, ${category} jewelry online`,
    url: `https://reelcraft.store/shop/${category}`,
    type: "website",
  });

  const displayTitle = category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Earrings ✦` : "Earrings";

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <RewardsProgressBar />
      <main className="flex-1 container">
        <div className="pt-8 pb-4">
          <h1 className="text-4xl font-display font-bold text-center">{displayTitle}</h1>
          <p className="text-muted-foreground text-center mt-2">{meta.description}</p>
        </div>
        <ProductGrid limit={40} query={meta.query || category} />
      </main>
      <Footer />
    </div>
  );
};

export default ShopCategory;

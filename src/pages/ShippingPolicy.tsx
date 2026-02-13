import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RewardsProgressBar } from "@/components/RewardsProgressBar";
import { useSEO } from "@/hooks/useSEO";

const ShippingPolicy = () => {
  useSEO({
    title: "Shipping & Return Policy",
    description: "Learn about Reelcraft.store's free shipping on ₹499+, 7-day easy returns, and delivery times across India.",
    keywords: "shipping policy, return policy, free shipping, delivery, returns",
    url: "https://reelcraft.store/shipping-policy"
  });
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <RewardsProgressBar />
      <main className="flex-1 container py-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-display font-bold text-center mb-10">Shipping & Return Policy</h1>

        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">🚚 Shipping Policy</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>We ship to all pincodes across India</li>
              <li><strong className="text-foreground">Free shipping</strong> on orders above ₹499</li>
              <li>Shipping charge of ₹79 for orders below ₹499</li>
              <li>Delivery time: 7–10 business days across India (Delhi NCR: 2–3 days)</li>
              <li>Cash on Delivery (COD) available</li>
              <li>All orders are carefully packed and shipped from Delhi with love 💕</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">↩️ Return & Exchange Policy</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li><strong className="text-foreground">No returns after acceptance</strong> — please inspect your order at the time of delivery</li>
              <li>If you do not wish to accept the order, you may <strong className="text-foreground">refuse delivery</strong> on the spot</li>
              <li>Returns are only accepted for <strong className="text-foreground">damaged, defective, or wrong products</strong></li>
              <li>Report any issues within 48 hours of delivery with photos/videos as proof</li>
              <li>Replacement will be processed within 5–7 business days after verification</li>
              <li>Change-of-mind returns are <strong className="text-foreground">not applicable</strong> once the order is accepted</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">📍 Shipped from Delhi</h2>
            <p>All our products are carefully quality-checked and packed in beautiful packaging before shipping from our Delhi warehouse. We take pride in ensuring your jhumkas reach you in perfect condition!</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingPolicy;

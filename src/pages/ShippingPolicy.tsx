import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 container py-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-display font-bold text-center mb-10">Shipping & Return Policy</h1>

        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">🚚 Shipping Policy</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>We ship to all pincodes across India</li>
              <li><strong className="text-foreground">Free shipping</strong> on orders above ₹999</li>
              <li>Shipping charge of ₹79 for orders below ₹999</li>
              <li>Delivery time: 4-7 business days (Delhi NCR: 2-3 days)</li>
              <li>Cash on Delivery available (COD fee of ₹100 applies)</li>
              <li>All orders are shipped from Delhi with love 💕</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">↩️ Return Policy</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>7-day easy return policy from the date of delivery</li>
              <li>Product must be unused, unworn, and in original packaging with tags</li>
              <li>We'll arrange a pickup from your address</li>
              <li>Refund will be processed within 5-7 business days after receiving the product</li>
              <li>Exchange is also available for a different design or size</li>
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

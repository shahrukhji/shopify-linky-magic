import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RewardsProgressBar } from "@/components/RewardsProgressBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const TrackOrder = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <RewardsProgressBar />
      <main className="flex-1 container py-16 max-w-lg mx-auto text-center">
        <h1 className="text-4xl font-display font-bold mb-3">Track Your Order 📦</h1>
        <p className="text-muted-foreground mb-8">Enter your order ID to track your jhumkas!</p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Input placeholder="Enter Order ID or Tracking Number" className="text-center" />
          <Button className="w-full bg-gradient-primary text-primary-foreground">
            <Search className="w-4 h-4 mr-2" /> Track Order
          </Button>
        </form>

        <div className="mt-12 text-sm text-muted-foreground space-y-2">
          <p>Can't find your order ID? Check your email for the order confirmation.</p>
          <p>Need help? WhatsApp us or email hello@reelcraft.store</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrackOrder;

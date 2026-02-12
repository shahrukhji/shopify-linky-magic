import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RewardsProgressBar } from "@/components/RewardsProgressBar";
import { MapPin, Heart, Sparkles, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <RewardsProgressBar />
      <main className="flex-1">
        <section className="container py-16 max-w-3xl mx-auto">
          <h1 className="text-4xl font-display font-bold text-center mb-3">About Reelcraft.store 💕</h1>
          <p className="text-muted-foreground text-center mb-12">Our story, from the heart of Delhi to your doorstep</p>

          <div className="prose max-w-none space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Welcome to <strong className="text-foreground">Reelcraft.store!</strong> We are a small business based in Delhi, India, with a deep love for jhumkas and traditional Indian jewelry.
            </p>
            <p>
              Every piece in our collection is hand-picked from the famous local markets of Delhi — <strong className="text-foreground">Sadar Bazaar, Sarojini Nagar, and Chandni Chowk</strong> — ensuring you get the most trending designs at the most affordable prices.
            </p>
            <p>
              We believe every girl deserves to feel special, whether she's dressing up for a wedding, heading to college, or just wanting to add a little sparkle to her day. That's why we curate jhumkas for every occasion and every budget.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { icon: <MapPin className="h-6 w-6" />, label: "Based in Delhi" },
              { icon: <Sparkles className="h-6 w-6" />, label: "Quality Checked" },
              { icon: <Users className="h-6 w-6" />, label: "10,000+ Customers" },
              { icon: <Heart className="h-6 w-6" />, label: "Made with Love" },
            ].map((item, i) => (
              <div key={i} className="bg-magenta-light rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
                  {item.icon}
                </div>
                <p className="text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;

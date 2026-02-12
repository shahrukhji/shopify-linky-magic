import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RewardsProgressBar } from "@/components/RewardsProgressBar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Quote, MapPin, Phone, Mail, ShoppingBag } from "lucide-react";

/* ─── scroll-triggered fade-in hook ─── */
const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
};

/* ─── count-up hook ─── */
const useCountUp = (end: number, duration = 1800) => {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const start = useCallback(() => {
    if (started.current) return;
    started.current = true;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [end, duration]);
  return { count, start };
};

/* ─── Section wrapper with reveal ─── */
const RevealSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* ─── Stat Card ─── */
const StatCard = ({ value, suffix = "", label, icon }: { value: number; suffix?: string; label: string; icon?: string }) => {
  const { ref, visible } = useScrollReveal();
  const { count, start } = useCountUp(value);
  useEffect(() => { if (visible) start(); }, [visible, start]);
  return (
    <div ref={ref} className="text-center p-4 md:p-6">
      <p className="text-3xl md:text-4xl font-display font-bold text-primary">
        {icon ? icon : <>{count}{suffix}</>}
      </p>
      <p className="text-xs md:text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
};

/* ─── Testimonial Card ─── */
const TestimonialCard = ({ quote, name, delay }: { quote: string; name: string; delay: number }) => (
  <RevealSection delay={delay}>
    <div className="bg-card rounded-2xl p-6 md:p-8 shadow-md border border-border relative">
      <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/15" />
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-accent text-accent" />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground mb-4">"{quote}"</p>
      <p className="text-sm font-semibold">— {name}</p>
    </div>
  </RevealSection>
);

/* ─── Why Card ─── */
const WhyCard = ({ icon, title, text, delay }: { icon: string; title: string; text: string; delay: number }) => (
  <RevealSection delay={delay}>
    <div className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow h-full">
      <span className="text-3xl mb-3 block">{icon}</span>
      <h3 className="text-base font-display font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
    </div>
  </RevealSection>
);

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <RewardsProgressBar />
      <main className="flex-1">

        {/* ════ HERO ════ */}
        <section className="relative overflow-hidden bg-gradient-primary py-20 md:py-28">
          {/* decorative circles */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-primary-foreground/5 blur-2xl" />
          <div className="container relative z-10 max-w-3xl text-center">
            <RevealSection>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground leading-tight mb-4">
                From Delhi Ki Galiyon Se, Seedha Aapke Dressing Table Tak 💕
              </h1>
              <p className="text-primary-foreground/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Reelcraft.store — A homegrown Delhi brand bringing you the trendiest artificial jewelry at prices that won't break your budget.
              </p>
            </RevealSection>
          </div>
        </section>

        {/* ════ OUR STORY ════ */}
        <section className="container py-16 md:py-20 max-w-3xl mx-auto">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-8">Our Story ✨</h2>
          </RevealSection>
          <RevealSection delay={100}>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-[15px]">
              <p>Namaste! I'm <strong className="text-foreground">Shahrukh</strong>, founder of Reelcraft.store, and jewelry has been my life for over 7 years.</p>
              <p>Main Rohini, Delhi mein paida hua, bada hua — and growing up in Delhi means you're never too far from the magic of <strong className="text-foreground">Sadar Bazaar, Chandni Chowk, and Karol Bagh</strong>. These bustling jewelry markets are where my journey started. As a teenager, I was fascinated by how local artisans could create pieces so beautiful that they looked like they belonged in a luxury store — yet cost almost nothing.</p>
              <p>Over the past 7+ years, I've worked hands-on with artisans, manufacturers, and local craftsmen across Delhi. I learned everything — which alloy lasts longer, which plating doesn't fade after two wears, which kundan stones actually shine in photos, and which hooks don't hurt your ears. Basically, I became a jewelry nerd 😄</p>
              <p>In 2024, I finally launched Reelcraft.store with one simple belief:</p>
              <blockquote className="border-l-4 border-primary pl-4 italic font-medium text-foreground">'Har ladki ko trendy jewelry milni chahiye — wo bhi bina budget tode.' 💯</blockquote>
              <p>I noticed something that really bothered me. Girls were paying ₹800-₹1500 online for the SAME jhumkas that I could source from Delhi's wholesale markets for a fraction of that price. The middlemen and random resellers were charging insane markups for average quality. That didn't feel right.</p>
              <p>So I decided to cut the middlemen entirely. Reelcraft.store brings jewelry directly from Delhi's famous jewelry hubs — straight to your doorstep. No markups. No fake MRPs. Just honest pricing for genuinely beautiful jewelry.</p>
              <p>And here's what makes us different — I personally <strong className="text-foreground">handpick and quality-check every single piece</strong> before it gets packed. Agar mujhe koi piece pasand nahi aata, toh wo website pe nahi jaata. Simple. 🙅‍♂️</p>
              <p>Every jhumka, every earring, every piece you see here has been held in my hands, checked under light, tested for durability, and approved before it reaches you.</p>
              <p className="font-medium text-foreground">Ye sirf business nahi hai mere liye — ye meri pehchaan hai. 💕</p>
            </div>
          </RevealSection>
        </section>

        {/* ════ WHY REELCRAFT ════ */}
        <section className="bg-magenta-light py-16 md:py-20">
          <div className="container max-w-5xl">
            <RevealSection>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-10">Why 10,000+ Girls Trust Reelcraft.store 💕</h2>
            </RevealSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <WhyCard delay={0} icon="🏪" title="Delhi Se Direct" text="We source directly from Delhi's famous wholesale jewelry hubs — Sadar Bazaar, Chandni Chowk, Karol Bagh. No middlemen, no random markups. You get manufacturer-level pricing that no other online store can match." />
              <WhyCard delay={80} icon="✅" title="Quality Checked, Personally" text="Every single piece is inspected by Shahrukh himself before packing. We check plating quality, stone setting, hook strength, weight, and finish. Agar humein pasand nahi aaya, toh aapko bhi nahi bhejenge." />
              <WhyCard delay={160} icon="💰" title="Affordable Hai, Sasti Nahi" text="We believe affordable should never mean cheap. Our jewelry looks like ₹2000, feels premium on your ears, but starts from just ₹199. Compliments milenge, bill shock nahi. 😉" />
              <WhyCard delay={240} icon="📦" title="Packed With Love from Delhi" text="Every order is carefully packed in bubble wrap, tissue paper, and sturdy boxes. We treat your jewelry like we'd treat our own. Delivered across India in 4-7 days. Delhi NCR? Just 2-3 days! 🚀" />
              <WhyCard delay={320} icon="🔄" title="Easy Returns, Zero Drama" text="Not happy with your order? Return within 7 days — no questions asked, no attitude, no runaround. We want you to shop with full confidence. Your trust matters more than one sale." />
              <WhyCard delay={400} icon="💬" title="Real People, Real Support" text="No bots, no automated replies. Message us on WhatsApp anytime and Shahrukh or his team will personally reply. Need help choosing jhumkas for your outfit? We'll help you pick! Hum hai na. 🤝" />
            </div>
          </div>
        </section>

        {/* ════ STATS ════ */}
        <section className="container py-16 md:py-20 max-w-5xl">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-10">Our Numbers Speak 📊</h2>
          </RevealSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 bg-card rounded-2xl border border-border shadow-sm p-4 md:p-6">
            <StatCard value={7} suffix="+" label="Years in Jewelry Industry" />
            <StatCard value={10000} suffix="+" label="Happy Customers Across India" />
            <StatCard value={2000} suffix="+" label="Unique Designs Curated" />
            <StatCard value={48} suffix="" label="Average Customer Rating" icon="4.8⭐" />
            <StatCard value={500} suffix="+" label="5-Star Reviews" />
            <StatCard value={0} label="Proudly Based in Rohini, Delhi" icon="📍" />
          </div>
        </section>

        {/* ════ TESTIMONIALS ════ */}
        <section className="bg-gold-light py-16 md:py-20">
          <div className="container max-w-5xl">
            <RevealSection>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-10">Sunlo Humari Customers Se 💬</h2>
            </RevealSection>
            <div className="grid md:grid-cols-3 gap-6">
              <TestimonialCard
                delay={0}
                quote="Maine pehli baar online jewelry order ki thi, bohot darr lag raha tha. But Reelcraft ne exact wahi bheja jo photo mein tha. Quality ekdum solid! Plating bhi ekdum smooth — 2 mahine ho gaye, bilkul nahi fade hua. Ab toh regular customer ban gayi hoon 😍"
                name="Priya S., Mumbai ⭐⭐⭐⭐⭐"
              />
              <TestimonialCard
                delay={150}
                quote="₹399 mein itni sundar jhumkis? I literally got so many compliments at my cousin's wedding. Everyone kept asking 'ye kahan se li?' I felt like a queen without spending like one. Thank you Reelcraft! 💕"
                name="Ananya M., Jaipur ⭐⭐⭐⭐⭐"
              />
              <TestimonialCard
                delay={300}
                quote="Bhai Shahrukh se WhatsApp pe baat ki, usne personally suggest kiya mere lehenga ke saath kaunsi jhumki match karegi. Even sent me comparison photos. This level of personal service is RARE in online shopping. 10/10 recommend! 🔥"
                name="Neha K., Delhi ⭐⭐⭐⭐⭐"
              />
            </div>
          </div>
        </section>

        {/* ════ OUR PROMISE ════ */}
        <section className="container py-16 md:py-20 max-w-3xl">
          <RevealSection>
            <div className="rounded-2xl border-2 border-accent bg-card p-8 md:p-10 shadow-md">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-6">Humara Promise 🤝</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-[15px]">
                <p className="font-medium text-foreground">Hum sirf jewelry nahi bechte — hum trust bechte hai. 💯</p>
                <p>Every order that leaves our Rohini warehouse carries a piece of our reputation with it. That's why we NEVER compromise — not on quality, not on packing, not on customer service.</p>
                <p>7 saal ki mehnat, hazaaron customers ka bharosa, aur ek hi mission — aapko India ka best jewelry shopping experience dena.</p>
                <p>Aapka ek order humari puri mehnat hai. And we promise — you'll come back for more! 😊</p>
                <p className="font-semibold text-foreground pt-2">— Shahrukh, Founder</p>
              </div>
            </div>
          </RevealSection>
        </section>

        {/* ════ MEET THE FOUNDER ════ */}
        <section className="bg-magenta-light py-16 md:py-20">
          <div className="container max-w-4xl">
            <RevealSection>
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                {/* avatar placeholder */}
                <div className="flex-shrink-0">
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-primary flex items-center justify-center text-6xl shadow-lg">
                    👋
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Hi, I'm Shahrukh! 👋</h2>
                  <div className="space-y-3 text-muted-foreground text-[15px] leading-relaxed">
                    <p>Founder of Reelcraft.store, full-time jewelry nerd, and a proud Delhiite from Rohini. I've spent 7+ years understanding what makes jewelry truly beautiful — and truly affordable.</p>
                    <p>I still visit Sadar Bazaar and Chandni Chowk every week to handpick new designs for you. Every piece on this website has passed through my hands and been approved by my eyes.</p>
                    <p>If you ever want jewelry advice, need help matching earrings with your outfit, or just want to say hi — message me directly on WhatsApp. Main khud reply karta hoon! 💬</p>
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 mt-5 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-primary" /> Rohini, Delhi</span>
                    <a href="https://wa.me/918595661134" className="flex items-center gap-1 hover:text-primary transition-colors"><Phone className="h-4 w-4 text-primary" /> +91-8595661134</a>
                    <a href="mailto:Reelcraft.store@gmail.com" className="flex items-center gap-1 hover:text-primary transition-colors"><Mail className="h-4 w-4 text-primary" /> reelcraft.store@gmail.com</a>
                    <a href="/shop" className="flex items-center gap-1 hover:text-primary transition-colors"><ShoppingBag className="h-4 w-4 text-primary" /> reelcraft.store</a>
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </section>

        {/* ════ BOTTOM CTA ════ */}
        <section className="py-20 md:py-28 text-center bg-gradient-primary relative overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
          <div className="container relative z-10 max-w-2xl">
            <RevealSection>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-3">Ab Bas Padho Mat — Shopping Shuru Karo! ✨</h2>
              <p className="text-primary-foreground/80 text-base md:text-lg mb-8">Trending jhumkas starting at just ₹199. Free shipping on ₹499+. Aur haan, compliments FREE hai! 😉</p>
              <Link to="/shop">
                <Button size="lg" className="bg-accent text-accent-foreground font-bold px-10 text-base hover:bg-accent/90">
                  SHOP NOW 🛍️ <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </RevealSection>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default About;

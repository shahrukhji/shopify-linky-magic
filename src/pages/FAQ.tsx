import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Do you offer Cash on Delivery?", a: "Yes! COD is available across India. But pay online to get ₹100 OFF! 💳" },
  { q: "What is the delivery time?", a: "4-7 business days across India. Delhi NCR: 2-3 days. We ship fast! 🚚" },
  { q: "Is the jewelry good quality?", a: "Yes! Every piece is quality checked before shipping. We offer 7-day easy returns if you're not satisfied." },
  { q: "How do I get the free jewelry box?", a: "Simply order above ₹1499 and the jewelry carry box (worth ₹499) is automatically added FREE! 🎁" },
  { q: "What is the return policy?", a: "7-day easy returns. Product must be unused with tags intact. We'll arrange a pickup!" },
  { q: "Are these real gold/silver?", a: "No, these are high-quality artificial/fashion jewelry with gold/silver plating and finish. Perfect for everyday wear!" },
  { q: "Do you ship all over India?", a: "Yes! We deliver to all pincodes across India. Free shipping on orders above ₹999! 📦" },
  { q: "How does the Buy More Save More offer work?", a: "Buy 2 items → 10% OFF, Buy 3 items → 15% OFF, Buy 5 items → 20% OFF. Discounts applied automatically!" },
];

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 container py-16 max-w-2xl mx-auto">
        <h1 className="text-4xl font-display font-bold text-center mb-3">Frequently Asked Questions</h1>
        <p className="text-muted-foreground text-center mb-10">Got questions? We've got answers! 💕</p>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-4">
              <AccordionTrigger className="text-sm font-medium text-left">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;

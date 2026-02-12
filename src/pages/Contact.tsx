import { useState } from "react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RewardsProgressBar } from "@/components/RewardsProgressBar";
import { MapPin, Mail, Instagram, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSEO } from "@/hooks/useSEO";

const Contact = () => {
  useSEO({
    title: "Contact Us - Reelcraft.store",
    description: "Have questions? Contact Reelcraft.store via WhatsApp, email, or phone. We're here to help!",
    keywords: "contact reelcraft, customer support, jewelry help",
    url: "https://reelcraft.store/contact"
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }

    setSending(true);

    const text = `Hi Reelcraft! 👋\n\nName: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`;
    const whatsappUrl = `https://wa.me/918595661134?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    toast({ title: "Opening WhatsApp! 💬", description: "Your message is pre-filled and ready to send." });

    setName("");
    setEmail("");
    setMessage("");
    setSending(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <RewardsProgressBar />
      <main className="flex-1 container py-16">
        <h1 className="text-4xl font-display font-bold text-center mb-3">Contact Us 💬</h1>
        <p className="text-muted-foreground text-center mb-12">We'd love to hear from you!</p>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div>
            <h2 className="text-xl font-display font-semibold mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Address</p>
                  <p className="text-sm text-muted-foreground">Mange Ram Park, Budh Vihar, Delhi 110086</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Mobile</p>
                  <a href="tel:+918595661134" className="text-sm text-muted-foreground hover:text-primary transition-colors">+91 8595661134</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Email</p>
                  <a href="mailto:Reelcraft.store@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">Reelcraft.store@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">WhatsApp</p>
                  <a href="https://wa.me/918595661134" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">+91 8595661134</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Instagram className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Instagram</p>
                  <a href="https://instagram.com/reelcraft.store" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">@reelcraft.store</a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-display font-semibold mb-6">Send a Message</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} />
              <Input placeholder="Your Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} />
              <Textarea placeholder="Your Message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} maxLength={1000} />
              <Button type="submit" disabled={sending} className="w-full bg-gradient-primary text-primary-foreground">
                Send via WhatsApp 💬
              </Button>
              <p className="text-xs text-muted-foreground text-center">Opens WhatsApp with your message pre-filled</p>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

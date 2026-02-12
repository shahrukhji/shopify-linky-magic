import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MapPin, Mail, Phone, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
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
                  <p className="text-sm text-muted-foreground">Delhi, India</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Email</p>
                  <p className="text-sm text-muted-foreground">hello@jhumkawali.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">Chat with us!</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Instagram className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Instagram</p>
                  <p className="text-sm text-muted-foreground">@jhumkawali</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-display font-semibold mb-6">Send a Message</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Your Name" />
              <Input placeholder="Your Email" type="email" />
              <Textarea placeholder="Your Message" rows={5} />
              <Button className="w-full bg-gradient-primary text-primary-foreground">Send Message</Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

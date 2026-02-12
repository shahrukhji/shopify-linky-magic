import { Link } from "react-router-dom";
import { MapPin, Mail, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-display font-bold mb-4">Reelcraft.store ✦</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Handpicked jhumkas from the heart of Delhi. Trendy, affordable, and made for every occasion. 💕
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <div className="space-y-2">
              {[
                { label: "Shop All", to: "/shop" },
                { label: "About Us", to: "/about" },
                { label: "Contact", to: "/contact" },
                { label: "Track Order", to: "/track-order" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="block text-sm opacity-70 hover:opacity-100 transition-opacity">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Policies</h4>
            <div className="space-y-2">
              {[
                { label: "Shipping Policy", to: "/shipping-policy" },
                { label: "Return Policy", to: "/shipping-policy" },
                { label: "FAQ", to: "/faq" },
              ].map((link) => (
                <Link key={link.label} to={link.to} className="block text-sm opacity-70 hover:opacity-100 transition-opacity">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-3 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Mange Ram Park, Budh Vihar, Delhi 110086</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>Reelcraft.store@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="h-4 w-4 flex-shrink-0" />
                <span>@reelcraft.store</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm opacity-60">
          <p>© 2025 Reelcraft.store. Made with 💕 in Delhi.</p>
          <p className="mt-1">UPI • Cards • COD Available</p>
        </div>
      </div>
    </footer>
  );
};

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Package, Truck, Gift, CheckCircle2, ShoppingBag, Plus } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { calculateRewards, SHIPPING_COST, getDiscountCodeForSubtotal } from "@/lib/cartRewards";

interface CODOrderFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: any;
  selectedVariant: any;
}

interface UpsellProduct {
  product: ShopifyProduct;
  variant: any;
  added: boolean;
}

type FormStep = "form" | "upsells" | "success";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh",
];

export const CODOrderForm = ({ open, onOpenChange, product, selectedVariant }: CODOrderFormProps) => {
  const [step, setStep] = useState<FormStep>("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [upsellProducts, setUpsellProducts] = useState<UpsellProduct[]>([]);
  const [orderResult, setOrderResult] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    province: "",
    zip: "",
  });

  // Fetch upsell products
  useEffect(() => {
    if (!open || !product) return;
    const fetchUpsells = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 10 });
        const products = data?.data?.products?.edges || [];
        const filtered = products
          .filter((p: ShopifyProduct) => p.node.id !== product.id && p.node.variants.edges[0]?.node.availableForSale)
          .slice(0, 3)
          .map((p: ShopifyProduct) => ({
            product: p,
            variant: p.node.variants.edges[0]?.node,
            added: false,
          }));
        setUpsellProducts(filtered);
      } catch (e) {
        console.error("Failed to fetch upsells:", e);
      }
    };
    fetchUpsells();
  }, [open, product]);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setStep("form");
      setQuantity(1);
      setForm({ firstName: "", lastName: "", phone: "", email: "", address1: "", address2: "", city: "", province: "", zip: "" });
      setOrderResult(null);
      setUpsellProducts(prev => prev.map(u => ({ ...u, added: false })));
    }
  }, [open]);

  const price = parseFloat(selectedVariant?.price?.amount || "0");
  const mainItemTotal = price * quantity;
  const upsellTotal = upsellProducts.filter(u => u.added).reduce((sum, u) => sum + parseFloat(u.variant?.price?.amount || "0"), 0);
  const subtotal = mainItemTotal + upsellTotal;
  const rewards = calculateRewards(subtotal);
  const finalTotal = subtotal - rewards.discount + rewards.shippingCost;

  const updateField = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const toggleUpsell = (index: number) => {
    setUpsellProducts(prev => prev.map((u, i) => i === index ? { ...u, added: !u.added } : u));
  };

  const validateForm = () => {
    if (!form.firstName.trim()) { toast.error("Please enter your name"); return false; }
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) { toast.error("Please enter a valid 10-digit phone number"); return false; }
    if (!form.address1.trim()) { toast.error("Please enter your address"); return false; }
    if (!form.city.trim()) { toast.error("Please enter your city"); return false; }
    if (!form.province) { toast.error("Please select your state"); return false; }
    if (!form.zip.trim() || form.zip.replace(/\D/g, '').length !== 6) { toast.error("Please enter a valid 6-digit pincode"); return false; }
    return true;
  };

  const handleProceedToUpsells = () => {
    if (!validateForm()) return;
    if (upsellProducts.length > 0) {
      setStep("upsells");
    } else {
      handlePlaceOrder();
    }
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    try {
      const items = [
        { variantId: selectedVariant.id, quantity, title: product.title, price: selectedVariant.price.amount },
        ...upsellProducts.filter(u => u.added).map(u => ({
          variantId: u.variant.id,
          quantity: 1,
          title: u.product.node.title,
          price: u.variant.price.amount,
        })),
      ];

      const discountCode = getDiscountCodeForSubtotal(subtotal);

      const { data, error } = await supabase.functions.invoke('create-cod-order', {
        body: {
          customer: { ...form, country: 'India' },
          items,
          discountCode,
          note: `COD Order | Qty: ${quantity} | Upsells: ${upsellProducts.filter(u => u.added).length}`,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setOrderResult(data);
      setStep("success");
    } catch (error: any) {
      console.error("Order failed:", error);
      toast.error("Order failed", { description: error.message || "Please try again or contact support." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-0">
        {step === "form" && (
          <div className="p-6 space-y-4">
            <DialogHeader>
              <DialogTitle className="font-display text-xl flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Cash on Delivery
              </DialogTitle>
            </DialogHeader>

            {/* Product summary */}
            <div className="flex gap-3 p-3 rounded-lg bg-muted/50 border">
              {product.images?.edges?.[0]?.node && (
                <img src={product.images.edges[0].node.url} alt={product.title} className="w-14 h-14 rounded-md object-cover" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{product.title}</p>
                <p className="text-xs text-muted-foreground">{selectedVariant?.selectedOptions?.map((o: any) => o.value).join(' • ')}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-sm">₹{price.toFixed(0)}</span>
                  <div className="flex items-center gap-1 border rounded-md">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setQuantity(Math.max(1, quantity - 1))}><span className="text-lg">−</span></Button>
                    <span className="w-6 text-center text-sm font-medium">{quantity}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setQuantity(quantity + 1)}><span className="text-lg">+</span></Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Rewards preview */}
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {subtotal < 499 && <Badge variant="outline" className="bg-muted/50">🚚 Add ₹{499 - Math.floor(subtotal)} more for Free Ship</Badge>}
              {rewards.freeShipping && <Badge className="bg-green-100 text-green-700 border-green-200">✅ Free Shipping</Badge>}
              {rewards.discount > 0 && <Badge className="bg-green-100 text-green-700 border-green-200">💰 ₹{rewards.discount} OFF</Badge>}
              {rewards.freeGift && <Badge className="bg-green-100 text-green-700 border-green-200">🎁 Free Jewelry Box</Badge>}
            </div>

            {/* Customer form */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="First Name *" value={form.firstName} onChange={e => updateField('firstName', e.target.value)} />
                <Input placeholder="Last Name" value={form.lastName} onChange={e => updateField('lastName', e.target.value)} />
              </div>
              <Input placeholder="Phone Number *" type="tel" value={form.phone} onChange={e => updateField('phone', e.target.value)} />
              <Input placeholder="Email (optional)" type="email" value={form.email} onChange={e => updateField('email', e.target.value)} />
              <Input placeholder="Address Line 1 *" value={form.address1} onChange={e => updateField('address1', e.target.value)} />
              <Input placeholder="Address Line 2" value={form.address2} onChange={e => updateField('address2', e.target.value)} />
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="City *" value={form.city} onChange={e => updateField('city', e.target.value)} />
                <Input placeholder="Pincode *" type="text" maxLength={6} value={form.zip} onChange={e => updateField('zip', e.target.value.replace(/\D/g, ''))} />
              </div>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={form.province}
                onChange={e => updateField('province', e.target.value)}
              >
                <option value="">Select State *</option>
                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Order total */}
            <div className="border-t pt-3 space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal.toFixed(0)}</span></div>
              {rewards.discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{rewards.discount}</span></div>}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                {rewards.freeShipping ? <span className="text-green-600">FREE</span> : <span>₹{SHIPPING_COST}</span>}
              </div>
              <div className="flex justify-between font-bold text-base border-t pt-2">
                <span>Total (COD)</span><span>₹{finalTotal.toFixed(0)}</span>
              </div>
            </div>

            <Button className="w-full bg-gradient-primary text-primary-foreground font-semibold" size="lg" onClick={handleProceedToUpsells} disabled={isSubmitting}>
              {upsellProducts.length > 0 ? "Continue →" : "Place COD Order"}
            </Button>

            <p className="text-[10px] text-center text-muted-foreground">💵 Pay cash when your order arrives. No online payment needed.</p>
          </div>
        )}

        {step === "upsells" && (
          <div className="p-6 space-y-4">
            <DialogHeader>
              <DialogTitle className="font-display text-xl flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                Complete Your Look ✨
              </DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">Customers who bought this also loved these — add them to your order!</p>

            <div className="space-y-3">
              {upsellProducts.map((upsell, i) => (
                <div
                  key={i}
                  className={`flex gap-3 p-3 rounded-lg border cursor-pointer transition-all ${upsell.added ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-border hover:border-primary/40'}`}
                  onClick={() => toggleUpsell(i)}
                >
                  {upsell.product.node.images?.edges?.[0]?.node && (
                    <img src={upsell.product.node.images.edges[0].node.url} alt="" className="w-16 h-16 rounded-md object-cover" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{upsell.product.node.title}</p>
                    <p className="text-sm font-bold mt-1">₹{parseFloat(upsell.variant?.price?.amount || "0").toFixed(0)}</p>
                  </div>
                  <div className="flex items-center">
                    <Checkbox checked={upsell.added} className="h-5 w-5" />
                  </div>
                </div>
              ))}
            </div>

            {/* Updated total with upsells */}
            <div className="border-t pt-3 space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Main Item</span><span>₹{mainItemTotal.toFixed(0)}</span></div>
              {upsellTotal > 0 && <div className="flex justify-between text-primary"><span>Upsell Items</span><span>+₹{upsellTotal.toFixed(0)}</span></div>}
              {rewards.discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{rewards.discount}</span></div>}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                {rewards.freeShipping ? <span className="text-green-600">FREE</span> : <span>₹{SHIPPING_COST}</span>}
              </div>
              <div className="flex justify-between font-bold text-base border-t pt-2">
                <span>Total (COD)</span><span>₹{finalTotal.toFixed(0)}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => handlePlaceOrder()} disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Skip & Order"}
              </Button>
              <Button className="flex-1 bg-gradient-primary text-primary-foreground font-semibold" onClick={() => handlePlaceOrder()} disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4 mr-1" />Order with Add-ons</>}
              </Button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="p-6 space-y-4 text-center">
            <CheckCircle2 className="h-16 w-16 text-primary mx-auto" />
            <h2 className="font-display text-2xl font-bold">Order Confirmed! 🎉</h2>
            <p className="text-muted-foreground">
              Your COD order <span className="font-bold text-foreground">{orderResult?.orderName}</span> has been placed successfully!
            </p>
            <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-2">
              <div className="flex justify-between"><span className="text-muted-foreground">Order Number</span><span className="font-bold">{orderResult?.orderName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total Amount</span><span className="font-bold">₹{orderResult?.totalPrice}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Payment</span><span className="font-bold">Cash on Delivery</span></div>
            </div>
            <p className="text-xs text-muted-foreground">You'll receive an order confirmation on your phone. Pay cash when your order arrives! 💵</p>
            <Button className="w-full" onClick={() => onOpenChange(false)}>Continue Shopping</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

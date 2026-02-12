import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { RewardsProgressBar } from "@/components/RewardsProgressBar";
import { calculateRewards, calculateOnlineBonus, SHIPPING_COST } from "@/lib/cartRewards";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
  const rewards = calculateRewards(subtotal);
  const afterDiscount = subtotal - rewards.discount;
  const onlineBonus = calculateOnlineBonus(afterDiscount);
  const finalTotal = afterDiscount + rewards.shippingCost;
  const totalSavings = rewards.discount + (rewards.freeShipping ? SHIPPING_COST : 0) + (rewards.freeGift ? 499 : 0);

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-display">Shopping Cart</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>

        {/* Progress bar inside cart */}
        <div className="flex-shrink-0 border-b pb-3">
          <RewardsProgressBar compact />
        </div>

        <div className="flex flex-col flex-1 pt-4 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mt-1">Add some beautiful jhumkas! ✨</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 p-3 rounded-lg bg-muted/50">
                      <div className="w-16 h-16 bg-secondary rounded-md overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate text-sm">{item.product.node.title}</h4>
                        <p className="text-xs text-muted-foreground">{item.selectedOptions.map(o => o.value).join(' • ')}</p>
                        <p className="font-semibold text-sm mt-1">₹{parseFloat(item.price.amount).toFixed(0)}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeItem(item.variantId)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Free gift display */}
                  {rewards.freeGift && (
                    <div className="flex gap-4 p-3 rounded-lg bg-accent/10 border border-accent/30">
                      <div className="w-16 h-16 bg-accent/20 rounded-md flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">🎁</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm">FREE Premium Jewelry Carry Box</h4>
                          <Badge className="bg-accent text-accent-foreground text-[10px] px-1.5 py-0">FREE GIFT</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Worth ₹499 — Yours FREE! 🎉</p>
                        <p className="font-semibold text-sm mt-1 text-green-600">₹0 <span className="line-through text-muted-foreground font-normal">₹499</span></p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Cart summary */}
              <div className="flex-shrink-0 space-y-3 pt-4 border-t">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toFixed(0)}</span>
                  </div>
                  {rewards.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Milestone Discount</span>
                      <span>-₹{rewards.discount}</span>
                    </div>
                  )}
                  {onlineBonus > 0 && (
                    <div className="flex justify-between text-green-600/70">
                      <span className="text-xs">Online Payment Bonus (5%)</span>
                      <span className="text-xs">-₹{onlineBonus} <span className="text-muted-foreground">(at checkout)</span></span>
                    </div>
                  )}
                  {rewards.freeGift && (
                    <div className="flex justify-between text-accent">
                      <span>Jewelry Box</span>
                      <span>FREE 🎁 <span className="line-through text-muted-foreground text-xs">₹499</span></span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    {rewards.freeShipping ? (
                      <span className="text-green-600">FREE 🚚 <span className="line-through text-muted-foreground text-xs">₹79</span></span>
                    ) : (
                      <span>₹{SHIPPING_COST}</span>
                    )}
                  </div>
                  <div className="border-t pt-2 flex justify-between items-center">
                    <span className="text-lg font-semibold font-display">Total</span>
                    <span className="text-xl font-bold">₹{finalTotal.toFixed(0)}</span>
                  </div>
                  {totalSavings > 0 && (
                    <p className="text-center text-green-600 font-bold text-sm">You're saving ₹{totalSavings}! 🎉</p>
                  )}
                </div>
                <Button onClick={handleCheckout} className="w-full bg-gradient-primary text-primary-foreground" size="lg" disabled={items.length === 0 || isLoading || isSyncing}>
                  {isLoading || isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ExternalLink className="w-4 h-4 mr-2" />Checkout</>}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

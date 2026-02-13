// Cart reward milestones and offer logic
export const MILESTONES = [
  { threshold: 499, label: "₹499", sublabel: "Free Ship + ₹50 OFF", icon: "truck" as const },
  { threshold: 999, label: "₹999", sublabel: "₹100 OFF", icon: "discount" as const },
  { threshold: 1499, label: "₹1499", sublabel: "Free Jewelry Box", icon: "gift" as const },
];

export const MAX_THRESHOLD = 1499;
export const SHIPPING_COST = 75;

export interface CartRewards {
  discount: number;
  freeShipping: boolean;
  freeGift: boolean;
  shippingCost: number;
  unlockedMilestones: number; // 0, 1, 2, or 3
}

export function calculateRewards(subtotal: number): CartRewards {
  if (subtotal >= 1499) {
    return { discount: 100, freeShipping: true, freeGift: true, shippingCost: 0, unlockedMilestones: 3 };
  }
  if (subtotal >= 999) {
    return { discount: 100, freeShipping: true, freeGift: false, shippingCost: 0, unlockedMilestones: 2 };
  }
  if (subtotal >= 499) {
    return { discount: 50, freeShipping: true, freeGift: false, shippingCost: 0, unlockedMilestones: 1 };
  }
  return { discount: 0, freeShipping: false, freeGift: false, shippingCost: SHIPPING_COST, unlockedMilestones: 0 };
}

export function calculateOnlineBonus(discountedTotal: number): number {
  return Math.round(discountedTotal * 0.05);
}

export function getProgressText(subtotal: number): string {
  if (subtotal <= 0) return "🛒 Add items worth ₹499 to unlock FREE Shipping + ₹50 OFF!";
  if (subtotal < 499) return `🚚 Add ₹${499 - Math.floor(subtotal)} more to unlock FREE Shipping + ₹50 OFF!`;
  if (subtotal < 999) return `✅ Free Shipping + ₹50 OFF unlocked! Add ₹${999 - Math.floor(subtotal)} more for ₹100 OFF! 💰`;
  if (subtotal < 1499) return `✅ ₹100 OFF unlocked! Add ₹${1499 - Math.floor(subtotal)} more for a FREE Jewelry Box worth ₹499! 🎁`;
  return "🎉 ALL 3 rewards unlocked! You're getting the best deal!";
}

export function getProgressPercent(subtotal: number): number {
  return Math.min(100, (subtotal / MAX_THRESHOLD) * 100);
}

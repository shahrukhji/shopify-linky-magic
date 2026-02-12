import { useEffect, useRef, useState } from "react";
import { Truck, Tag, Gift, X, Check } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { MILESTONES, MAX_THRESHOLD, getProgressText, calculateRewards } from "@/lib/cartRewards";
import { toast } from "sonner";

const milestoneIcons = {
  truck: Truck,
  discount: Tag,
  gift: Gift,
};

interface RewardsProgressBarProps {
  compact?: boolean;
}

export const RewardsProgressBar = ({ compact = false }: RewardsProgressBarProps) => {
  const items = useCartStore((s) => s.items);
  const subtotal = items.reduce((sum, item) => sum + parseFloat(item.price.amount) * item.quantity, 0);
  const rewards = calculateRewards(subtotal);
  const progressText = getProgressText(subtotal);
  const percent = Math.min(100, (subtotal / MAX_THRESHOLD) * 100);

  const [dismissed, setDismissed] = useState(false);
  const prevMilestones = useRef(rewards.unlockedMilestones);

  // Toast on milestone crossing
  useEffect(() => {
    const prev = prevMilestones.current;
    const curr = rewards.unlockedMilestones;
    if (curr > prev && prev >= 0) {
      if (curr >= 1 && prev < 1) toast.success("🎉 FREE Shipping + ₹50 OFF unlocked!", { position: "top-center", duration: 4000 });
      if (curr >= 2 && prev < 2) toast.success("🎉 Upgraded to ₹100 OFF!", { position: "top-center", duration: 4000 });
      if (curr >= 3 && prev < 3) toast.success("🎉 FREE Jewelry Box worth ₹499 added! 🎁", { position: "top-center", duration: 4000, style: { background: "hsl(42 80% 55%)", color: "#fff" } });
      setDismissed(false);
    }
    prevMilestones.current = curr;
  }, [rewards.unlockedMilestones]);

  // Show again when cart updates
  useEffect(() => {
    if (items.length > 0) setDismissed(false);
  }, [items]);

  if (dismissed && compact) return null;

  return (
    <div className={`w-full ${compact ? "" : "bg-background/95 backdrop-blur border-b"}`}>
      <div className={compact ? "px-1 py-3" : "container py-3"}>
        <div className="relative">
          {/* Dismiss button on mobile for non-compact */}
          {!compact && (
            <button
              onClick={() => setDismissed(true)}
              className="absolute -top-1 -right-1 md:hidden z-10 w-5 h-5 rounded-full bg-muted flex items-center justify-center"
            >
              <X className="h-3 w-3 text-muted-foreground" />
            </button>
          )}

          {/* Progress track */}
          <div className="relative mx-4 md:mx-8">
            {/* Track background */}
            <div className="h-2.5 md:h-3 rounded-full bg-muted overflow-hidden shadow-inner">
              {/* Filled portion with shimmer */}
              <div
                className="h-full rounded-full relative overflow-hidden transition-all duration-700 ease-out"
                style={{
                  width: `${percent}%`,
                  background: "linear-gradient(90deg, hsl(340 75% 48%), hsl(42 80% 55%))",
                }}
              >
                <div className="absolute inset-0 animate-shimmer" />
              </div>
            </div>

            {/* Milestone nodes */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2">
              {MILESTONES.map((m, i) => {
                const pos = (m.threshold / MAX_THRESHOLD) * 100;
                const unlocked = subtotal >= m.threshold;
                const Icon = milestoneIcons[m.icon];
                return (
                  <div
                    key={i}
                    className="absolute -translate-x-1/2 flex flex-col items-center"
                    style={{ left: `${pos}%` }}
                  >
                    {/* Node circle */}
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 relative ${
                        unlocked
                          ? "bg-accent border-green-500 shadow-[0_0_12px_hsl(42_80%_55%/0.5)]"
                          : "bg-muted border-border"
                      }`}
                    >
                      <Icon className={`h-3.5 w-3.5 md:h-4 md:w-4 ${unlocked ? "text-white" : "text-muted-foreground"}`} />
                      {unlocked && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                          <Check className="h-2.5 w-2.5 text-white" />
                        </div>
                      )}
                    </div>
                    {/* Labels */}
                    <span className={`text-[10px] md:text-xs font-semibold mt-1 ${unlocked ? "text-foreground" : "text-muted-foreground"}`}>
                      {m.label}
                    </span>
                    {!compact && (
                      <span className="text-[8px] md:text-[10px] text-muted-foreground whitespace-nowrap hidden sm:block">
                        {m.sublabel}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dynamic text */}
          <p className={`text-center text-xs md:text-sm font-medium text-muted-foreground transition-all duration-300 ${compact ? "mt-10" : "mt-12 md:mt-14"}`}>
            {progressText}
          </p>
        </div>
      </div>
    </div>
  );
};

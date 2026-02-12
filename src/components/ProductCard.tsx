import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const { node } = product;
  const image = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const firstVariant = node.variants.edges[0]?.node;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant) return;
    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });
    toast.success("Added to cart! 🛒", {
      description: node.title,
      position: "top-center",
    });
  };

  return (
    <Link to={`/product/${node.handle}`} className="group block">
      <div className="bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-300">
        <div className="aspect-square overflow-hidden bg-secondary">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <span className="text-4xl">✦</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {node.title}
          </h3>
          <div className="flex items-center justify-between">
            <p className="font-bold text-lg">
              ₹{parseFloat(price.amount).toFixed(0)}
            </p>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={isLoading || !firstVariant?.availableForSale}
              className="bg-gradient-primary text-primary-foreground text-xs"
            >
              {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <><ShoppingCart className="w-3 h-3 mr-1" />Add</>}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

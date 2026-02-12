import { useEffect, useState } from "react";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { Loader2, ShoppingBag } from "lucide-react";

interface ProductGridProps {
  title?: string;
  limit?: number;
  query?: string;
}

export const ProductGrid = ({ title, limit = 20, query }: ProductGridProps) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: limit, query: query || null });
        if (data?.data?.products?.edges) {
          setProducts(data.data.products.edges);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [limit, query]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <section className="py-12">
      {title && (
        <h2 className="text-3xl font-display font-bold text-center mb-8">{title}</h2>
      )}
      {products.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-display font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Hum jaldi hi amazing jhumkas add karenge! Stay tuned for our stunning collection. ✨
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

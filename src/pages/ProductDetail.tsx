import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { storefrontApiRequest, STOREFRONT_PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RewardsProgressBar } from "@/components/RewardsProgressBar";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, ArrowLeft, Truck, Gift, RotateCcw, Banknote } from "lucide-react";
import { CODOrderForm } from "@/components/CODOrderForm";
import { toast } from "sonner";
import { useSEO } from "@/hooks/useSEO";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [codFormOpen, setCodFormOpen] = useState(false);

  // Reset image selection when variant changes
  const handleVariantChange = (idx: number) => {
    setSelectedVariantIdx(idx);
    setSelectedImage(0);
  };
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);

  // SEO
  useSEO({
    title: product?.title || "Product Details",
    description: product?.description?.substring(0, 155) || "Shop this beautiful jhumka at Reelcraft.store",
    keywords: `${product?.title || "jhumka"}, earrings, jewelry, buy online`,
    url: `https://reelcraft.store/product/${handle}`,
    type: "product",
    image: product?.images?.edges?.[0]?.node?.url,
    schema: product ? {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.title,
      "description": product.description,
      "image": product.images.edges.map((img: any) => img.node.url),
      "brand": {
        "@type": "Brand",
        "name": "Reelcraft.store"
      },
      "offers": {
        "@type": "Offer",
        "url": `https://reelcraft.store/product/${handle}`,
        "priceCurrency": "INR",
        "price": product.variants.edges[0]?.node?.price?.amount || "0"
      }
    } : undefined
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCT_BY_HANDLE_QUERY, { handle });
        if (data?.data?.productByHandle) {
          setProduct(data.data.productByHandle);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    if (handle) fetchProduct();
  }, [handle]);

  const handleAddToCart = async () => {
    if (!product) return;
    const variant = product.variants.edges[selectedVariantIdx]?.node;
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart! 🛒", { description: product.title, position: "top-center" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AnnouncementBar />
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <AnnouncementBar />
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl font-display">Product not found</p>
            <Link to="/shop" className="text-primary mt-4 inline-block">← Back to Shop</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const allImages = product.images.edges;
  const selectedVariant = product.variants.edges[selectedVariantIdx]?.node;

  // Filter images by selected color if the product has a Color option
  const selectedColor = selectedVariant?.selectedOptions?.find((o: any) => o.name === "Color")?.value?.toLowerCase();
  const images = selectedColor
    ? allImages.filter((img: any) => img.node.altText?.toLowerCase().includes(selectedColor)) 
    : allImages;
  // Fallback to all images if no color-specific images found
  const displayImages = images.length > 0 ? images : allImages;

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <RewardsProgressBar />
      <main className="flex-1 container py-8">
        <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div>
            <div className="aspect-square rounded-xl overflow-hidden bg-secondary mb-4">
              {displayImages[selectedImage]?.node && (
                <img
                  src={displayImages[selectedImage].node.url}
                  alt={displayImages[selectedImage].node.altText || product.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {displayImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {displayImages.map((img: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 ${i === selectedImage ? 'border-primary' : 'border-transparent'}`}
                  >
                    <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl font-display font-bold mb-2">{product.title}</h1>
            <p className="text-2xl font-bold text-primary mb-4">
              ₹{parseFloat(selectedVariant?.price.amount || "0").toFixed(0)}
            </p>

            {/* Variant selection */}
            {product.options?.map((option: any, oi: number) => (
              option.values.length > 1 && (
                <div key={oi} className="mb-4">
                  <p className="text-sm font-medium mb-2">{option.name}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.edges.map((v: any, vi: number) => {
                      const opt = v.node.selectedOptions.find((o: any) => o.name === option.name);
                      return (
                        <Button
                          key={vi}
                          variant={vi === selectedVariantIdx ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleVariantChange(vi)}
                          className={vi === selectedVariantIdx ? "bg-gradient-primary text-primary-foreground" : ""}
                        >
                          {opt?.value || v.node.title}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )
            ))}

            <div className="flex gap-2 mt-4">
              <Button
                size="lg"
                className="flex-1 bg-gradient-primary text-primary-foreground font-semibold"
                onClick={handleAddToCart}
                disabled={isLoading || !selectedVariant?.availableForSale}
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ShoppingCart className="w-4 h-4 mr-2" />Add to Cart</>}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
                onClick={() => setCodFormOpen(true)}
                disabled={!selectedVariant?.availableForSale}
              >
                <Banknote className="w-4 h-4 mr-2" />Buy Now (COD)
              </Button>
            </div>

            {/* Mini rewards info */}
            <div className="mt-4 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground leading-relaxed">
              🚚 ₹499+ → Free Ship + ₹50 OFF | 💰 ₹999+ → ₹100 OFF | 🎁 ₹1499+ → Free Jewelry Box
            </div>

            {/* COD Order Form */}
            {product && selectedVariant && (
              <CODOrderForm
                open={codFormOpen}
                onOpenChange={setCodFormOpen}
                product={product}
                selectedVariant={selectedVariant}
              />
            )}

            <p className="text-sm text-muted-foreground mt-6 leading-relaxed">{product.description}</p>

            <div className="mt-6 space-y-3 border-t pt-6">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-4 w-4 text-primary" />
                <span>Free shipping on orders above ₹499</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Gift className="h-4 w-4 text-primary" />
                <span>Free jewelry box on orders above ₹1499</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="h-4 w-4 text-primary" />
                <span>7-day easy return policy</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;

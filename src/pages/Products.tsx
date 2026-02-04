import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Loader2, ArrowLeft, Sparkles } from "lucide-react";

type SkinType = "dry" | "oily" | "combination" | "normal" | "sensitive";

const skinTypeInfo: Record<SkinType, { title: string; description: string; keywords: string[] }> = {
  dry: {
    title: "Dry Skin",
    description: "Hydrating products with rich moisturizers and nourishing ingredients",
    keywords: ["hydrating", "moisturizing", "nourishing", "cream", "oil", "hyaluronic"]
  },
  oily: {
    title: "Oily Skin",
    description: "Lightweight, oil-free products with mattifying and clarifying properties",
    keywords: ["oil-free", "mattifying", "gel", "salicylic", "clarifying", "lightweight"]
  },
  combination: {
    title: "Combination Skin",
    description: "Balancing products that address both dry and oily areas",
    keywords: ["balancing", "gel-cream", "lightweight", "hydrating"]
  },
  normal: {
    title: "Normal Skin",
    description: "Gentle maintenance products to preserve your skin's natural balance",
    keywords: ["gentle", "balanced", "antioxidant", "protective"]
  },
  sensitive: {
    title: "Sensitive Skin",
    description: "Fragrance-free, gentle products designed to soothe and protect",
    keywords: ["gentle", "soothing", "fragrance-free", "calming", "sensitive"]
  }
};

export default function Products() {
  const { skinType } = useParams<{ skinType: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const skinInfo = skinType && skinType in skinTypeInfo 
    ? skinTypeInfo[skinType as SkinType] 
    : null;

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedProducts = await fetchProducts(20);
        setProducts(fetchedProducts);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [skinType]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-40 right-10 w-56 h-56 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-primary/3 blur-2xl" />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-primary/20" />
      <div className="absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2 border-primary/20" />

      {/* Header */}
      <header className="relative z-10 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Quiz
          </Button>
          <CartDrawer />
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero section */}
        <div className="text-center mb-12 space-y-6">
          <div className="flex justify-center items-center gap-3">
            <div className="w-8 h-[1px] bg-primary/50" />
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <div className="w-8 h-[1px] bg-primary/50" />
          </div>
          
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
              Curated For You
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground">
              {skinInfo ? (
                <>
                  Products for <span className="italic text-primary">{skinInfo.title}</span>
                </>
              ) : (
                <>
                  All <span className="italic text-primary">Products</span>
                </>
              )}
            </h1>
            {skinInfo && (
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                {skinInfo.description}
              </p>
            )}
          </div>

          <div className="flex justify-center items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-primary/40" />
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="w-1 h-1 rounded-full bg-primary/40" />
          </div>
        </div>

        {/* Products grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-secondary/20 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-medium text-foreground">No products yet</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                We don't have any products in the store yet. Tell me what products you'd like to sell and I'll help you add them!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* Footer decoration */}
      <div className="absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 border-primary/20" />
      <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-primary/20" />
    </div>
  );
}

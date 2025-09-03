import { getStorefrontProductById } from "@/app/api/storefrontApi";
import ProductDetailClient from "../product/[id]/ProductDetailClient";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getStorefrontProductById(params.id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="mb-8">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
      </div>
    );
  }

  return <ProductDetailClient product={product} productId={params.id} />;
}

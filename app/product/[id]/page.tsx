import { getStorefrontProductById } from "@/app/api/storefrontApi";
import ProductDetailClient from "./ProductDetailClient";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ProductDetailPageWrapper(props: ProductDetailPageProps) {
  return <AsyncProductDetail {...props} />;
}

async function AsyncProductDetail(props: ProductDetailPageProps) {
  const { id } = await props.params;
  const product = await getStorefrontProductById(id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="mb-8">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
      </div>
    );
  }

  return <ProductDetailClient product={product} productId={id} />;
}
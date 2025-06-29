import CategoryPage from "@/components/category/CategoryPage";
import { getProducts } from "../api/productsApi";
import { getCategories } from "../api/categoriesApi";
import { getColors } from "../api/colorsApi";
import { getSizes } from "../api/sizesApi";
import { getPvs } from "../api/productVariantsApi";
import { FetchedData, StorefrontData } from "@/lib/types";
import { getStorefrontData } from "../api/storefrontApi";

async function fetchData() {
  let data: FetchedData = {
    products: [],
    categories: [],
    colors: [],
    sizes: [],
    productVariants: [],
  };
  let error = "";
  try {
    const [products, categories, colors, sizes, productVariants] = await Promise.all([
      getProducts(),
      getCategories(),
      getColors(),
      getSizes(),
      getPvs(),
    ]);
    data = { products, categories, colors, sizes, productVariants };
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }

  return { data, error };
}

async function fetchStorefrontData() {
  try {
    const storefrontData = await getStorefrontData();
    const error = null;
    return { data: storefrontData, error };
  } catch (e) {
    const error = e instanceof Error ? e.message : String(e);
    const data: StorefrontData = { products: [] };
    return { data, error };
  }
}

export default async function MenPage() {
  const { data, error } = await fetchStorefrontData();

  console.log(data)

  if (error || !data) {
    return (
      <div>
        <h2>Something went wrong!</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Men's Collection</h1>
      <CategoryPage products={data.products} />
    </div>
  );
}

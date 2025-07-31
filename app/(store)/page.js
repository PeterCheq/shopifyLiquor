import DiscountBanner from "@/components/DiscountBanner";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export const dynamic = "force-static";
export const revalidate = 3600;

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  console.log(crypto.randomUUID().slice(0, 5) + `rerendered`);

  return (
    <div className="pt-4  bg-gradient-to-r from-gray-50 to-gray-100 ">
      <div className="mx-auto max-w-7xl pt-4">
        <DiscountBanner />
        <div className="flex flex-col items-center justify-top min-h-screen p-4">
          <ProductsView products={products} categories={categories} />
        </div>
      </div>
    </div>
  );
}

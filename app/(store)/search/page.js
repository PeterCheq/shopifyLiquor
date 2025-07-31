import ProductGrid from "@/components/ProductGrid";
import { getProductBySearch } from "@/sanity/lib/products/searchProductsByName";

async function SearchPage({ searchParams }) {
  const { query } = await searchParams;
  const products = await getProductBySearch(query);

  if (!products.length) {
    return (
      <div className="flex flex-col itmes-center justify-top min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-md w-full ">
          <h1 className="text-3xl font-bold mb-6 text-center">
            No products found for: {query}
          </h1>
          <p className="text-gray-600 text-center">
            Try searching with different keywords
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
      <div className=" p-8 rounded-lg shadow-md w-full max-w-7xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Search results for {query}
        </h1>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

export default SearchPage;

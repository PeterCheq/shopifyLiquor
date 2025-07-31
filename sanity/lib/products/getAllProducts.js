import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllProducts = async () => {
  const all_products = defineQuery(`
        *[_type == 'product'] | order(name asc)
        `);

  try {
    const products = await sanityFetch({
      query: all_products,
    });

    return products.data || [];
  } catch (error) {
    console.error("Error fetching all products: ", error);
    return [];
  }
};

import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductBySearch = async (searchParam) => {
  const get_search_product = defineQuery(`
        *[_type == 'product' && name match $searchParam ] | order(name asc)
        `);

  try {
    const products = await sanityFetch({
      query: get_search_product,
      params: {
        searchParam: `${searchParam}*`,
      },
    });

    return products.data || [];
  } catch (error) {
    console.error("Error fetching all products: ", error);
    return [];
  }
};

import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductByCategory = async (slug) => {
  const get_category = defineQuery(`
        *[_type == 'product' && references(*[_type == 'category' && slug.current == $slug]._id)] | order(name asc)
        `);

  try {
    const products = await sanityFetch({
      query: get_category,
      params: {
        slug,
      },
    });

    return products.data || [];
  } catch (error) {
    console.error("Error fetching all products: ", error);
    return [];
  }
};

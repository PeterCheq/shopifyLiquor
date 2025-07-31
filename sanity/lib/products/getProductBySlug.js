import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductBySlug = async (slug) => {
  console.log("slug >>>", slug);

  const get_slug_product = defineQuery(`
        *[_type == 'product' && productslug.current == $slug ] | order(name asc)[0]
        `);

  try {
    const products = await sanityFetch({
      query: get_slug_product,
      params: {
        slug,
      },
    });

    return products.data || [];
  } catch (error) {
    console.error("Error fetching product slug: ", error);
    return [];
  }
};

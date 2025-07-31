import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAvtiveSale = async () => {
  const active_sale = defineQuery(`
       *[_type == 'sale' && isActive == true] | order(validFrom desc)[0]
        `);

  try {
    const activeSale = await sanityFetch({
      query: active_sale,
    });
    return activeSale.data || null;
  } catch (error) {
    console.error("Error fetching sales:", error);
  }
};

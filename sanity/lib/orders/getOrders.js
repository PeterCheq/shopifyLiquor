import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getOrder = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const get_order_query = defineQuery(`
        *[_type == 'order' && clerkUserId == $userId] | order(orderDate desc){
            ...,
            products[]{
                ...,
                product ->
            }
        }
        `);

  try {
    const orders = await sanityFetch({
      query: get_order_query,
      params: { userId },
    });
    return orders.data || [];
  } catch (error) {
    console.log("Error fetching orders", error);
    console.error("Error fetching orders:", error);
  }
};

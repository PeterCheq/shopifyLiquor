import { sanityFetch } from "../live";

export const getAllCategories = async () => {
  const all_categories = `
        *[_type == 'category']| order(name asc)
        `;

  try {
    const categories = await sanityFetch({
      query: all_categories,
    });

    return categories.data || [];
  } catch (error) {
    console.error("Failed fetching categories :", error);
  }
};

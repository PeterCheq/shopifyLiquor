import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Products",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "productslug",
      title: "Product Slug",
      description:
        "Add '-' if word is longer then 2 e.g Heinken-Lager (no spaces)",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "name",
        maxLength: 90,
      },
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text (for SEO)",
              validation: (Rule) =>
                Rule.required().max(120).warning("Good alt text helps SEO!"),
            },
          ],
        },
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
    }),
    defineField({
      name: "hasDiscount",
      title: "Has Discount?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "discountPrice",
      title: "Discount Price",
      type: "number",
      hidden: ({ parent }) => !parent?.hasDiscount,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "price",
      hasDiscount: "hasDiscount",
      media: "image.0.asset",
      discountPrice: "discountPrice",
    },
    prepare({ title, subtitle, media, hasDiscount, discountPrice }) {
      const status = hasDiscount ? `Discount R${discountPrice}` : "No Discount";
      return {
        title,
        subtitle: `R${subtitle} - ${status} `,
        media,
      };
    },
  },
});

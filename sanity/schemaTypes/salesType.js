import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const salesType = defineType({
  name: "sale",
  title: "Sale",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Sale Title",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Sale Description",
    }),
    defineField({
      name: "discountAmount",
      type: "number",
      title: "Discount Amount",
      description: "Amount off in percentage or fixed value",
    }),
    defineField({
      name: "validFrom",
      type: "datetime",
      title: "Valid From",
    }),
    defineField({
      name: "validUntil",
      type: "datetime",
      title: "Valid Until",
    }),
    defineField({
      name: "isActive",
      type: "boolean",
      title: "Is Active",
      description: "Toggle to activate/Deactivate the sale",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "discountAmount",
      isActive: "isActive",
    },
    prepare({ title, subtitle, isActive }) {
      const status = isActive ? "Active" : "Not Active";
      return {
        title,
        subtitle: `${subtitle}% off - ${status}`,
      };
    },
  },
});

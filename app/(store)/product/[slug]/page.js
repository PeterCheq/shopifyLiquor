import ProductQuantityModify from "@/components/ProductQuantityModify";
import { urlFor } from "@/sanity/lib/image";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

export const dynamic = "force-static";
export const revalidate = 3600;

async function productSlugPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  console.log(
    crypto.randomUUID().slice(0, 5) + `rerendered product cache of ${slug}`
  );
  if (!product) {
    return notFound();
  }
  const isOutOfStock = product.stock !== null && product.stock <= 0;
  console.log(Array.isArray(product.image));
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? "opacity-50" : ""}`}
        >
          <div>
            {product.image && (
              <Image
                src={urlFor(product.image[0]).url()}
                alt={product.name ?? "Product image"}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            )}
          </div>
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center space-x-2 font-semibold mb-4 text-xl">
            {product.hasDiscount && (
              <span className="">R{product.discountPrice.toFixed(2)}</span>
            )}{" "}
            <span
              className={`${product.hasDiscount ? "text-red-500 line-through" : ""}`}
            >
              R{product.price && Number(product.price).toFixed(2)}
            </span>
          </div>
          <div className="prose max-w-none mb-6">
            {Array.isArray(product.description) && (
              <PortableText value={product.description} />
            )}
          </div>
          <div className="justify-self-auto">
            <ProductQuantityModify product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default productSlugPage;

{
  /* <Image
                        src={urlFor(img).url()}
                        alt={img.name ?? "Product image"}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      /> */
}

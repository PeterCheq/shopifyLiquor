import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProductThumbnail({ product }) {
  const isOutOfStock = product.stock != null && product.stock <= 0;
  return (
    <Link
      href={`/product/${product.productslug?.current}`}
      className={`group flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${isOutOfStock ? "opacity-50" : ""}`}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        {product.image[0] && (
          <Image
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            src={urlFor(product.image[0]).url()}
            alt={product.name || "Product image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className="absolute aspect-square w-full h-full overflow-hidden">
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 flex flex-col">
        <h2 className="text-lg font-semibold text-gray-800 trancate">
          {product.name}
        </h2>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {product.description[1]?.children[0].text
            ? product.description[1]?.children[0].text
            : "No description avaialable"}
        </p>
        <div className="mt-2 flex space-x-3">
          {product?.hasDiscount && (
            <p className="text-gray-900 font-bold ">
              R{product.discountPrice.toFixed(2)}
            </p>
          )}

          <p
            className={`${product?.hasDiscount ? "line-through text-red-600" : "text-gray-900 "} font-bold"`}
          >
            R{product.price?.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProductThumbnail;

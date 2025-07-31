import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";

function OrderCard({ order }) {
  console.log("order >>>", order);
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1 font-bold">Order Number</p>
            <p className="text-sm text-green-600 break-all font-mono">
              {order.orderNumber}
            </p>
          </div>
          <div className="sm:text-right">
            <p className="text-sm text-gray-600 mb-1">Order Date</p>
            <p className="font-medium">
              {order.orderDate
                ? new Date(order.orderDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:item-center">
          <div className="flex items-center">
            <span className="text-sm mr-2">Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-sm ${order.status === "Paid" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
            >
              {order.status}
            </span>
          </div>
          <div className="sm:text-right">
            <p className="text-sm text-gray-600 mb-1">Total Amout</p>
            <p className="font-bold text-lg">R{order.totalPrice}</p>
          </div>
        </div>
        <div className="px-4 py-3 sm:px-6 sm:py-4">
          <p className="text-sm font-semibold text-gray-600 mb-3 sm:mb-4">
            Order Items
          </p>
          <div className="space-y-3 w-full sm:space-y-4">
            {order.products.map((product) => (
              <div
                key={product.product?._id}
                className="flex py-2 border-b last:border-b-0 items-center gap-3 sm:gap-4"
              >
                {product.product?.image && (
                  <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0  rounded-md overflow-hidden">
                    <Image
                      src={urlFor(product.product.image[0]).url()}
                      alt={product.product.name ?? "product image"}
                      className="object-cover"
                      fill
                    />
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-medium text-sm sm:text-base">
                    {product.product?.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Quantity: {product.quantity ?? "N/A"}
                  </p>
                </div>

                <p className="font-medium text-right flex-1">
                  {product.product.price
                    ? product.product.price * product.quantity
                    : null}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;

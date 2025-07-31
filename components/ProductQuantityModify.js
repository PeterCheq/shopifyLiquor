"use client";
import React from "react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { MinusIcon, PlusIcon } from "lucide-react";
import {
  addItemToBasket,
  removeItemFromBasket,
  selectQuantityCountById,
} from "@/redux/productSlice";

function ProductQuantityModify({ product }) {
  const dispatch = useDispatch();
  const quantityCount = useSelector((state) =>
    selectQuantityCountById(state, product._id)
  );

  if (!product || !product._id) {
    console.warn("Product is undefined or missing _id:", product);
    return null; // Or render a fallback UI
  }
  const isOutOfStock = product.stock !== null && product.stock <= 0;
  if (isOutOfStock) {
    return null;
  }

  const isQuantityCount = quantityCount <= 0;
  console.log(isQuantityCount);

  console.log("quanity >>>", quantityCount);
  return (
    <div className="flex items-center space-x-2">
      <Button
        className="rounded-lg"
        onClick={() => dispatch(addItemToBasket(product))}
      >
        <PlusIcon />
      </Button>
      <span className="text-lg lg:text-2xl">{quantityCount}</span>
      <Button
        disabled={quantityCount === 0}
        className="disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg"
        onClick={() => dispatch(removeItemFromBasket({ _id: product._id }))}
      >
        <MinusIcon />
      </Button>
    </div>
  );
}

export default ProductQuantityModify;

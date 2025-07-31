import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { getOrder } from "@/sanity/lib/orders/getOrders";
import OrderCard from "@/components/OrderCard";

async function OrderPage() {
  const user = await currentUser();
  const orders = await getOrder(user?.id);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
        <h1 className="text-4l font-bold text-gray-900 tracking-tight mb-8">
          My Orders
        </h1>
        {orders.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>You have not placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderPage;

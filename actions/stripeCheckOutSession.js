"use server";
import getFetchUrl from "@/lib/getPortUrl";
import stripe from "@/lib/stripe";
import { urlFor } from "@/sanity/lib/image";
import { currentUser } from "@clerk/nextjs/server";
import { Converter } from "easy-currencies";

const converter = new Converter();
export default async function stripCheckOutSession(items) {
  const user = await currentUser();

  if (!items.length) throw new Error("No items found. Please try again!");
  if (!user) throw new Error("No user found. Please try again!");

  const metadata = {
    orderNumber: crypto.randomUUID(),
    customerName: user?.fullName ?? "Unknown",
    customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
    clerkUserId: user.id,
  };

  try {
    const customers = await stripe.customers.list({
      email: user.emailAddresses[0].emailAddress,
      limit: 1,
    });

    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }
    const value = await converter.convert(1, "ZAR", "USD");
    console.log("value", value);

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : "always",
      customer_email: !customerId
        ? user.emailAddresses[0].emailAddress
        : undefined,
      metadata,
      mode: "payment",
      success_url:
        getFetchUrl() +
        `/success?session_id=[CHECKOUT_SESSION_ID]&orderNumber=${metadata.orderNumber}`,
      cancel_url: getFetchUrl() + "/basket",
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: Math.round(item.price * value * 100),
          product_data: {
            name: item.productslug.current || "Unnamed Product",
            description: `Product ID: ${item._id}`,
            metadata: {
              id: item._id,
            },
            images: item.image
              ? item.image.map((img) => urlFor(img).url())
              : undefined,
          },
        },
        quantity: item.quantity,
      })),
    });

    return session.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}
//
// getFetchUrl() + "/basket"
("http://localhost:3000/success?session_id=[CHECKOUT_SESSION_ID]");
("http://localhost:3000/basket");

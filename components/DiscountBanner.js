import { getAvtiveSale } from "@/sanity/lib/sales/getActiveSale";

async function DiscountBanner() {
  const activeSale = await getAvtiveSale();
  if (!activeSale?.isActive) {
    return null;
  }

  return (
    <div className="relative bg-gradient-to-r from-red-600 to-black text-white px-6 py-10 mx-4 rounded-lg shadow-lg">
      <div className="container mx-auto flex items-center justfiy-between">
        <div className="flex-1">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-left mb-4">
            {activeSale.title}
          </h2>
          <p className="text-left text-xl sm:text-3xl font-semibold mb-6">
            {activeSale.description}
          </p>

          <div className="bg-white text-black py-4 px-6 rounded-full shadow-md transform hover:scel-105 transition duration-300 mb-6">
            GET{" "}
            <span className="font-bold text-base md:text-xl">
              {activeSale.discountAmount}% OFF
            </span>{" "}
            ON YOUR NEXT PURCHASE
          </div>
        </div>
      </div>
      <div className="absolute bottom-1 right-3.5 mt-4 text-sm">
        <p className="text-gray-200">
          OFFERS VALID UNTIL{" "}
          <span className="text-white">
            {activeSale?.validUntil.split("T")[0]}
          </span>
        </p>
      </div>
    </div>
  );
}

export default DiscountBanner;

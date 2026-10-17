
import { IProductType } from "@/app/types/ProductType";
import bn from "number-to-bangla";
import { translateUnit } from "@/app/components/UnitConverter";
import {
  TbTriangleFilled,
  TbTriangleInvertedFilled,
} from "react-icons/tb";
import { notFound } from "next/navigation";

interface ProductDetailProps {
  params: Promise<{ slug: string }>;
}

const ProductDetailPage = async ({ params }: ProductDetailProps) => {
  const { slug } = await params;
  const apiUrl = process.env.PRODUCT_API_LINK;

  if (!apiUrl) {
    throw new Error("PRODUCT_API_LINK is not configured.");
  }

  let product: IProductType;

  try {
    const res = await fetch(
      `${apiUrl}/bazardor/products/${encodeURIComponent(slug)}`,
      {
        next: { revalidate: 300 },
      }
    );

    if (res.status === 404) {
      notFound();
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.status}`);
    }

    product = await res.json();
  } catch (error) {
    console.error("Product fetch error:", error);
    throw error;
  }

  const isPriceUp = product.change.dir === "up";
  const isPriceDown = product.today < product.yesterday;
  const priceDifference = Math.abs(product.today - product.yesterday);
  const ChangeIcon = isPriceUp
    ? TbTriangleFilled
    : TbTriangleInvertedFilled;
  console.log(product)
  const markets = product.markets ?? [];

  const minPrice = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : 0;

  const maxPrice = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : 0;

  const averagePrice = markets.length
    ? markets.reduce(
        (total, market) => total + (market.min + market.max) / 2,
        0
      ) / markets.length
    : 0;

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6 mb-10">
      <div className="flex flex-col gap-6 rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
        {/* Product information */}
        <div className="flex items-center gap-4">
          <figure className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-base-200 sm:size-24">
            <span
              className="text-4xl"
              role="img"
              aria-label={product.nameBn}
            >
              {product.image || "🛒"}
            </span>
          </figure>

          <div className="min-w-0 flex flex-col">
            <h2 className="text-xl font-bold leading-snug text-base-content sm:text-2xl">
              {product.nameBn}
            </h2>

            <span className="mt-2 inline-flex rounded-full  py-1 text-sm text-base-content/70">
              {`প্রতি ${translateUnit(product.unit)} ${product.categoryNameBn}`}
            </span>

            <span className={`mt-2 inline-flex rounded-full  py-1 text-sm `}>
              {isPriceUp
                ? `গতকালের তুলনায় দাম বেড়েছে ${bn.engToNumber(priceDifference)} টাকা`
                : isPriceDown
                  ? `গতকালের তুলনায় দাম কমেছে ${bn.engToNumber(priceDifference)} টাকা`
                  : "গতকালের তুলনায় দাম অপরিবর্তিত"}
            </span>
          </div>
        </div>

        {/* Today's price */}
        <div className="rounded-xl bg-base-200/60 p-5 sm:min-w-40 text-center">
          <h2 className="text-sm font-medium text-base-content/70">
            আজকের দাম
          </h2>

          <p className="mt-1 text-3xl font-bold text-primary">
            {bn.engToNumber(product.today)}
          </p>
          <span className="ml-2 text-sm font-normal text-base-content/70">
            টাকা/{translateUnit(product.unit)}
          </span>

          <div className={`mt-3 justify-center flex items-center gap-1 text-sm font-semibold  ${ isPriceUp ? "text-error" : "text-success" }`} >
            <ChangeIcon aria-hidden="true" />
            <span className="">
              {bn.engToNumber(Math.abs(product.change.pct))}%
            </span>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col p-5 bg-base-100 rounded-2xl border border-base-300 p-5 shadow-sm">
        
          <h2 className="text-xl font-bold mb-5">দামের সারসংক্ষেপ</h2>

          <div className="grid grid-cols-3 gap-3">
            <div className="border-2 border-base-300 p-4 rounded-2xl">
              <h3 className="text-sm text-base-content/70">সর্বনিম্ন দাম </h3>
              <p className="text-2xl font-bold text-primary">{ bn.engToNumber(minPrice) } টাকা</p>
              <p className="text-sm text-base-content/70">সব চেয়ে কম দামের বাজার</p>
            </div>
            <div className="border-2 border-base-300 p-4 rounded-2xl">
              <h3 className="text-sm text-base-content/70">সর্বাধিক দাম </h3>
              <p className="text-2xl font-bold text-error">{ bn.engToNumber(maxPrice) } টাকা</p>
              <p className="text-sm text-base-content/70">সব চেয়ে বেশি দামের বাজার</p>
            </div>
            <div className="border-2 border-base-300 p-4 rounded-2xl">
              <h3 className="text-sm text-base-content/70">গড় দাম </h3>
              <p className="text-2xl font-bold text-primary">{ bn.engToNumber(Math.round(averagePrice)) } টাকা</p>
              <p className="text-sm text-base-content/70">প্রতি {translateUnit(product.unit)}-এর হিসাবে</p>
            </div>
          </div>
          <h2 className="text-xl font-bold my-5">বাজারভিত্তিক আজকের দাম</h2>
          <div className="border-2 border-base-300 p-4 rounded-2xl">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>বাজার</th>
                    <th>বিভাগ</th>
                    <th>সর্বনিম্ন</th>
                    <th>সর্বাধিক</th>
                    <th>গড়</th>
                  </tr>
                </thead>

                <tbody>
                  {product.markets.map((market, index) => (
                    <tr key={`${market.market}-${index}`}>
                      <td className="border-b border-base-300">
                        {market.market}
                      </td>
                      <td className="border-b border-base-300">
                        {market.division}
                      </td>
                      <td className="border-b border-base-300">
                        {bn.engToNumber(market.min)}
                      </td>
                      <td className="border-b border-base-300">
                        {bn.engToNumber(market.max)}
                      </td>
                      <td className="border-b border-base-300">
                        {bn.engToNumber(Math.round((market.min + market.max) / 2))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
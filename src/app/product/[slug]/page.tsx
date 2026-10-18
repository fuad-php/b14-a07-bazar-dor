
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
      { next: { revalidate: 300 } }
    );

    if (res.status === 404) notFound();

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.status}`);
    }

    product = await res.json();
  } catch (error) {
    console.error("Product fetch error:", error);
    throw error;
  }

  const isPriceUp = product.change.dir === "up";
  const isPriceDown = product.change.dir === "down";
  const priceDifference = Math.abs(product.today - product.yesterday);

  const ChangeIcon = isPriceUp
    ? TbTriangleFilled
    : TbTriangleInvertedFilled;

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
    <main className="mx-auto mb-10 w-full max-w-7xl px-3 py-5 sm:px-5 sm:py-7 lg:px-8 lg:py-10">
      {/* Product header */}
      <section className="flex flex-col gap-5 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:p-8">
        <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-5">
          <figure className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-base-200 sm:size-20 lg:size-24">
            <span
              className="text-3xl sm:text-4xl"
              role="img"
              aria-label={product.nameBn}
            >
              {product.image || "🛒"}
            </span>
          </figure>

          <div className="min-w-0 flex-1">
            <h1 className="break-words text-lg font-bold leading-snug text-base-content sm:text-2xl lg:text-3xl">
              {product.nameBn}
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-base-content/70 sm:text-base">
              প্রতি {translateUnit(product.unit)} · {product.categoryNameBn}
            </p>

            <p
              className={`mt-2 text-xs leading-relaxed sm:text-sm ${
                isPriceUp
                  ? "text-error"
                  : isPriceDown
                    ? "text-success"
                    : "text-base-content/70"
              }`}
            >
              {isPriceUp
                ? `গতকালের তুলনায় দাম বেড়েছে ${bn.engToNumber(priceDifference)} টাকা`
                : isPriceDown
                  ? `গতকালের তুলনায় দাম কমেছে ${bn.engToNumber(priceDifference)} টাকা`
                  : "গতকালের তুলনায় দাম অপরিবর্তিত"}
            </p>
          </div>
        </div>

        {/* Today's price */}
        <div className="w-full rounded-xl bg-base-200/60 p-4 text-center sm:p-5 lg:w-auto lg:min-w-52 lg:shrink-0">
          <h2 className="text-sm font-medium text-base-content/70">
            আজকের দাম
          </h2>

          <p className="mt-1 break-words text-3xl font-bold text-base-content sm:text-4xl">
            {bn.engToNumber(product.today)}
          </p>

          <p className="mt-1 text-sm text-base-content/70">
            টাকা/{translateUnit(product.unit)}
          </p>

          <div
            className={`mt-3 flex items-center justify-center gap-1 text-sm font-semibold ${
              isPriceUp
                ? "text-error"
                : isPriceDown
                  ? "text-success"
                  : "text-base-content/70"
            }`}
          >
            {isPriceUp ? (
              <TbTriangleFilled aria-hidden="true" />
            ) : isPriceDown ? (
              <TbTriangleInvertedFilled aria-hidden="true" />
            ) : null}

            <span>
              {bn.engToNumber(Math.abs(product.change.pct))}%
            </span>

            <span className="font-normal">
              {isPriceUp
                ? "দাম বেড়েছে"
                : isPriceDown
                  ? "দাম কমেছে"
                  : "পরিবর্তন নেই"}
            </span>
          </div>
        </div>
      </section>

      {/* Price summary and market table */}
      <section className="mt-6 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm sm:mt-8 sm:p-6 lg:mt-10 lg:p-8">
        <h2 className="mb-4 text-lg font-bold sm:mb-5 sm:text-xl lg:text-2xl">
          দামের সারসংক্ষেপ
        </h2>

        {/* Responsive summary cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
          <div className="min-w-0 rounded-xl border border-base-300 p-4 sm:p-5">
            <h3 className="text-sm text-base-content/70">
              সর্বনিম্ন দাম
            </h3>
            <p className="mt-2 break-words text-2xl font-bold text-success sm:text-3xl">
              {bn.engToNumber(minPrice)} <span className="text-sm">টাকা</span>
            </p>
            <p className="mt-2 text-xs leading-relaxed text-base-content/70 sm:text-sm">
              সব চেয়ে কম দামের বাজার
            </p>
          </div>

          <div className="min-w-0 rounded-xl border border-base-300 p-4 sm:p-5">
            <h3 className="text-sm text-base-content/70">
              সর্বাধিক দাম
            </h3>
            <p className="mt-2 break-words text-2xl font-bold text-error sm:text-3xl">
              {bn.engToNumber(maxPrice)} <span className="text-sm">টাকা</span>
            </p>
            <p className="mt-2 text-xs leading-relaxed text-base-content/70 sm:text-sm">
              সব চেয়ে বেশি দামের বাজার
            </p>
          </div>

          <div className="min-w-0 rounded-xl border border-base-300 p-4 sm:col-span-2 sm:p-5 lg:col-span-1">
            <h3 className="text-sm text-base-content/70">
              গড় দাম
            </h3>
            <p className="mt-2 break-words text-2xl font-bold text-success sm:text-3xl">
              {bn.engToNumber(Math.round(averagePrice))} <span className="text-sm">টাকা</span>
            </p>
            <p className="mt-2 text-xs leading-relaxed text-base-content/70 sm:text-sm">
              প্রতি {translateUnit(product.unit)}-এর হিসাবে
            </p>
          </div>
        </div>

        {/* Market prices */}
        <h2 className="mb-4 mt-7 text-lg font-bold sm:mb-5 sm:mt-9 sm:text-xl lg:text-2xl">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="overflow-hidden rounded-xl border border-base-300">
          <div className="overflow-x-auto">
            <table className="table w-full min-w-[600px]">
              <thead>
                <tr className="bg-base-200 text-sm text-base-content">
                  <th className="whitespace-nowrap">বাজার</th>
                  <th className="whitespace-nowrap">বিভাগ</th>
                  <th className="whitespace-nowrap text-right">
                    সর্বনিম্ন
                  </th>
                  <th className="whitespace-nowrap text-right">
                    সর্বাধিক
                  </th>
                  <th className="whitespace-nowrap text-right">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {markets.length > 0 ? (
                  markets.map((market, index) => (
                    <tr
                      key={`${market.market}-${index}`}
                      className="transition-colors hover:bg-base-200/50"
                    >
                      <td className="border-b border-base-300 font-medium">
                        {market.market}
                      </td>
                      <td className="border-b border-base-300">
                        {market.division}
                      </td>
                      <td className="border-b border-base-300 text-right tabular-nums">
                        {bn.engToNumber(market.min)}
                      </td>
                      <td className="border-b border-base-300 text-right tabular-nums">
                        {bn.engToNumber(market.max)}
                      </td>
                      <td className="border-b border-base-300 text-right tabular-nums">
                        {bn.engToNumber(
                          Math.round((market.min + market.max) / 2)
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-8 text-center text-base-content/60"
                    >
                      কোনো বাজারের তথ্য পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetailPage;
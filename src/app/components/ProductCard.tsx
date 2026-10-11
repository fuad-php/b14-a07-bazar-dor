
import Image from "next/image";
import Link from "next/link";
import {
  TbTriangleFilled,
  TbTriangleInvertedFilled,
} from "react-icons/tb";
import { IProductType } from "../types/ProductType";

interface IProductProps {
  product: IProductType;
}

const ProductCard = ({ product }: IProductProps) => {
  const isPriceUp = product.change.dir === "up";

  return (
    <article className="group h-full">
      <Link
        href={`/product/${product.id}`}
        aria-label={`${product.nameBn} এর বিস্তারিত ও আজকের দাম দেখুন`}
        className="card h-full border border-base-300 bg-base-100 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <div className="card-body gap-4 p-4 sm:p-5">
          {/* Product information */}
          <div className="flex items-center gap-3 sm:gap-4">
            <figure className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-base-200 sm:size-24">
              {product.image?.startsWith("http") ? (
                <Image
                  src={product.image}
                  alt={product.nameBn}
                  width={96}
                  height={96}
                  sizes="(max-width: 640px) 80px, 96px"
                  className="size-full object-contain p-2"
                />
              ) : (
                <span
                  className="text-4xl"
                  role="img"
                  aria-label={product.nameBn}
                >
                  {product.image || "🛒"}
                </span>
              )}
            </figure>

            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold leading-snug text-base-content transition-colors group-hover:text-primary sm:text-xl">
                {product.nameBn}
              </h3>

              <span className="mt-2 inline-flex rounded-full bg-base-200 px-3 py-1 text-xs font-medium text-base-content/70">
                প্রতি {product.unit}
              </span>
            </div>
          </div>          

          {/* Price and price movement */}
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="mb-1 text-sm text-base-content/60">
                আজকের দাম
              </p>

              <p className="text-2xl font-bold leading-tight text-base-content sm:text-3xl">
                ৳{product.today}
                <span className="ml-1 text-sm font-normal text-base-content/60">
                  /{product.unit}
                </span>
              </p>
            </div>

            <span
              className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1.5 text-sm font-bold ${
                isPriceUp
                  ? "bg-error/10 text-error"
                  : "bg-success/10 text-success"
              }`}
              aria-label={`দাম ${isPriceUp ? "বেড়েছে" : "কমেছে"} ${Math.abs(product.change.pct)} শতাংশ`}
            >
              {isPriceUp ? (
                <TbTriangleFilled aria-hidden="true" />
              ) : (
                <TbTriangleInvertedFilled aria-hidden="true" />
              )}
              {Math.abs(product.change.pct)}%
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;

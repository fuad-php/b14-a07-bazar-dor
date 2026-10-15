
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import { IProductType } from "./types/ProductType";
import {
  TbTriangleFilled,
  TbTriangleInvertedFilled,
} from "react-icons/tb";

export default async function Home() {
  const res = await fetch(
    `${process.env.PRODUCT_API_LINK}/bazardor/products`,
    {
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: IProductType[] = await res.json();

  const priceIncreasedProducts = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const priceDecreasedProducts = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-10 py-6 sm:py-8">
      {/* Hero */}
      <section aria-label="বাজার দর পরিচিতি">
        <Hero />
      </section>

      {/* Price Increased Products */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-error/10">
            <TbTriangleFilled className="text-xl text-error" />
          </div>

          <div>
            <h2 className="section-title">আজ দাম বেড়েছে</h2>           
          </div>
        </div>

        {priceIncreasedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {priceIncreasedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="surface-card p-6 text-center muted-text">
            বর্তমানে দাম বেড়েছে এমন কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </section>

      {/* Price Decreased Products */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-success/10">
            <TbTriangleInvertedFilled className="text-xl text-success" />
          </div>

          <div>
            <h2 className="section-title">আজ দাম কমেছে</h2>            
          </div>
        </div>

        {priceDecreasedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {priceDecreasedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="surface-card p-6 text-center muted-text">
            বর্তমানে দাম কমেছে এমন কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </section>

      {/* All Products */}
      <section className="flex flex-col gap-5" id="all-products">
        <div>
          <h2 className="section-title">সব পণ্য</h2>
          <p className="mt-1 text-sm muted-text">
            নিত্যপ্রয়োজনীয় সব পণ্যের বাজারদর এক নজরে দেখুন।
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="surface-card p-6 text-center muted-text">
            কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </section>
    </div>
  );
}

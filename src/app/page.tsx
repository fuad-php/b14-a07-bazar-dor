import Hero from "./components/Hero";
import { IProductType } from "./types/ProductType";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import ProductCard from "./components/ProductCard";

export default async function Home() {
  const res = await fetch(`${process.env.PRODUCT_API_LINK}/bazardor/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: IProductType[] = await res.json();

  const priceIncreasedProducts = products.filter(
    (product) => product.change.dir === "up"
  );

  const priceDecreasedProducts = products.filter(
    (product) => product.change.dir === "down"
  );

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8">
      <section className="flex justify-center py-2">
        <Hero />
      </section>

      {/* Price Increased Products */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <TbTriangleFilled className="inline-block text-2xl text-error" />
          <h2 className="text-2xl font-bold">
           আজ দাম বেড়েছে
          </h2>          
        </div>

        {priceIncreasedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 bg-base-100 p-4 rounded-lg">
            {priceIncreasedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg bg-base-200 p-6 text-center">
            No products with price increases found.
          </p>
        )}
      </section>

      {/* Price Decreased Products */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold">
            <TbTriangleInvertedFilled className="inline-block text-2xl text-success" /> আজ দাম কমেছে
          </h2>          
        </div>

        {priceDecreasedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {priceDecreasedProducts.map((product) => (
             <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg bg-base-200 p-6 text-center">
            No products with price decreases found.
          </p>
        )}
      </section>
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold">
            সব পণ্য
          </h2>          
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
             <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg bg-base-200 p-6 text-center">
            No products found.
          </p>
        )}
      </section>
    </main>
  );
} 
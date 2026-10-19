
"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/app/components/ProductCard";
import { IProductType } from "@/app/types/ProductType";
import Link from "next/link";

interface CategoryProductsProps {
  products: IProductType[];
}

type SortOption = "default" | "asc" | "desc";

const CategoryProducts = ({ products }: CategoryProductsProps) => {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    if (sortBy === "default") return products;

    return [...products].sort((a, b) => {
      const priceA = Number(a.today);
      const priceB = Number(b.today);

      return sortBy === "asc"
        ? priceA - priceB
        : priceB - priceA;
    });
  }, [products, sortBy]);

  return (
    <>
      <section className="mb-8 rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-6">
        <div className="flex items-center justify-end gap-3">
          <label
            htmlFor="sort-products"
            className="text-sm font-medium text-base-content"
          >
            সাজান:
          </label>

          <select
            id="sort-products"
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as SortOption)
            }
            className="select w-auto max-w-full border-base-300 bg-base-100 shadow-sm"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </section>

      <section>
        <h2 className="section-title mb-5">
          পণ্যের তালিকা
        </h2>

        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <CategoryEmptyState />
        )}
      </section>
    </>
  );
};

export function CategoryEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 px-6 py-12 text-center">
      <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-base-200 text-3xl">
        🔎
      </div>

      <h2 className="text-xl font-bold text-base-content">
        দুঃখিত! কোনো পণ্য পাওয়া যায়নি
      </h2>

      <p className="mt-2 max-w-md text-sm text-base-content/60">
        এই ক্যাটাগরিটি পাওয়া যায়নি অথবা এখানে বর্তমানে কোনো পণ্য নেই।
      </p>

        <Link href="/" className="btn btn-info mt-6">
            হোম পেজে ফিরে যান
        </Link>
    </div>
  );
}

export default CategoryProducts;

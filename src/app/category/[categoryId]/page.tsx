import { Suspense } from "react";
import { IProductType } from "@/app/types/ProductType";
import CategoryProducts, {
  CategoryEmptyState,
} from "@/app/components/CategoryProducts";

interface ICategoryProps {
  params: Promise<{ categoryId: string }>;
}

interface ICategoryType {
  id: string | number;
  slug: string;
  nameBn: string;
  icon: string;
}

function CategorySkeleton() {
  return (
    <main className="max-w-6xl mx-auto py-8 animate-pulse">
      <section className="mb-8 rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="size-16 rounded-xl bg-base-300" />

          <div className="flex-1 space-y-3">
            <div className="h-4 w-28 rounded bg-base-300" />
            <div className="h-8 w-48 rounded bg-base-300" />
            <div className="h-4 w-64 max-w-full rounded bg-base-300" />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="space-y-3 rounded-xl border border-base-300 p-4"
          >
            <div className="h-32 rounded-lg bg-base-300" />
            <div className="h-5 w-3/4 rounded bg-base-300" />
            <div className="h-4 w-1/2 rounded bg-base-300" />
            <div className="h-8 rounded bg-base-300" />
          </div>
        ))}
      </div>
    </main>
  );
}

async function CategoryContent({ params }: ICategoryProps) {
  const { categoryId } = await params;
  const apiUrl = process.env.PRODUCT_API_LINK;

  if (!apiUrl) {
    throw new Error("PRODUCT_API_LINK is not configured.");
  }

  const [categoryResponse, productsResponse] = await Promise.all([
    fetch(
      `${apiUrl}/bazardor/categories/${encodeURIComponent(categoryId)}`,
      { next: { revalidate: 300 } }
    ),
    fetch(
      `${apiUrl}/bazardor/products?category=${encodeURIComponent(categoryId)}`,
      { next: { revalidate: 300 } }
    ),
  ]);

  if (categoryResponse.status === 404) {
    return (
      <main className="max-w-6xl mx-auto py-12">
        <CategoryEmptyState />
      </main>
    );
  }

  if (!categoryResponse.ok || !productsResponse.ok) {
    throw new Error("Failed to fetch category or products.");
  }

  const category: ICategoryType = await categoryResponse.json();
  const products: IProductType[] = await productsResponse.json();

  return (
    <main className="max-w-6xl mx-auto py-8">
      <section className="mb-8 rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-4xl">
            {category.icon}
          </div>

          <div>
            <p className="text-sm font-medium text-primary">
              পণ্যের ক্যাটাগরি
            </p>

            <h1 className="text-2xl font-bold text-base-content sm:text-3xl">
              {category.nameBn}
            </h1>

            <p className="mt-1 text-sm text-base-content/60">
              {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </section>

      <CategoryProducts products={products} />
    </main>
  );
}

export default function CategoryPage({ params }: ICategoryProps) {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}
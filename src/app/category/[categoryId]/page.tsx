
import { notFound } from "next/navigation";
import { IProductType } from "@/app/types/ProductType";
import ProductCard from "@/app/components/ProductCard";

interface ICategoryProps {
  params: Promise<{ categoryId: string }>;
}

interface ICategoryType {
  id: string | number;
  slug: string;
  nameBn: string;
  icon: string;
}

const CategoryPage = async ({ params }: ICategoryProps) => {
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
    notFound();
  }

  if (!categoryResponse.ok || !productsResponse.ok) {
    throw new Error("Failed to fetch category or products.");
  }

  const category: ICategoryType = await categoryResponse.json();
  const products: IProductType[] = await productsResponse.json();

  return (
    <main className="page-container py-8">
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

      <section>
        <h2 className="section-title mb-5">
          {category.nameBn} এর পণ্য
        </h2>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-base-300 bg-base-100 p-8 text-center">
            <p className="font-semibold text-base-content">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default CategoryPage;

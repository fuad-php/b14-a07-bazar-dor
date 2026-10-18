
import Link from "next/link";

interface Category {
  id: number | string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  let categories: Category[] = [];

  try {
    const apiUrl = process.env.PRODUCT_API_LINK;

    if (!apiUrl) {
      throw new Error("PRODUCT_API_LINK is not configured.");
    }

    const res = await fetch(`${apiUrl}/bazardor/categories`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    categories = await res.json();
  } catch (error) {
    console.error("Category fetch error:", error);
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div
        aria-label="পণ্যের ক্যাটাগরি"
        className="scrollbar-hide overflow-x-auto overscroll-x-contain"
      >
        <div className="mx-auto flex w-max min-w-full items-center gap-1 px-2 py-2 sm:gap-2 sm:px-5 lg:max-w-6xl lg:px-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium text-base-content/75 transition-colors duration-200 hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary active:bg-primary/15 sm:gap-2 sm:px-4"
            >
              <span aria-hidden="true" className="text-base sm:text-lg">
                {category.icon}
              </span>

              <span className="whitespace-nowrap">
                {category.nameBn}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavLinks;
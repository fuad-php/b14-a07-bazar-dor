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
      throw new Error("Failed to fetch categories.");
    }

    categories = await res.json();
  } catch (error) {
    console.error("Category fetch error:", error);
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Product categories"
      className="w-full overflow-x-auto"
    >
      <div className="flex w-max min-w-full items-center gap-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="shrink-0 rounded-lg px-3 py-2 text-sm font-bold text-base-content/80 transition-colors hover:bg-base-200 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
          >
            <span className="mr-1" aria-hidden="true">
              {category.icon}
            </span>
            {category.nameBn}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;
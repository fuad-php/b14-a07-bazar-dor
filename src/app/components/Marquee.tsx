
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import {
  TbTriangleFilled,
  TbTriangleInvertedFilled,
} from "react-icons/tb";

interface Product {
  id: number | string;
  slug: string;
  image: string;
  nameBn: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

const Marquee = async () => {
  const apiUrl = process.env.PRODUCT_API_LINK;

  if (!apiUrl) {
    console.error("PRODUCT_API_LINK is not configured.");
    return null;
  }

  let products: Product[] = [];

  try {
    const res = await fetch(`${apiUrl}/bazardor/products`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    products = await res.json();
  } catch (error) {
    console.error("Marquee product fetch error:", error);
    return null;
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="border-b border-base-300 bg-base-200 text-base-content">
      <div className="flex items-center">        
        <div className="min-w-0 flex-1 overflow-hidden">
          <MarqueeText
            direction="right"
            duration={25}
            className="py-1"
          >
            {products.map((product) => {
              const isUp = product.change.dir === "up";

              return (
                <div
                  key={product.id}
                  className="flex items-center gap-2 whitespace-nowrap border-r border-base-300 px-4 py-2 text-sm"
                >
                  <span className="font-semibold">
                    {product.nameBn}
                  </span>

                  <span className="font-bold text-base-content">
                    {product.today} টাকা/{product.unit}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1 font-semibold ${
                      isUp ? "text-error" : "text-success"
                    }`}
                    aria-label={`দাম ${isUp ? "বেড়েছে" : "কমেছে"} ${Math.abs(product.change.pct)} শতাংশ`}
                  >
                    {isUp ? (
                      <TbTriangleFilled aria-hidden="true" />
                    ) : (
                      <TbTriangleInvertedFilled aria-hidden="true" />
                    )}
                    {Math.abs(product.change.pct)}%
                  </span>
                </div>
              );
            })}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
};

export default Marquee;

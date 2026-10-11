import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";

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
  const res = await fetch(process.env.PRODUCT_API_LINK + "/bazardor/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await res.json();

  return (
    <MarqueeText direction="right" duration={20} className="py-1 bg-base-200 border-base-300">
      {products.map((product) => (
        <div key={product.id} className="flex items-center gap-2 px-4 py-1" >
            <span>  
                {product.image }
            </span>
            <span className="text-base text-gray-800">
                {product.nameBn}
            </span>

            <span className="font-semibold text-gray-700">
                {product.today} টাকা/{product.unit}
            </span>

            <span className={`flex items-center gap-1 font-semibold ${ product.change.dir === "up" ? "text-red-600" : "text-green-600"}`}>
                {product.change.dir === "up" ? (
                <TbTriangleFilled />
                ) : (
                <TbTriangleInvertedFilled />
                )}

                {Math.abs(product.change.pct)}%
            </span>
        </div>
      ))}
    </MarqueeText>
  );
};

export default Marquee;

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TbTriangleFilled, TbTriangleInvertedFilled } from 'react-icons/tb';
import { IProductType } from '../types/ProductType';

interface IProductProps{
    product: IProductType
}

const ProductCard = ({ product } : IProductProps) => {
    return (
        <article key={product.id} className="card border border-base-300 bg-base-100 shadow-sm transition-shadow hover:shadow-md">
            <Link href={`/product/${product.id}`} className="flex flex-col gap-3">
                <div className="card-body gap-3">
                    <div className="flex items-center gap-4 ">
                    <figure className="flex h-24 items-center justify-center bg-base-200">
                        {product.image.startsWith("http") ? (
                        <Image
                            src={product.image}
                            alt={product.nameBn}
                            width={50}
                            height={50}
                            className="h-24 w-24 object-contain"
                        />
                        ) : (
                        <span className="text-4xl" role="img" aria-label={product.nameBn}>
                            {product.image}
                        </span>
                        )}
                    </figure>
                    <div className="flex flex-col gap-2">
                        <h3 className="card-title text-lg">
                        {product.nameBn}
                    </h3>
                    <span className="badge badge-transparent shrink-0">
                        প্রতি {product.unit}
                    </span>
                    </div>                    
                    </div>                 

                    <div className="flex items-end justify-between border-base-300 pt-3">
                    <div>
                        <p className="text-xs opacity-70">আজকের দাম</p>
                        <p className="text-2xl font-bold">
                        ৳{product.today}
                        <span className="ml-1 text-sm font-normal opacity-70">
                            /{product.unit}
                        </span>
                        </p>
                    </div>

                    <div className={`text-right badge bg-base-100 badge-transparent shrink-0 font-bold ${product.change.dir === "up" ? "text-error" : "text-success"}`}>
                        {product.change.dir === "up" ? <TbTriangleFilled /> : <TbTriangleInvertedFilled />} {product.change.pct}%
                    </div>
                    </div>
                </div>
            </Link>
        </article>
    );
};

export default ProductCard;
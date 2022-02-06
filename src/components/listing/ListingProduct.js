import Image from "next/image";
import React from "react";
import Link from "next/link";

const Product = ({ item, index }) => {
  return (
    <div className="m-2 max-w-sm bg-white shadow-lg rounded-lg">
      <Link href={`/${item.slug}`}>
        <a>
          <Image
            className="rounded-t-lg transform-cpu hover:scale-125 duration-200"
            src={`https://loremflickr.com/400/250?random=${index + 10}`}
            alt="product image"
            width={400}
            height={250}
          />

          <div className="px-5 pb-5">
            <h3 className="text-xl pt-3 pb-1 font-semibold tracking-tight text-black capitalize">
              {item.name}
            </h3>
            <p className="text-gray-500 text-sm pb-3">SKU: {item.sku}</p>

            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-black">
                {Intl.NumberFormat("ro-RO", {
                  style: "currency",
                  currency: "RON",
                }).format(item.price)}
              </span>

              <p className="text-black rounded-md border-r-4 border-b-4 border-red-300 border hover:border-purple-600 font-medium text-sm p-3 text-center cursor-pointer">
                Add to cart
              </p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Product;

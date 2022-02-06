import Image from "next/image";
import React from "react";

const SearchProduct = ({ item }) => {
  return (
    <div className="flex justify-start gap-2 items-center p-2 bg-red-300 m-2">
      <Image
        src={`https://loremflickr.com/50/50?random=${item.name}`}
        alt="product image"
        width={50}
        height={50}
      />
      <h5 className="text-lg font-medium text-white capitalize">{item.name}</h5>
    </div>
  );
};

export default SearchProduct;

import React, { useState, useEffect } from "react";
import ListingProduct from "./ListingProduct";

import JsonData from "../../api/data.json";

const Listing = () => {
  const [categories, setCategories] = useState([]);
  const [activeCat, setActivCat] = useState("all");
  const [sortedData, setSortedData] = useState(JsonData.data);

  // Sort data by price, asc.
  const sortAsc = () => {
    setSortedData([
      ...JsonData.data.sort((a, b) => {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
        return 0;
      }),
    ]);
  };

  // Sort data by price, desc.
  const sortDesc = () => {
    setSortedData([
      ...JsonData.data.sort((a, b) => {
        if (a.price > b.price) return -1;
        if (a.price < b.price) return 1;
        return 0;
      }),
    ]);
  };

  useEffect(() => {
    // Get all categories and place them into a set, to prevent duplicates.
    const getCategories = sortedData.flatMap((item) =>
      item.categories.map((cat) => cat.name)
    );
    setCategories([...new Set(getCategories)]);
  }, [sortedData]);

  return (
    <section className="flex-1 bg-white flex flex-col justify-around items-center p-5 h-screen">
      {/* Sorting and Filtering Bar */}
      <div className="w-full md:flex bg-red-100 p-4 justify-center items-center">
        {/* Category List */}
        <div>
          <ul className="text-black flex">
            <li
              className={`${activeCat == "all" && "font-bold"} cursor-pointer`}
              onClick={() => setActivCat("all")}
            >
              Show all
            </li>
            {categories.map((cat, index) => (
              <li onClick={() => setActivCat(cat)} key={index}>
                <span>&nbsp;&nbsp;/&nbsp;&nbsp;</span>
                <span
                  className={`${
                    activeCat == cat && "font-bold"
                  } cursor-pointer`}
                >
                  {cat}
                </span>
              </li>
            ))}
          </ul>
        </div>{" "}
        {/* Sorting Buttons */}
        <div className="md:ml-auto p-0 flex gap-3">
          {/* Sort Desc. */}
          <p
            onClick={() => sortDesc()}
            className="cursor-pointer w-40 flex justify-center border-r-4 border-b-4 border-2 border-black"
          >
            Sort by price (desc.)
          </p>
          {/* Sort Asc. */}
          <p
            onClick={() => sortAsc()}
            className="cursor-pointer w-40 flex justify-center border-r-4 border-b-4 border-2 border-black"
          >
            Sort by price (asc.)
          </p>
        </div>
      </div>
      {/* Product List */}
      <div className="flex flex-col gap-2 md:grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 overflow-y-scroll mt-4">
        {sortedData
          .filter((item) => item.visibility == 2 || item.visibility == 4)
          .filter((item) => {
            if (activeCat == "all") return item;
            else return filterByCategory(item, activeCat);
          })
          .map((item, index) => (
            <ListingProduct key={index} index={index} item={item} />
          ))}
      </div>
    </section>
  );
};

export default Listing;

const filterByCategory = (item, activeCat) => {
  const foundItem = item.categories.filter(
    (cat) => cat.name.toLowerCase() == activeCat.toLowerCase()
  );
  if (foundItem.length) return item;
};

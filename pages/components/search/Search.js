import React, { useState } from "react";

import JsonData from "../../api/data.json";
import levenshtein from "fast-levenshtein";
import SearchProduct from "./SearchProduct";

const Search = () => {
  const [query, setQuery] = useState("");
  const [advancedBox, setAdvancedBox] = useState(false);
  const [searchDescription, setSearchDescription] = useState(false);

  return (
    <section className="p-5 bg-red-200 lg:w-96 h-screen">
      {/* Input Search Container */}
      <div className="relative">
        {/* Input Box */}
        <input
          className="relative z-30 bg-red-300 appearance-none border-2 border-white w-full py-4 px-4 text-white
          text-xl leading-tight placeholder-white focus:outline-none focus:border-black"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
        />
        {/* Input Box Border */}
        <div className="absolute z-20 top-1 left-1 w-full h-full border-black border-r-4 border-b-4" />
        {/* Advanced Search Icon */}
        <svg
          onClick={() => setAdvancedBox(!advancedBox)}
          xmlns="http://www.w3.org/2000/svg"
          className="absolute z-40 top-5 right-4 h-6 w-6 text-white cursor-pointer"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
        </svg>
        {/* Advanced Search Box */}
        <div
          className={`${
            advancedBox ? "flex" : "hidden"
          } absolute z-30 top-20 left-0 border-2 border-black bg-red-300 w-full h-20 justify-start p-4`}
        >
          <div className="flex gap-3 justify-evenly items-center">
            <div className="form-check form-check-inline">
              <input
                className="appearance-none h-4 w-4 rounded-sm bg-white checked:bg-black checked:border-black  focus:outline-none transition duration-200 mt-1 align-top float-left mr-2 cursor-pointer"
                type="checkbox"
                id="inlineCheckbox2"
                checked={searchDescription}
                onChange={() => setSearchDescription(!searchDescription)}
              />
              <label
                className="inline-block text-black font-normal"
                htmlFor="inlineCheckbox2"
              >
                Search in description
              </label>
            </div>
          </div>
        </div>
        {/* Search Results Box */}
        <div
          className={
            query &&
            `absolute bg-red-200 top-20 left-0 w-full border-2 border-black`
          }
        >
          {JsonData.data
            // Filter only visible items
            .filter((item) => item.visibility == 4)
            // Filter by search query
            .filter((item) => {
              if (searchDescription && query.length > 0) {
                return filterByNameAndDescr(item, query);
              } else if (!searchDescription) {
                return filterByName(item, query);
              }
            })
            // Show max. 6 results on page
            .filter((item, index) => index < 6)
            // Map the results
            .map((item, index) => (
              <SearchProduct key={index} item={item} />
            ))}
        </div>
      </div>
      <div className="pt-32">
        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus id quod maxime placeat facere possimus,
        </p>
      </div>
    </section>
  );
};

export default Search;

const filterByName = (item, query) => {
  query = query.toLowerCase();
  item.name = item.name.toLowerCase();

  // Return null if query is empty
  if (!query) return null;
  // Return results based on search query
  else if (item.name.includes(query)) {
    return item;
  }
  // Return results if there are spelling errors
  else {
    const wordList = item.name.split(" ");
    const relatedWords = wordList.filter((word) => {
      const distance = levenshtein.get(word.toLowerCase(), query);
      if (distance < 5) return word;
    });
    return relatedWords.length ? item : null;
  }
};

const filterByNameAndDescr = (item, query) => {
  query = query.toLowerCase();
  item.name = item.name.toLowerCase();
  item.description = item.description.toString().toLowerCase();

  // Return null if query is empty
  if (!query) return null;
  // Return results based on search query
  else if (item.name.includes(query) || item.description.includes(query)) {
    return item;
  }
  // Return results if there are spelling errors
  if (query.length > 2) {
    const wordListName = item.name.split(" ");
    const wordListDescription = item.description.split(" ");
    const wordList = wordListName.concat(wordListDescription);
    const relatedWords = wordList.filter((word) => {
      const distance = levenshtein.get(word.toLowerCase(), query);
      if (distance < 5) return word;
    });
    return relatedWords.length ? item : null;
  }
};

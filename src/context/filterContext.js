import React, { createContext, useContext, useState, useEffect } from "react";
import { dataList } from "../constants";

const filterContext = createContext();

const FilterProvider = ({ children }) => {
 console.log("filter provider working")


 const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([1000, 5000]);

  const [list, setList] = useState(dataList);
  const [resultsFound, setResultsFound] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  const handleSelectCategory = (event, value) =>
    !value ? null : setSelectedCategory(value);

  const handleSelectRating = (event, value) =>
    !value ? null : setSelectedRating(value);

  const handleChangePrice = (event, value) => {
    setSelectedPrice(value);
  };

  const applyFilters = () => {
    let updatedList = dataList;
    // console.log(updatedList, selectedRating);

    // Rating Filter
    if (selectedRating) {
      updatedList = updatedList.filter(
        (item) => parseInt(item.rating) === parseInt(selectedRating)
      );
    }

    // console.log(updatedList);

    // Category Filter

    console.log(updatedList);
    if (selectedCategory === "desc") {
      updatedList = updatedList.sort((a,b) => b.price-a.price);
      console.log(updatedList);
    }
    if (selectedCategory === "asce") {
      updatedList = updatedList.sort((a,b) => a.price-b.price);
      console.log(updatedList);
    }

    

    // Search Filter
    if (searchInput) {
      updatedList = updatedList.filter(
        (item) =>
          item.title.toLowerCase().search(searchInput.toLowerCase().trim()) !==
          -1
      );
    }

    console.log(selectedPrice);

    // Price Filter
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];

    updatedList = updatedList.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );

    setList(updatedList);

    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };


 
  return (
    <filterContext.Provider
      value={{
        selectedRating, selectedCategory, selectedPrice, list, setList, resultsFound, setResultsFound,
        searchInput, setSearchInput, handleSelectCategory, handleSelectRating, handleChangePrice, applyFilters
      }}
    >
      {children}
    </filterContext.Provider>
  );
};

const useFilter = () => useContext(filterContext);

export { useFilter, FilterProvider };

import React, { useEffect } from 'react';
import FilterPanel from '../../components/Home/FilterPanel';
import List from '../../components/Home/List';
import SearchBar from '../../components/Home/SearchBar';
import './styles.css';
import { useFilter } from '../../context/filterContext';

const Home = () => {

  const {selectedRating, selectedCategory, selectedPrice, list, resultsFound,
    searchInput, setSearchInput, handleSelectCategory, handleSelectRating, handleChangePrice, applyFilters} = useFilter();
  
  useEffect(() => {
    applyFilters();
  }, [selectedRating, selectedCategory, searchInput, selectedPrice]);

  // console.log(list)


  

  return (
    <div className='home'>
      {/* Search Bar */}
      <SearchBar
        value={searchInput}
        changeInput={(e) => setSearchInput(e.target.value)}
      />
      <div className='home_panelList-wrap'>
        {/* Filter Panel */}
        <div className='home_panel-wrap'>
          <FilterPanel
            selectedCategory={selectedCategory}
            selectCategory={handleSelectCategory}
            selectedRating={selectedRating}
            selectedPrice={selectedPrice}
            selectRating={handleSelectRating}
            changePrice={handleChangePrice}
          />
        </div>
        {/* List & Empty View */}
        <div className='home_list-wrap'>
          {resultsFound ? <List list={list} /> : <h1>Nothing</h1>}
        </div>
      </div>
    </div>
  );
};

export default Home;

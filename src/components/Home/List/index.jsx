import React, { useEffect, useState } from 'react';
import ListItem from './ListItem';
import './styles.css';
import { Audio } from 'react-loader-spinner'

const List = ({ list }) => {

  const [itemsToShow, setItemsToShow] = useState(3); // Number of items to initially show
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Detect scroll to bottom
  console.log("scroll height", document.documentElement.scrollTop);
  const handleScroll = () => {
    console.log("scroll height working", document.documentElement.scrollTop);
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadMoreItems();
    }
  };

  // Load more items when scrolled to the bottom
  const loadMoreItems = () => {
    if (!isLoading && itemsToShow < list.length) { // Check if not loading and there are more items
      setIsLoading(true); // Set loading state to true
      setTimeout(() => { // Simulating a delay, replace this with your actual data fetching logic
        setItemsToShow(itemsToShow + 3); // Increase the number of items to show
        setIsLoading(false); // Set loading state to false after loading more items
      }, 1000); // Simulated delay of 1 second
    } else {
      setHasMore(false); // No more items to load
    }
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  console.log(list.slice(0, itemsToShow))
  return (

    <div className='list-wrap'>
      {list.slice(0, itemsToShow).map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
      {isLoading && <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />}
    </div>
  )
};

export default List;

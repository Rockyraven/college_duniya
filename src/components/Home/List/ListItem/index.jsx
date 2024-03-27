import React from 'react';
import './styles.css';

const ListItem = ({
  item: { coverSrc, title, price, deliveryFee, location, rating },
}) => (
  <div className='listItem-wrap'>
    <img src={coverSrc} alt='' />
    <header>
      <h4>{title}</h4>
      <span>rating 🌟{rating}</span>
    </header>
    <footer>
      <p>
        <b>location</b> <span>{location}</span>
      </p>
      <p>
      <b>College Fee</b><b>${price}</b>
      </p>
    </footer>
  </div>
);

export default ListItem;

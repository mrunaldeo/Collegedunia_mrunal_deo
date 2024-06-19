import React from 'react';

const SortControls = ({ onSort }) => (
  <div>
    <button onClick={() => onSort('rating', 'asc')}>Sort by Rating Asc</button>
    <button onClick={() => onSort('rating', 'desc')}>Sort by Rating Desc</button>
    <button onClick={() => onSort('fees', 'asc')}>Sort by Fees Asc</button>
    <button onClick={() => onSort('fees', 'desc')}>Sort by Fees Desc</button>
    <button onClick={() => onSort('userReview', 'asc')}>Sort by User Review Asc</button>
    <button onClick={() => onSort('userReview', 'desc')}>Sort by User Review Desc</button>
  </div>
);

export default SortControls;

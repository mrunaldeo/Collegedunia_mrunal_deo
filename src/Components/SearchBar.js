import React from 'react';

const SearchBar = ({ onSearch }) => {
  const handleChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <input type="text" placeholder="Search by college name" onChange={handleChange} />
  );
};

export default SearchBar;

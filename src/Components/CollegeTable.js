import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import CollegeRow from './CollegeRow';
import SearchBar from './SearchBar';
import SortControls from './SortControls';

const CollegeTable = () => {
  const [colleges, setColleges] = useState([]);
  const [displayedColleges, setDisplayedColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    axios.get('/data.json')
      .then(response => {
        setColleges(response.data);
        setDisplayedColleges(response.data.slice(0, 10));
      });
  }, []);

  const fetchMoreData = () => {
    if (displayedColleges.length >= colleges.length) {
      setHasMore(false);
      return;
    }
    const nextSet = colleges.slice(displayedColleges.length, displayedColleges.length + 10);
    setDisplayedColleges(prevDisplayedColleges => [...prevDisplayedColleges, ...nextSet]);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = colleges.filter(college => college.name.toLowerCase().includes(term.toLowerCase()));
    const sortedAndFiltered = sortColleges(filtered);
    setDisplayedColleges(sortedAndFiltered.slice(0, 10));
    setHasMore(sortedAndFiltered.length > 10);
  };

  const handleSort = (key, order) => {
    setSortKey(key);
    setSortOrder(order);
    const sortedColleges = sortColleges(colleges, key, order);
    setColleges(sortedColleges);
    setDisplayedColleges(sortedColleges.slice(0, 10));
  };

  const sortColleges = (colleges, key = sortKey, order = sortOrder) => {
    return [...colleges].sort((a, b) => {
      if (order === 'asc') {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });
  };

  const filteredColleges = displayedColleges.filter(college => college.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <SortControls onSort={handleSort} />
      <InfiniteScroll
        dataLength={displayedColleges.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p style={{ textAlign: 'center' }}>No more colleges</p>}
      >
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rating</th>
              <th>Fees</th>
              <th>User Review</th>
              <th>Featured</th>
            </tr>
          </thead>
          <tbody>
            {filteredColleges.map(college => <CollegeRow key={college.id} college={college} />)}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
};

export default CollegeTable;

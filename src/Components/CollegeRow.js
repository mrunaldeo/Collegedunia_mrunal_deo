import React from 'react';

const CollegeRow = ({ college }) => (
  <tr>
    <td>{college.name}</td>
    <td>{college.rating}</td>
    <td>{college.fees}</td>
    <td>{college.userReview}</td>
    <td>{college.featured ? 'Yes' : 'No'}</td>
  </tr>
);

export default CollegeRow;

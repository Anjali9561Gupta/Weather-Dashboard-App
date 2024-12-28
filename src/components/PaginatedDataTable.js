import React, { useState } from 'react';

const PaginatedDataTable = ({ data, rowsPerPageOptions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleChangePage = (direction) => {
    if (direction === 'prev' && currentPage > 1) setCurrentPage(currentPage - 1);
    if (direction === 'next' && currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 table-fixed">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 w-32">Date</th>
            <th className="border border-gray-300 px-4 py-2 w-32">Max Temp</th>
            <th className="border border-gray-300 px-4 py-2 w-32">Min Temp</th>
            <th className="border border-gray-300 px-4 py-2 w-32">Mean Temp</th>
            <th className="border border-gray-300 px-4 py-2 w-40">Max Apparent Temp</th>
            <th className="border border-gray-300 px-4 py-2 w-40">Min Apparent Temp</th>
            <th className="border border-gray-300 px-4 py-2 w-40">Mean Apparent Temp</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{item.date}</td>
              <td className="border border-gray-300 px-4 py-2">{item.maxTemp}</td>
              <td className="border border-gray-300 px-4 py-2">{item.minTemp}</td>
              <td className="border border-gray-300 px-4 py-2">{item.meanTemp}</td>
              <td className="border border-gray-300 px-4 py-2">{item.maxApparentTemp}</td>
              <td className="border border-gray-300 px-4 py-2">{item.minApparentTemp}</td>
              <td className="border border-gray-300 px-4 py-2">{item.meanApparentTemp}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handleChangePage('prev')}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white rounded px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handleChangePage('next')}
          disabled={currentPage === totalPages}
          className="bg-gray-500 text-white rounded px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
        <select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className="border rounded px-3 py-2"
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              Show {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PaginatedDataTable;

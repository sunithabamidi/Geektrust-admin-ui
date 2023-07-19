import "./Pagination.css";
import React, { useState, useEffect } from "react";
import UserDetails from "./UserDetails";

const Pagination = ({ userData, usersPerPage }) => {
  const [isSelectAll, setSelectAll] = useState(false);
  const [selectedPage, setSelectedPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    const indexOfLastItem = currentPage * usersPerPage;
    const indexOfFirstItem = indexOfLastItem - usersPerPage;

    setCurrentItems(userData.slice(indexOfFirstItem, indexOfLastItem));
  }, [userData, currentPage, usersPerPage]);

  const totalPages = Math.ceil(userData.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCheckboxChange = (event) => {
    setSelectedPage(currentPage);
    setSelectAll(event.target.checked);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div>
      <thead className="heading-row">
        <tr>
          <th>
            <input
              type="checkbox"
              className="checkbox"
              checked={userData.selectAll}
              onChange={handleCheckboxChange}
            />
          </th>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      {currentItems.map((item) => (
        <UserDetails
          key={item.id}
          userData={item}
          selectAll={isSelectAll}
          currentPage={currentPage}
          selectedPage={selectedPage}
        />
      ))}

      <div className="footer-buttons">
        <button className="delete-selected">Delete Selected</button>
        <div className="pageButtons">
          {currentPage > 1 ? (
            <button className="button-first" onClick={handleFirstPage}>
              {"<<"}
            </button>
          ) : (
            <button
              className="button-first-disabled"
              disabled={true}
              onClick={handleFirstPage}
            >
              {"<<"}
            </button>
          )}
          {currentPage > 1 ? (
            <button className="button-previous" onClick={handlePreviousPage}>
              {"<"}
            </button>
          ) : (
            <button
              className="button-previous-disabled"
              disabled={true}
              onClick={handlePreviousPage}
            >
              {"<"}
            </button>
          )}
          {/* <button className="button-previous">{"<"}</button> */}

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) =>
              currentPage === pageNumber ? (
                <button
                  className="pagination-button-current"
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  disabled={currentPage === pageNumber}
                >
                  {pageNumber}
                </button>
              ) : (
                <button
                  className="pagination-button"
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  disabled={currentPage === pageNumber}
                >
                  {pageNumber}
                </button>
              )
          )}
          {currentPage < totalPages ? (
            <button className="button-next" onClick={handleNextPage}>
              {">"}
            </button>
          ) : (
            <button
              className="button-next-disabled"
              disabled={true}
              onClick={handleNextPage}
            >
              {">"}
            </button>
          )}
          {currentPage < totalPages ? (
            <button className="button-last" onClick={handleLastPage}>
              {">>"}
            </button>
          ) : (
            <button
              className="button-last-disabled"
              disabled={true}
              onClick={handleLastPage}
            >
              {">>"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pagination;

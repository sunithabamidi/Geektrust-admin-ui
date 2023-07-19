import "./SearchBar.css";
import UserDetails from "./UserDetails";
import Pagination from "./Pagination";
import React, { useState, useEffect } from "react";
import { config } from "../App";
import axios from "axios";

const SearchBar = () => {
  const [usersData, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, [!usersData]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${config.endpoint}`);
      let userData = res.data;
      setData(userData);
    } catch (err) {
      err.success = false;
      err.message =
        "Something went wrong. Check the backend console for more details";
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  // console.log(usersData);

  const performSearch = (searchTerm) => {
    setSearchResult(
      usersData.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.role.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const debounceSearch = (event, debounceTimeout) => {
    let timeout;
    setSearchTerm(event.target.value);
    const later = () => {
      clearTimeout(timeout);
      performSearch(event.target.value);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, debounceTimeout);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name, email or role"
        name="search"
        onChange={(e) => debounceSearch(e, 2000)}
      />
      <div
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <table className="table">
          {searchTerm ? (
            <Pagination userData={searchResult} usersPerPage={9} />
          ) : (
            <Pagination userData={usersData} usersPerPage={9} />
          )}
        </table>
      </div>
    </div>
  );
};

export default SearchBar;

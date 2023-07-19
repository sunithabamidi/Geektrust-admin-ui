import "./UserDetails.css";
import axios from "axios";
import { config } from "../App";
import React, { useState, useEffect } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import userEvent from "@testing-library/user-event";

const UserDetails = (userData, selectAll, currentPage, selectedPage) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <tbody className="userDetail">
      <tr id={userData.userData.id}>
        <input
          type="checkbox"
          className="checkbox"
          checked={
            userData.selectedPage == userData.currentPage
              ? isChecked || userData.selectAll
              : userData.selectAll && isChecked
          }
          onChange={handleCheckboxChange}
        />
        <td>{userData.userData.name}</td>
        <td>{userData.userData.email}</td>
        <td>{userData.userData.role}</td>
        <td className="actions">
          <span span className="edit">
            <EditIcon />
          </span>
          <span className="delete">
            <DeleteIcon />
          </span>
        </td>
      </tr>
    </tbody>
  );
};

export default UserDetails;

import "./UserDetails.css";
import axios from "axios";
import { config } from "../App";
import React, { useState, useEffect } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import userEvent from "@testing-library/user-event";

const UserDetails = (userData, selectAll, currentPage, selectedPage) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [isDeleted, setDeleted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleEdit = (id) => {
    console.log("handleEdit", id);
    setEditing(true);
  };

  const handleDelete = (id) => {
    console.log("handleDelete", id);
    setDeleted(true);
  };

  const handleSave = (name, email, role, id) => {
    console.log("saved", name, email, role, id);

    setEditing(false);
  };

  return (
    <tbody className="userDetail">
      {isDeleted ? (
        <></>
      ) : isEditing ? (
        <tr id={userData.userData.id} className="userDetails-row">
          <input
            type="checkbox"
            className="checkbox-disabled"
            disabled="disabled"
          />
          <td>
            {
              <input
                type="text"
                placeholder={name ? name : userData.userData.name}
                className="text-feilds"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
            }
          </td>
          <td>
            {
              <input
                type="text"
                placeholder={email ? email : userData.userData.email}
                className="text-feilds"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            }
          </td>
          <td>
            {
              <input
                type="text"
                placeholder={role ? role : userData.userData.role}
                className="text-feilds"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              ></input>
            }
          </td>
          <td className="actions">
            <span className="save">
              <button
                className="save-button"
                onClick={(e) => {
                  handleSave(name, email, role, userData.userData.id);
                }}
              >
                Save Details
              </button>
            </span>
          </td>
        </tr>
      ) : (
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
          <td className="user-detail-name">
            {" "}
            {name ? name : userData.userData.name}
          </td>
          <td className="user-detail-email">
            {email ? email : userData.userData.email}
          </td>
          <td className="user-detail-role">
            {role ? role : userData.userData.role}
          </td>
          <td className="actions">
            <span className="edit">
              <EditIcon
                onClick={(e) => {
                  handleEdit(userData.userData.id);
                }}
              />
            </span>
            <span className="delete">
              <DeleteIcon
                onClick={(e) => {
                  handleDelete(userData.userData.id);
                }}
              />
            </span>
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default UserDetails;

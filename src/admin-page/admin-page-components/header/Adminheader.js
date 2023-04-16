import React from "react";
import { HiBars3, HiUser } from "react-icons/hi2";
import "./style.css";

const AdminHeader = (props) => {
  return (
    <div style={{ backgroundColor: "#A8602B", padding: "14px 16px" }}>
      <div className="dropdown1">
        <button className="dropbtn1">
          <HiBars3 />
          <i className="fa fa-caret-down"></i>
        </button>
      </div>
      <div className="textall">
        <div className="speech">{"Speech App"} </div>

        <div className="help dropdown uicon">
            Welcome {" Shruti "} !
          <button className="dropbtn"><HiUser /></button>
          <div className="dropdown-content">
            <a href="#">Switch to User</a>
            <a href="#">Logout</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;

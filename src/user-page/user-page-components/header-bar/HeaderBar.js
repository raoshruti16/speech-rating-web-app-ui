import React from "react";
import { HiBars3, HiUser } from "react-icons/hi2";
import useBatchInfoGet from "../../../api-definition/useBatchInfoGet";
import "./style.css";

const HeaderBar = (props) => {

  const {batchNames, batchIds} = useBatchInfoGet();
  return (
    <div style={{ backgroundColor: "#A8602B", padding: "14px 16px" }}>
      <div class="dropdown">
        <button class="dropbtn">
          <HiBars3 />
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
        {batchNames.map((batchName, index) => (
            <a key={batchIds[index]} href={`https://example.com/api/batch/${batchIds[index]}`} >
              {batchName}
            </a>
          ))}
        </div>
      </div>
      <div class ="textall">
        <div class="speech">{"Speech App"} </div>
        <div class="help"> {"Help"} </div>

        <div class="uicon">
          Welcome {" Shruti "} ! <HiUser />
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;

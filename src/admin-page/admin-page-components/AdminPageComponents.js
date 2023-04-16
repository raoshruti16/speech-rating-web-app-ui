import React, {useState} from "react";
// import AudioContent from "./audio-content/AudioContent";
import Admin from "./admin/Admin";
import AdminHeader from "./header/Adminheader";

const AdminPageComponents =() =>{
  return (
    <div>
      <AdminHeader />
      <div class="grid-container-main">
        <Admin></Admin>
      </div>
  </div>
  );
}

export default AdminPageComponents;
import React, {useState} from "react";
import Form from "./form/Form";
// import AudioContent from "./audio-content/AudioContent";
import HeaderBar from "../user-page-components/header-bar/HeaderBar";
// import Player from "./audio-player/Player";
// import AudioName from "./file-name/AudioName";

const UserPageComponents =() =>{
    const [replayCount, setReplayCount] = useState(0);
  return (
    <div>
      <HeaderBar />
      <div class="grid-container-main">
        <Form replayCount={replayCount}></Form>
      </div>
  </div>
  );
}

export default UserPageComponents;
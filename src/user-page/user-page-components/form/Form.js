import React, { useState } from "react";
import * as XLSX from 'xlsx';
import Slider from "@mui/material/Slider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Container, Row, Col } from "react-bootstrap";
import demoAudio from "../../../audio/mixkit-melodical-flute-music-notification-2310.wav";
import AudioPlayer from "react-h5-audio-player";
import { MdOutlineReplay } from "react-icons/md";
import "react-h5-audio-player/lib/styles.css";

import "./style.css";
import useBatchStudyInfo from "../../../api-definition/useBatchStudyInfo";

const Form = (props) => {
  const [value, setValue] = useState(50);
  const [checked, setChecked] = useState(false);
  const [checkedJunk, setJunkChecked] = useState(false);
  const [checkedPartial, setPartialChecked] = useState(false);
  const [checkedTranscript, setTranscriptChecked] = useState(false);
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [oldfn, setOldfn] = useState(0);
  const [fileDownloaded, setFileDownloaded] = useState(false);

  const {
    batchName,
    studyName,
    fileNumber,
    leftLevel,
    rightLevel,
    low_rating_options,
    rating_error_level,
    rating_severity,
    instruction,
    audio_file_url,
    audio_transcription,
    updateId,
  } = useBatchStudyInfo();

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const [checkedState, setCheckedState] = useState(
    new Array(low_rating_options.length).fill(false)
  );

  const handleCheckboxChange = (index) => (event) => {
    const newCheckedState = [...checkedState];
    newCheckedState[index] = event.target.checked;
    setCheckedState(newCheckedState);
  };

  const handleJunkCheckboxChange = (event) => {
    setJunkChecked(event.target.checked);
  };

  const handlePartialCheckboxChange = (event) => {
    setPartialChecked(event.target.checked);
  };

  const handleTranscriptCheckboxChange = (event) => {
    setTranscriptChecked(event.target.checked);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const [svalue, ssetValue] = useState(1);

  const changeValue = (event, value) => {
    ssetValue(value);
  };

  const getText = (svalu) => `${svalue}`;

  const customMarks = Object.keys(rating_severity).map((key) => ({
    value: parseInt(key),
    label: rating_severity[key],
    style: {
      backgroundColor: key === '1' ? 'red' : key === '2' ? 'orange' : 'gray',
      width: '2px'
    }

  }));


  const handleContinueButton = () => {

  const newData = [batchName, studyName, audio_file_url, playCount,svalue, checked, checkedJunk, checkedPartial, checkedTranscript, text];
  setData((prevData) => [...prevData, newData]);
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  if((fileNumber == oldfn) && fileDownloaded == false){
  XLSX.writeFile(workbook, "data.xlsx");
  setFileDownloaded(true);
  }
  setOldfn(fileNumber);
  updateId();

  };

  const [playCount, setPlayCount] = useState(0);
  const [controlsEnabled, setControlsEnabled] = useState(true);

  const handleEnded = (playCount) => {
    setControlsEnabled(false);
    document
      .getElementsByClassName("rhap_main-controls")[0]
      .style.setProperty("display", "none");
  };

  const handlePlay = () => {
    if (playCount < 5) {
      const audioPlayer = document.getElementsByClassName("rhap_container")[0];
      audioPlayer.getElementsByTagName("audio")[0].play();
      setPlayCount(playCount + 1);
      props.onReplayCountChange(playCount + 1);
      if (playCount === 3) {
        setControlsEnabled(false);
      }
    }
  };

  return (
    <form>
      <FormControl>
        <Box style={{ marginLeft: "10px" }}>
          <p style={{ textAlign: "left", position: "left" }}>Audio Details</p>

          <div className="audiocontent">
            <label style={{ flex: "left"}}>
              <div style={{ textAlign: "left" }}>
                <b>{"Batch Name : "}</b> {batchName}
              </div>
              <div style={{ textAlign: "left" }}>
              <b>{"Study Name : "}</b>{studyName}
              </div>
              <div style={{ textAlign: "left" }}>
              <b>{"Replays : "}</b> {playCount} {"/ 5"}
              </div>
              <div style={{ textAlign: "left" }}>
              <b>{"File Number : "}</b> {fileNumber} {"/100"}
              </div>
              <div style={{ textAlign: "left" }}>
              <b>{"Batch Instruction : "}</b> {instruction}
              </div>
            </label>
          </div>
        </Box>
      </FormControl>
      <FormControl>
        <Box>
          <Container>
            <Row>
              <Col>
                <div class="p-grid-container">
                  <div className="audioplayer">
                    <AudioPlayer
                      src={demoAudio}
                      autoPlayAfterSrcChange={true}
                      onEnded={handleEnded}
                      showJumpControls={controlsEnabled}
                    />
                  </div>
                  <div className="replay">
                    <MdOutlineReplay
                      onClick={handlePlay}
                      disabled={playCount >= 5}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Box>
      </FormControl>
      <Box display="flex" flexDirection="row">
        <div className="audiocontents">
          <label>
            <b style={{ textAlign: "center" }}>{audio_transcription}</b>
          </label>
        </div>
      </Box>
      <FormControl>
        <Row>
          <Box display="flex" flexDirection="column" m={10}>
            <div style={{ width: "100%", float: "left" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: "10px" }}>
                  <p>{leftLevel}</p>
                </div>
                <div style={{ marginRight: "10px", paddingTop: "100px" }}>
                  <Slider
                    style={{ width: 900 }}
                    min={1}
                    max={7}
                    step={1}
                    value={svalue}
                    marks={customMarks}
                    onChange={changeValue}
                    getAriaValueText={getText}
                    classes={{
                      mark: 'slider-mark',
                      markLabel: 'slider-mark-label'
                    }}
                  />
                </div>
                <div style={{ marginLeft: "30px" }}>
                  <p>{rightLevel}</p>
                </div>
              </div>
              <style>
        {`
          .slider-mark {
            width: 2px;
            margin-top: -5px;
            margin-left: -1px;
          }
          .slider-mark-label {
            font-size: 15px;
            margin-top: 3px;
            margin-left: -5px;
            color: black;
            white-space: initial;
            display: block;
            overflow-wrap: break-word;
            overflow: hidden;
            border-radius: 10px;
            padding-top: 15px;
            width: 100px;
            height: 100px;
          }
          .slider-mark-label[data-index="0"] {
            background-color: #F45858;
          }
          
          .slider-mark-label[data-index="1"] {
            background-color: #fc7e7e;
          }
          .slider-mark-label[data-index="2"] {
            background-color: #fa9191;
          }
          
          .slider-mark-label[data-index="3"] {
            background-color: #FAE313;

          }
          .slider-mark-label[data-index="4"] {
            background-color: #f5e55b;

          }
          
          .slider-mark-label[data-index="5"] {
            background-color: #b8fc60;

          }
          .slider-mark-label[data-index="6"] {
            background-color: #88E413;
          }
          
          ${customMarks.map(
            (mark) => `
              .slider-mark[data-index="${mark.value}"] .slider-mark-label {
                background-color: ${mark.style.backgroundColor};
                width: ${mark.style.width};
              }
            `
          )}
        `}
      </style>
            </div>
          </Box>
        </Row>
      </FormControl>
      <FormControl>
        <Row>
          <Box display="flex" flexDirection="row">
            <Box m={10} paddingLeft="10px" flex={2}>
              <p style={{ textAlign: "left", paddingRight: "10px" }}>
                {low_rating_options.map((option, index) => (
                  <div key={index} style={{ display: "block" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedState[index]}
                          onChange={handleCheckboxChange(index)}
                          disabled={svalue < rating_error_level}
                        />
                      }
                      label={option}
                    />
                  </div>
                ))}
              </p>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              m={10}
              paddingLeft="10px"
              flex={1}
            >
              <p style={{ textAlign: "left" }}>
                <label>Comments :</label>
              </p>
              <TextField
                multiline
                rows={3}
                style={{
                  backgroundColor: "#F5F5F5",
                  width: "300px",
                  height: "100px",
                }}
                value={text}
                onChange={handleTextChange}
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              m={10}
              paddingLeft="50px"
              flex={2}
            >
              <p>
                <Button
                  variant="contained"
                  style={{
                    flex: "right",
                    backgroundColor: "#F2895C",
                    marginLeft: "10px",
                  }}
                >
                  Back
                </Button>
                <Button
                  onClick={handleContinueButton}
                  variant="contained"
                  style={{
                    flex: "right",
                    marginLeft: "10px",
                    backgroundColor: "#5EA716",
                  }}
                >
                  Continue
                </Button>
              </p>
              <label style={{ textAlign: "left" }}>Audio File Feedback:</label>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedJunk}
                    onChange={handleJunkCheckboxChange}
                  />
                }
                label="Junk(Unusable) Audio"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedPartial}
                    onChange={handlePartialCheckboxChange}
                  />
                }
                label="Partial Audio"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedTranscript}
                    onChange={handleTranscriptCheckboxChange}
                  />
                }
                label="Transcript Mismatch"
              />
            </Box>
          </Box>
        </Row>
      </FormControl>
    </form>
  );
};

export default Form;

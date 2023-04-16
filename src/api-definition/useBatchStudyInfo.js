import { useState, useEffect, useRef } from "react";

function useBatchStudyInfo() {
  const [batchName, setBatchName] = useState("");
  const [studyName, setStudyName] = useState("");
  const [fileNumber, setFileNumber] = useState(0);
  const [leftLevel, setLeftLevel] = useState("");
  const [rightLevel, setRightLevel] = useState("");
  const [id, setIdNumber] = useState(0);
  const [low_rating_options, setLowratingOptions] = useState([]);
  const [rating_error_level, setRatingErrLevel] = useState(0);
  const [rating_severity, setRatingSeverity] = useState([]);
  const [instruction, setInstruction] = useState("");
  const[audio_file_url, setAudioFileUrl] = useState("");
  const[audio_transcription, setAudioFileText] = useState("");
  const[isUserAdmin, setUserAdmin] = useState("");

  useEffect(() => {
    fetch("./local_data/get-user-audio.json")
      .then((response) => response.json())
      .then((data) => {
        setBatchName(data.data.batch_details.batch_name);
        setStudyName(data.data.batch_details.study_name);
        setFileNumber(
          data.data.batch_details.audio_file_details[id].audio_file_number
        );
        setLeftLevel(data.data.batch_details.rating_category.left_level);
        setRightLevel(data.data.batch_details.rating_category.right_level);
        setLowratingOptions(data.data.batch_details.low_rating_options);
        setRatingErrLevel(data.data.batch_details.rating_error_level);
        setRatingSeverity(data.data.batch_details.rating_severity);
        setInstruction(data.data.batch_details.batch_instruction);
        setAudioFileUrl(data.data.batch_details.audio_file_details[id].audio_file_url);
        setAudioFileText(data.data.batch_details.audio_file_details[id].audio_transcription);
        setUserAdmin(data.data.end_user_type);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const updateId = useRef(() => {
    setIdNumber((prevIdNumber) => prevIdNumber + 1);
  });

  useEffect(() => {
    console.log("fileNumber is ", fileNumber);
  }, [fileNumber]);

  return {
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
    isUserAdmin,
    updateId: updateId.current,
  };
}

export default useBatchStudyInfo;

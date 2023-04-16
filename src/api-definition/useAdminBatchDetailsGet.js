import { useState, useEffect } from "react";

function useAdminBatchDetailsGet() {
  const [batchNames, setBatchNames] = useState([]);

  const [spreadsheetLink, setSpreadsheetLink] = useState([]);
  const [noOfUsers, setNoOfUsers] = useState([]);
  const [status, setStatus] = useState([]);
  const [fileUploadStatus, setFileUploadstatus] = useState([]);
  const [usersAdded, setUsersAdded] = useState([]);
  const [batchInstructions, setBatchInstructions] = useState([]);
  const [randomizeFilePlayback, setRandomizeFilePlayback] = useState([]);
  const [numberOfUsers, setNumberOfUsers] = useState([]);
  const [fileMultiSign, setFileMultiSign] = useState([]);
  const [batchId, setBatchId] = useState([]);

  useEffect(() => {
    fetch("./local_data/get-admin-batch-details.json")
      .then((response) => response.json())
      .then((data) => {
        const batchId = data.data.batch_details.map(
          (batch) => batch.batch_id
        );
        setBatchId(batchId);
        const batchNames = data.data.batch_details.map(
          (batch) => batch.batch_name
        );
        setBatchNames(batchNames);
        console.log();
        const spreadsheetLink = data.data.batch_details.map(
          (batch) => batch.spreadsheet_link
        );
        setSpreadsheetLink(spreadsheetLink);
        const noOfUsers = data.data.batch_details.map(
          (batch) => batch.number_of_users
        );
        setNoOfUsers(noOfUsers);
        const status = data.data.batch_details.map((batch) => batch.status);
        setStatus(status);
        const fileUploadStatus = data.data.batch_details.map(
          (batch) => batch.file_upload_status
        );
        setFileUploadstatus(fileUploadStatus);
        const usersAdded = data.data.batch_details.map((batch) => batch.users_added);
        setUsersAdded(usersAdded);

        const batchInstructions = data.data.batch_details.map(
          (batch) => batch.batch_instruction
        );
        setBatchInstructions(batchInstructions);

        const randomizeFilePlayback = data.data.batch_details.map(
          (batch) => batch.randomize_file_playback
        );
        setRandomizeFilePlayback(randomizeFilePlayback);

        const numberOfUsers = data.data.batch_details.map(
          (batch) => batch.number_of_users
        );
        setNumberOfUsers(numberOfUsers);

        const fileMultiSign = data.data.batch_details.map(
          (batch) => batch.file_reassign_percentage
        );
        setFileMultiSign(fileMultiSign);
      })
      .catch((error) => console.log(error));
  }, []);

  return {
    batchId,
    batchNames,
    spreadsheetLink,
    noOfUsers,
    status,
    fileUploadStatus,
    usersAdded,
    batchInstructions,
    randomizeFilePlayback,
    numberOfUsers,
    fileMultiSign,
  };
}

export default useAdminBatchDetailsGet;

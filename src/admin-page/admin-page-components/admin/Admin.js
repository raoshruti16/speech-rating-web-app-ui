import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import ReactSearchBox from "react-search-box";
import "./style.css";
import useAdminBatchDetailsGet from "../../../api-definition/useAdminBatchDetailsGet";
import useAdminUserBatchInfo from "../../../api-definition/useAdminUserBatchInfo";

function UploadFolderModal(props) {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState("");

  const handleInputChange = (event) => {
    setCurrentPath(event.target.value);
  };

  const handleAddPath = () => {
    if (currentPath.trim() !== "") {
      setPaths([...paths, currentPath]);
      setCurrentPath("");
    }
  };

  const handleSubmit = () => {
    // Handle submit here
    console.log(paths);
    // Prepare the data to be sent in the request body
    const data = {
      paths: paths,
    };

    fetch("/api/uploadFolders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // Handle success response here
          console.log("Folders uploaded successfully");
        } else {
          // Handle error response here
          console.error("Failed to upload folders");
        }
      })
      .catch((error) => {
        // Handle error here
        console.error("Failed to upload folders", error);
      });

    props.onClose();
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Upload Folder</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Folder Path"
          fullWidth
          value={currentPath}
          onChange={handleInputChange}
        />
        <ul>
          {paths.map((path, index) => (
            <li key={index}>{path}</li>
          ))}
        </ul>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={handleAddPath}>Add Path</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

function ViewModal({ open, onClose, batch }) {
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleEditClick = () => {
    setAddModalOpen(true);
    onClose();
  };

  const handleAddClose = () => {
    setAddModalOpen(false);
  };

  if (addModalOpen) {
    // Render the add modal
    return <AddModal open={true} onClose={handleAddClose} batch={batch} />;
  } else {
    // Render the view modal
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{batch && batch.bname}</DialogTitle>
        <DialogContent>
          <p>
            <div className="view">
              <b>Batch Name: </b>
              {batch && batch.bname}
            </div>
            <div className="view">
              <b>Users Added: </b>
              {batch && batch.usersAdded.join(", ")}
            </div>
            <div className="view">
              <b>Batch Instructions: </b> {batch && batch.batchInstructions}
            </div>
            <div className="view">
              <b>No of users: </b>
              {batch && batch.noOfUsers}
            </div>
            <div className="view">
              <b>Randomized File Playback: </b>
              {(batch && batch.randomizeFilePlayback) == true ? "Yes" : "No"}
            </div>
            <div className="view">
              <b>File Multi Sign (in %): </b>
              {batch && batch.fileMultiSign}
            </div>
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClick}>Edit</Button>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

function AddModal({ open, onClose, batch }) {
  const { usersAdded, batchInstructions } = useAdminBatchDetailsGet();
  const [selectedUsers, setSelectedUsers] = useState(
    batch && batch.usersAdded ? batch.usersAdded : []
  );
  const [selectedInstructions, setSelectedInstructions] = useState(
    batch && batch.batchInstructions ? batch.batchInstructions : ""
  );

  const handleAddUser = (user) => {
    const usersToAdd = user.split(",").map((u) => u.trim()); // Split and trim user values
    setSelectedUsers([...selectedUsers, ...usersToAdd]); // Add all users separately
  };

  const handleRemoveUser = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u !== user));
  };

  const handleAddInstruction = (instruction) => {
    if (!selectedInstructions) {
      setSelectedInstructions(instruction);
    } else {
      setSelectedInstructions(instruction);
    }
  };

  const handleRemoveInstruction = () => {
    setSelectedInstructions("");
  };

  // const handleAssign = () => {
  //   const data = {
  //     batch_id: batch.batchId,
  //     batch_name: batch.bname,
  //     users_list: selectedUsers,
  //     batch_instruction: selectedInstructions,
  //     randomize_file_playback: batch.randomizeFilePlayback,
  //     file_multiassign_percentage: batch.fileMultiSign,
  //   };
  //   console.log("final,", data)
    
  //   fetch('/api/assign', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log('Success:', data);
  //     onClose();
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
  // }

  const [fileMultiassignPercentage, setFileMultiassignPercentage] = useState(
    batch && batch.fileMultiSign ? batch.fileMultiSign : ""
  );

  const [randomizeFilePlayback, setRandomizeFilePlayback] = useState(
    batch && batch.randomizeFilePlayback ? batch.randomizeFilePlayback : ""
  );
  

  const handleAssign = () => {
    // Use the spread operator to copy the current batch object
    const updatedBatch = { ...batch };
    // Update the fileMultiSign property with the new value
    updatedBatch.fileMultiSign = fileMultiassignPercentage;
    // Update the randomizeFilePlayback property with the new value
    updatedBatch.randomizeFilePlayback = randomizeFilePlayback;
    // Create the data object with the updated batch object
    const data = {
      batch_id: updatedBatch.batchId,
      batch_name: updatedBatch.bname,
      users_list: selectedUsers,
      batch_instruction: selectedInstructions,
      randomize_file_playback: updatedBatch.randomizeFilePlayback,
      file_multiassign_percentage: updatedBatch.fileMultiSign,
    };
    
    console.log("final,", data)
      
    fetch('/api/assign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      onClose();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
  function handleSpinboxChange(e) {
    const newValue = e.target.value;
    setFileMultiassignPercentage(newValue);
  }

  function handleCheckboxChange(e) {
    const newValue = e.target.checked;
    setRandomizeFilePlayback(newValue);
  }

  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Modal</DialogTitle>
      <DialogContent>
        <div>
          <b>Batch Name: </b> {batch && batch.bname}
        </div>
        <div>
          <label htmlFor="users">
            <b>Select a User: </b>
          </label>
          <select id="users" onChange={(e) => handleAddUser(e.target.value)}>
            <option value="">Select a user</option>
            {[
              ...new Set(
                usersAdded
                  .flatMap((user) =>
                    user
                      ?.toString()
                      ?.split(/,|\s+/)
                      .map((u) => u.trim())
                  )
                  .filter((u) => u) // filter out empty or undefined values
              ),
              ...(batch && batch.usersAdded ? batch.usersAdded : []), // add preselected users to the options
            ] // get all unique options
              .map((su) => {
                if (!selectedUsers.includes(su)) {
                  // check if option has not been added already
                  return (
                    <option key={su} value={su}>
                      {su}
                    </option>
                  );
                }
                return null; // skip adding the option
              })}
          </select>
        </div>

        <div>
          <label htmlFor="instructions">
            <b>Select an Instruction: </b>
          </label>
          <select
            id="instructions"
            onChange={(e) => handleAddInstruction(e.target.value)}
          >
            <option value="">Select an instruction</option>
            {[
              ...batchInstructions.filter((instruction) => instruction), // filter out empty or undefined instructions
            ].map((instruction) => (
              <option
                key={instruction}
                value={instruction}
                selected={instruction === selectedInstructions}
              >
                {instruction}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p>
            <b>Selected Users: </b>
          </p>
          <ul>
            {selectedUsers.map((user) => (
              <li key={user}>
                {user}{" "}
                <button onClick={() => handleRemoveUser(user)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p>
            <b>Selected Instructions: </b>
          </p>
          <ul>
            {selectedInstructions && (
              <li>
                {selectedInstructions}{" "}
                <button onClick={() => handleRemoveInstruction()}>
                  Remove
                </button>
              </li>
            )}
          </ul>
        </div>
        <div>
          <label htmlFor="spinbox1">
            <b>File multi-assign (in %) : </b>
          </label>
          <input
            type="number"
            id="spinbox1"
            name="spinbox1"
            min="0"
            max="10"
            step="1"
            defaultValue={batch && batch.fileMultiSign}
            onChange={handleSpinboxChange}
          />
        </div>

        <div>
          <input
            type="checkbox"
            id="checkbox2"
            name="checkbox2"
            defaultChecked={batch && batch.randomizeFilePlayback? true: false}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="checkbox2"> Randomize File Playback</label>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAssign}>Assign</Button>

        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

function Admin() {
  const {
    batchId,
    batchNames,
    spreadsheetLink,
    noOfUsers,
    status,
    fileUploadStatus,
    usersAdded,
    batchInstructions,
    randomizeFilePlayback,
    fileMultiSign,
  } = useAdminBatchDetailsGet();
  const {
    userName,
    batchesAssigned,
    dateAssigned,
    completionStatus,
    completionDate,
    userNameBatchDetails,
  } = useAdminUserBatchInfo();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchUserQuery, setSearchUserQuery] = useState("");
  const [files, setFiles] = useState([]);
  const [batchData, setBatchData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedUserData, setSelectedUserData] = useState([]);
  const [searchBatchQuery, setSearchBatchQuery] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  useEffect(() => {
    if (batchNames) {
      const data = batchNames.map((bname, index) => ({
        id: index + 1,
        batchId: batchId[index] || "",
        bname: bname,
        spreadsheetLink: spreadsheetLink[index] || "",
        noOfUsers: noOfUsers[index] || "",
        status: status[index] || "",
        fileUploadStatus: fileUploadStatus[index] || "",
        usersAdded: usersAdded[index] || [],
        batchInstructions: batchInstructions[index] || "",
        randomizeFilePlayback: randomizeFilePlayback[index] || "",
        fileMultiSign: fileMultiSign[index] || "",
      }));
      setBatchData(data);
    } else {
      setBatchData([]);
    }
  }, [
    batchId,
    batchNames,
    spreadsheetLink,
    noOfUsers,
    status,
    fileUploadStatus,
    usersAdded,
    batchInstructions,
    randomizeFilePlayback,
    fileMultiSign,
  ]);

  useEffect(() => {
    if (userName) {
      const data = userName.map((uname, index) => ({
        id: index + 1,
        username: uname,
        batchesAssigned: batchesAssigned[index] || "",
        dateAssigned: dateAssigned[index] || "",
        completionStatus: completionStatus[index] || "",
        completionDate: completionDate[index] || "",
      }));
      setUserData(data);
    } else {
      setUserData([]);
    }
  }, [
    userName,
    batchesAssigned,
    dateAssigned,
    completionStatus,
    completionDate,
  ]);

  const handleBatchSearch = (query) => {
    setSearchQuery(query);
  };

  const handleUserSearch = (userQuery) => {
    setSearchUserQuery(userQuery);
  };

  const handleFileUpload = (acceptedFiles) => {
    setFiles(acceptedFiles);
    console.log(acceptedFiles);
  };

  const filteredBatchData = batchData.filter((item) => {
    const batchIds = item.batchId.toString().toLowerCase();
    const itemName = item.bname.toString().toLowerCase();
    const itemSheet = item.spreadsheetLink.toString().toLowerCase();
    const itemUsers = item.noOfUsers.toString().toLowerCase();
    const itemStatus = item.status.toLowerCase();
    const itemUploadStatus = item.fileUploadStatus.toLowerCase();
    const query = searchQuery.toLowerCase();
    return (
      batchIds.includes(query) ||
      itemName.includes(query) ||
      itemSheet.includes(query) ||
      itemUsers.includes(query) ||
      itemStatus.includes(query) ||
      itemUploadStatus.includes(query)
    );
  });

  const filteredUserData = userData.filter((item) => {
    const itemUname = item.username.toString().toLowerCase();
    const itemBatchedAssigned = item.batchesAssigned.toString().toLowerCase();
    const itemDateAssigned = item.dateAssigned.toString().toLowerCase();
    const itemCompletionStatus = item.completionStatus.toString().toLowerCase();
    const itemDateCompleted = item.completionDate.toString().toLowerCase();
    const userQuery = searchUserQuery.toLowerCase();
    return (
      itemUname.includes(userQuery) ||
      itemBatchedAssigned.includes(userQuery) ||
      itemDateAssigned.includes(userQuery) ||
      itemCompletionStatus.includes(userQuery) ||
      itemDateCompleted.includes(userQuery)
    );
  });

  const [toggleOn, setToggleOn] = useState(false);
  const toggleHandler = () => {
    setToggleOn(!toggleOn);
    if (!toggleOn) {
      setSearchQuery("");
      setSearchUserQuery("");
    }
  };

  const getUserBatchDetails = (user) => {
    if (user === "") {
      // return all batch details if user is not selected
      return userNameBatchDetails.map((u) => u.batchDetails).flat();
    }
    const foundUser = userNameBatchDetails.find((u) => u.user === user);
    if (foundUser) {
      return foundUser.batchDetails;
    }
    return null; // or you can return an empty array []
  };

  const handleOptionChange = (event) => {
    const selectedUser = event.target.value;
    setSelectedOption(selectedUser);
  };

  useEffect(() => {
    if (toggleOn) {
      const userData = getUserBatchDetails(selectedOption);
      if (userData) {
        setSelectedUserData(userData);
      } else {
        setSelectedUserData([]);
      }
    } else {
      const userData = getUserBatchDetails(selectedOption);
      if (userData) {
        const filteredData = userData.filter(
          (item) =>
            item.batchName
              .toLowerCase()
              .includes(searchBatchQuery.toLowerCase()) ||
            item.recentlyRatedFile
              .toLowerCase()
              .includes(searchBatchQuery.toLowerCase()) ||
            item.lastAccessTime
              .toLowerCase()
              .includes(searchBatchQuery.toLowerCase()) ||
            item.completionStatus
              .toLowerCase()
              .includes(searchBatchQuery.toLowerCase())
        );
        setSelectedUserData(filteredData);
      } else {
        setSelectedUserData([]);
      }
    }
  }, [selectedOption, searchBatchQuery, toggleOn]);

  const handleUserBatchSearch = (value) => {
    setSearchUserQuery(value);
    if (value === "") {
      // if search query is empty, display all data
      const userData = getUserBatchDetails(selectedOption);
      if (userData) {
        setSelectedUserData(userData);
      } else {
        setSelectedUserData([]);
      }
    } else {
      // filter the data based on search query
      const filteredData = selectedUserData.filter(
        (item) =>
          item.batchName.toLowerCase().includes(value.toLowerCase()) ||
          item.recentlyRatedFile.toLowerCase().includes(value.toLowerCase()) ||
          item.completionStatus.toLowerCase().includes(value.toLowerCase()) ||
          item.lastAccessTime.toLowerCase().includes(value.toLowerCase())
      );
      setSelectedUserData(filteredData);
    }
  };

  const [open, setOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);

  const handleOpen = () => {
    setModalKey(modalKey + 1);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewModalOpen = (batch) => {
    setSelectedBatch(batch);
    setViewModalOpen(true);
  };

  const handleAddModalOpen = (batch) => {
    setSelectedBatch(batch);
    setAddModalOpen(true);
  };

  const handleModalClose = () => {
    setViewModalOpen(false);
    setAddModalOpen(false);
  };

  const handleNotifyClick = async ( batchName, userName) => {
    try {
      // const response = await axios.post(
      //   "http://<app_url>/api/percept-app/v1/notify",
      //   { batch_name: batchName, user_name: userName }
      // );
      // console.log(response.data); // handle successful response
      console.log(batchName, userName);
    } catch (error) {
      console.log(error); // handle error response
    }
  };

  return (
    <div>
      {toggleOn ? (
        <p>
          <div className="table-toolbar">
            <div>
              <select
                className="select-user"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <option value="">--Select User--</option>
                {userNameBatchDetails.map((user, index) => (
                  <option key={index} value={user.user}>
                    {user.user}
                  </option>
                ))}
              </select>
            </div>
            <div className="search-box-container1">
              <ReactSearchBox
                placeholder="Search..."
                value={searchUserQuery}
                onChange={(value) => handleUserBatchSearch(value)}
              />
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Batch Name</th>
                <th>Recently Rated File</th>
                <th>Completion Status</th>
                <th>Last access time</th>
                <th>Send Reminder</th>
              </tr>
            </thead>
            <tbody>
              {selectedUserData &&
                selectedUserData.slice(0, 5).map((item) => (
                  <tr key={item.id}>
                    <td>{item.batchName}</td>
                    <td>{item.recentlyRatedFile}</td>
                    <td className={`status-${item.completionStatus.toLowerCase()}`}>{item.completionStatus}</td>
                    <td>{item.lastAccessTime}</td>
                    <td>
                  <button
                   disabled={!selectedOption}
                    onClick={() =>
                      handleNotifyClick(
                        item.batchName,
                        selectedOption
                      )
                    }
                  >
                    {"notify"}
                  </button>
                </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </p>
      ) : (
        <>
          <div className="table-toolbar">
            <div className="search-box-container">
              <ReactSearchBox
                placeholder="Search..."
                value={searchQuery}
                onChange={(value) => handleBatchSearch(value)}
              />
            </div>
            <div className="file-upload-container">
              <Button variant="contained" color="primary" onClick={handleOpen}>
                Upload Folder
              </Button>
              <UploadFolderModal
                open={open}
                onClose={handleClose}
                key={modalKey}
              />
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Audio Batch Name</th>
                <th>Spreadsheet Link</th>
                <th>Number of Users</th>
                <th>Status</th>
                <th>File Upload Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBatchData.slice(0, 5).map((item) => (
                <tr key={item.id}>
                  <td>{item.bname}</td>
                  <td>
                    {item.spreadsheetLink ? (
                      <a href={item.spreadsheetLink} download>
                        {"link"}
                      </a>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>{item.noOfUsers}</td>
                  <td className={`status-${item.status.toLowerCase()}`}>
                    {item.status}
                  </td>
                  <td>{item.fileUploadStatus}</td>
                  <td>
                    {item.status ? (
                      <button onClick={() => handleViewModalOpen(item)}>
                        VIEW
                      </button>
                    ) : (
                      <button onClick={() => handleAddModalOpen(item)}>
                        ADD
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <ViewModal
              open={viewModalOpen}
              onClose={handleModalClose}
              batch={selectedBatch}
            />
            <AddModal
              open={addModalOpen}
              onClose={handleModalClose}
              batch={selectedBatch}
            />
          </table>
          <div className="table-toolbar">
            <div className="search-box-container">
              <ReactSearchBox
                placeholder="Search..."
                value={searchUserQuery}
                onChange={(value) => handleUserSearch(value)}
              />
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Batches Assigned</th>
                <th>Date Assigned</th>
                <th>Completion Status</th>
                <th>Date Completed</th>
              </tr>
            </thead>
            <tbody>
              {filteredUserData.slice(0, 5).map((item) => (
                <tr key={item.id}>
                  <td>{item.username}</td>
                  <td>{item.batchesAssigned}</td>
                  <td>{item.dateAssigned}</td>
                  <td
                    className={`status-${item.completionStatus
                      .toString()
                      .toLowerCase()}`}
                  >
                    {item.completionStatus}
                  </td>
                  <td>{item.completionDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <label class="switch">
        <input type="checkbox" onClick={toggleHandler}></input>
        <span class="slider round"></span>
      </label>
    </div>
  );
}

export default Admin;

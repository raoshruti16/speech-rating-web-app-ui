import { useState, useEffect } from "react";

function useAdminUserBatchInfo() {
  const [userName, setUserNames] = useState([]);
  const [batchesAssigned, setBatchedAssigned] = useState([]);
  const [dateAssigned, setDateAssigned] = useState([]);
  const [completionStatus, setStatus] = useState([]);
  const [completionDate, setCompletionDate] = useState([]);
  const [batchDetails, setBatchDetails] = useState([]);

  useEffect(() => {
    fetch("./local_data/get-admin-user-batch-info.json")
      .then((response) => response.json())
      .then((data) => {
        const userName = data.data.map((batch) => batch.user_name);
        setUserNames(userName);
        console.log();
        const batchesAssigned = data.data.map(
          (batch) => batch.batches_assigned
        );
        setBatchedAssigned(batchesAssigned);
        const dateAssigned = data.data.map((batch) => batch.date_assigned);
        setDateAssigned(dateAssigned);
        const completionStatus = data.data.map(
          (batch) => batch.completion_status
        );
        setStatus(completionStatus);
        const completionDate = data.data.map((batch) => batch.completion_date);
        setCompletionDate(completionDate);
        const batchDetails = data.data.map((batch) =>
          batch.user_batch_details.map((detail) => {
            return {
              batchName: detail.batch_name,
              recentlyRatedFile: detail.recently_rated_file,
              lastAccessTime: detail.last_access_time,
              completionStatus: detail.completion_status,
            };
          })
        );
        setBatchDetails(batchDetails);
      })
      .catch((error) => console.log(error));
  }, []);

  const userNameBatchDetails = userName.map((name, index) => ({
    user: name,
    batchDetails: batchDetails[index],
  }));

  return {
    userName,
    batchesAssigned,
    dateAssigned,
    completionStatus,
    completionDate,
    userNameBatchDetails,
  };
}

export default useAdminUserBatchInfo;

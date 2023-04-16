import { useState, useEffect } from "react";

function useBatchInfoGet() {
    const [batchNames, setBatchNames] = useState([]);

    const [batchIds, setBatchIds] = useState([]);

  useEffect(() => {
    fetch('./local_data/get-batch-info.json')
      .then((response) => response.json())
      .then((data) => {
        const batchNames = data.data.batch_info.map((batch) => batch.batch_name);
        setBatchNames(batchNames);
        console.log()
        const batchIds = data.data.batch_info.map((batch) => batch.batch_id);
        setBatchIds(batchIds);
      })
      .catch((error) => console.log(error));
  }, []);

  return { batchNames, batchIds };
}

export default useBatchInfoGet;

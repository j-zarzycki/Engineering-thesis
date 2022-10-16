import React from "react";

import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import DeleteAccountPage from "./DeleteAccountPage.component";

const DeleteAccountPageContainer: React.FC = () => {
  const currentDateWithTime: String = getFullDateWithTime();

  const createDeleteAccountPageWithNoContent = async () => {
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "DeleteAccountPage")
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  const createDeleteAccountPageWithContent = async (
    activityContent: String,
  ) => {
    await apiService
      .CreateActivityWithContent(
        currentDateWithTime,
        activityContent,
        "DeleteAccountPage",
      )
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  return (
    <DeleteAccountPage
      onCreateActivityWithNoContent={createDeleteAccountPageWithNoContent}
      onCreateActivityWithContent={createDeleteAccountPageWithContent}
    />
  );
};

export default DeleteAccountPageContainer;

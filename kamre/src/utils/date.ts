import moment from "moment";

export const getFullDateWithTime = () => {
  const today = new Date();
  const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(today.getDate()).padStart(2, "0")}`;
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  const dateTime = `${date}:${time}`;
  return dateTime;
};

export const getFullDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = String(today.getFullYear());
  const date = `${mm}/${dd}/${yyyy}`;
  return date;
};

export const splitDate = (date: String) => {
  const dateInput = new Date(String(date));
  const month = String(dateInput.getMonth() + 1);
  const year = String(dateInput.getFullYear());
  const day = String(dateInput.getDate());
  return {
    month,
    year,
    day,
  };
};

export const checkIfTokenIsValid = (tokenExp: string) => {
  const currentDate = moment();
  const tokenExpMoment = moment(tokenExp).add(5, "minutes");

  console.log("currDate = ", currentDate);
  console.log("tokexExcp = ", tokenExpMoment);
  console.log("valid = ", moment(currentDate).isAfter(tokenExpMoment));

  if (moment(currentDate).isAfter(tokenExpMoment)) {
    return false;
  }

  return true;
};

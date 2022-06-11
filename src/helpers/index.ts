import moment from "moment";

export const convetDateTo_Day_Month_Year = (date: Date) => {
  return moment(date).format("dddd MMMM DD.MM.Y");
};

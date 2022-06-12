import { EmptySingleTask, SingleTask } from "./../utils/interfaces";
import moment from "moment";

export const convetDateTo_Day_Month_Year = (date: Date) => {
  return moment(date).format("dddd MMMM DD.MM.Y");
};

export const createTask = (
  title: string,
  dateEnd: Date,
  dateStart: Date,
  category?: string,
  content?: string
): SingleTask => {
  return {
    category,
    task: {
      title,
      content,
      dateCreated: new Date(),
      dateEnd,
      dateStart,
    },
  };
};

export const createEmptyTask = (): EmptySingleTask => {
  return {
    category: "",
    task: {
      title: "",
      content: "",
      dateEnd: "",
      dateStart: "",
      customShadowColor: "",
      dateCreated: "",
      isFinished: "",
    },
  };
};

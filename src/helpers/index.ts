import { EmptyTask } from "./../components/Task/task";
import { EmptySingleTask, SingleTask } from "./../utils/interfaces";
import moment from "moment";
import { TaskProps, ValidationState } from "../utils/enums";

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

export const validateCategory = (category: string): ValidationState => {
  return ValidationState.VALID;
};

export const validateTitle = (title: string): ValidationState => {
  return !!title ? ValidationState.VALID : ValidationState.NOT_VALID;
};

export const validateContent = (content: string): ValidationState => {
  return ValidationState.VALID;
};

export const validateDateStart = (dateStart: string): ValidationState => {
  return ValidationState.VALID;
};

export const validateDateEnd = (dateEnd: string): ValidationState => {
  return ValidationState.VALID;
};

const validateCustomShadowColor = (customShadowColor: string): ValidationState => {
  return ValidationState.VALID;
};

export const validateTaskEntity = (validation: string, text: string): ValidationState => {
  switch (validation) {
    case TaskProps.CATEGORY:
      return validateCategory(text);
    case TaskProps.TITLE:
      return validateTitle(text);
    case TaskProps.CONTENT:
      return validateContent(text);
    case TaskProps.DATE_START:
      return validateDateStart(text);
    case TaskProps.DATE_END:
      return validateDateEnd(text);
    case TaskProps.CUSTOM_SHADOW_COLOR:
      return validateCustomShadowColor(text);

    default:
      return ValidationState.NEUTRAL;
  }
};

export const validateTaskObject = (
  taskObject: EmptySingleTask
): { isValid: boolean; notValidEntries: Array<string> } => {
  let isValid = true;
  let notValidEntries = [];

  if (validateTaskEntity(TaskProps.CATEGORY, taskObject[TaskProps.CATEGORY] || "") === ValidationState.NOT_VALID) {
    isValid = false;
    notValidEntries.push(TaskProps.CATEGORY);
  }

  Object.keys(taskObject.task).forEach((key) => {
    const text = taskObject.task[key as keyof EmptyTask]?.toString() || "";
    if (validateTaskEntity(key, text) === ValidationState.NOT_VALID) {
      isValid = false;
      notValidEntries.push(key.toString());
    }
  });

  return { isValid, notValidEntries };
};

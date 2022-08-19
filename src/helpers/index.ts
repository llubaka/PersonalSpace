import { LocalStorageNames, PriorityStatus } from "./../utils/enums";
import { EmptyPriority } from "./../components/Priority/priority";
import { EmptyTask } from "./../components/Task/task";
import { EmptySinglePriority, EmptySingleTask } from "./../utils/interfaces";
import moment from "moment";
import { PriorityProps, TaskProps, ValidationState } from "../utils/enums";

export const convetDateTo_Day_Month_Year = (date: Date) => {
  return moment(date).format("dddd MMMM DD.MM.Y");
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

export const createEmptyPriority = (): EmptySinglePriority => {
  return {
    category: "",
    priority: {
      title: "",
      content: "",
      customShadowColor: "",
      dateCreated: "",
      status: PriorityStatus.NOT_STARTED,
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
  var m = moment(dateStart, "DD-MM-YYYY");

  return m.isValid() ? ValidationState.VALID : ValidationState.NOT_VALID;
};

export const validateDateEnd = (dateEnd: string): ValidationState => {
  var m = moment(dateEnd, "DD-MM-YYYY");

  return m.isValid() ? ValidationState.VALID : ValidationState.NOT_VALID;
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

export const validatePriorityEntity = (validation: string, text: string): ValidationState => {
  switch (validation) {
    case PriorityProps.CATEGORY:
      return validateCategory(text);
    case PriorityProps.TITLE:
      return validateTitle(text);
    case PriorityProps.CONTENT:
      return validateContent(text);
    case PriorityProps.CUSTOM_SHADOW_COLOR:
      return validateCustomShadowColor(text);

    default:
      return ValidationState.NEUTRAL;
  }
};

export const validatePriorityObject = (
  priorityObject: EmptySinglePriority
): { isValid: boolean; notValidEntries: Array<string> } => {
  let isValid = true;
  let notValidEntries = [];

  if (
    validateTaskEntity(PriorityProps.CATEGORY, priorityObject[PriorityProps.CATEGORY] || "") ===
    ValidationState.NOT_VALID
  ) {
    isValid = false;
    notValidEntries.push(PriorityProps.CATEGORY);
  }

  Object.keys(priorityObject.priority).forEach((key) => {
    const text = priorityObject.priority[key as keyof EmptyPriority]?.toString() || "";
    if (validateTaskEntity(key, text) === ValidationState.NOT_VALID) {
      isValid = false;
      notValidEntries.push(key.toString());
    }
  });

  return { isValid, notValidEntries };
};

export const getLocalStorageArrayItem = (key: LocalStorageNames) => {
  const item = localStorage.getItem(key);
  if (item) return JSON.parse(item);

  return [];
};

export const setLocalStorageArrayItem = (item: any[], key: LocalStorageNames) => {
  localStorage.setItem(key, JSON.stringify(item));
};

export const generateUUID = () => {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 = (typeof performance !== "undefined" && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

export const isNumber = (n: any) => {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
};

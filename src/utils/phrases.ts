import { PriorityStatus } from "./enums";
export const TASK_STATUSES = {
  notStarted: "Not started",
  inProcess: "In process",
  timedOut: "Timed out",
  finishedSuccessful: "Finished successfully",
};

export const PRIORITY_STATUSES = {
  [PriorityStatus.NOT_STARTED]: "Not started",
  [PriorityStatus.IN_PROCESS]: "In process",
  [PriorityStatus.FINISHED_SUCCESSFUL]: "Finished successfully",
};

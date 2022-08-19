export enum ValidationState {
  NEUTRAL,
  NOT_VALID,
  VALID,
}

export enum PriorityStatus {
  NOT_STARTED,
  IN_PROCESS,
  FINISHED_SUCCESSFUL,
}

export enum TaskProps {
  CATEGORY = "category",
  TITLE = "title",
  CONTENT = "content",
  DATE_START = "dateStart",
  DATE_END = "dateEnd",
  DATE_CREATED = "dateCreated",
  IS_FINISHED = "isFinished",
  CUSTOM_SHADOW_COLOR = "customShadowColor",
}

export enum PriorityProps {
  CATEGORY = "category",
  TITLE = "title",
  CONTENT = "content",
  DATE_CREATED = "dateCreated",
  STATUS = "status",
  CUSTOM_SHADOW_COLOR = "customShadowColor",
}

export enum LocalStorageNames {
  TASKS = "tasks",
  PRIORITIES = "priorities",
}

export type TAction =
  | TCreateActionCreateTask
  | TCreateActionDeleteTask
  | TCreateActionChangeStatusTask
  | TCreateActionChangeTaskTitle

export enum ActionType {
  CREATE_TASK = 'CREATE_TASK',
  DELETE_TASK = 'DELETE_TASK',
  CHANGE_STATUS_TASK = 'CHANGE_STATUS_TASK',
  CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE',
}

type TCreateActionCreateTask = {
  type: ActionType.CREATE_TASK
  todoListId: string
  title: string
}

type TCreateActionDeleteTask = {
  type: ActionType.DELETE_TASK
  todoListId: string
  taskId: string
}

type TCreateActionChangeStatusTask = {
  type: ActionType.CHANGE_STATUS_TASK
  todoListId: string
  taskId: string
  isDone: boolean
}

type TCreateActionChangeTaskTitle = {
  type: ActionType.CHANGE_TASK_TITLE
  todoListId: string
  taskId: string
  title: string
}

export function createActionCreateTask(todoListId: string, title: string): TCreateActionCreateTask {
  return {
    type: ActionType.CREATE_TASK,
    todoListId,
    title,
  }
}

export function createActionDeleteTask(
  todoListId: string,
  taskId: string,
): TCreateActionDeleteTask {
  return {
    type: ActionType.DELETE_TASK,
    todoListId,
    taskId,
  }
}

export function createActionChangeStatusTask(
  todoListId: string,
  taskId: string,
  isDone: boolean,
): TCreateActionChangeStatusTask {
  return {
    type: ActionType.CHANGE_STATUS_TASK,
    todoListId,
    taskId,
    isDone,
  }
}

export function createActionChangeTaskTitle(
  todoListId: string,
  taskId: string,
  title: string,
): TCreateActionChangeTaskTitle {
  return {
    type: ActionType.CHANGE_TASK_TITLE,
    todoListId,
    taskId,
    title,
  }
}

export type TAction = TCreateActionCreateTask | TCreateActionDeleteTask

export enum ActionType {
  CREATE_TASK = 'CREATE_TASK',
  DELETE_TASK = 'DELETE_TASK',
}

export type TCreateActionCreateTask = {
  type: ActionType.CREATE_TASK
  todoListId: string
  title: string
}

export type TCreateActionDeleteTask = {
  type: ActionType.DELETE_TASK
  todoListId: string
  taskId: string
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

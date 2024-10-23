export enum ActionType {
  CREATE_TASK = 'CREATE_TASK',
}

export type TCreateActionCreateTask = {
  type: ActionType.CREATE_TASK
  todoListId: string
  title: string
}

export type TAction = TCreateActionCreateTask

export function createActionCreateTask(todoListId: string, title: string): TCreateActionCreateTask {
  return {
    type: ActionType.CREATE_TASK,
    todoListId,
    title,
  }
}

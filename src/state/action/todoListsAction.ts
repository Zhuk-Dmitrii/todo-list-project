export enum ActionType {
  CREATE_TODO_LIST = 'CREATE_TODO_LIST',
  DELETE_TODO_LIST = 'DELETE_TODO_LIST',
}

export type TCreateActionCreateTodoList = {
  type: ActionType.CREATE_TODO_LIST
  title: string
}

export type TCreateActionDeleteTodoList = {
  type: ActionType.DELETE_TODO_LIST
  id: string
}

export type TAction = TCreateActionCreateTodoList | TCreateActionDeleteTodoList

export function CreateActionCreateTodoList(title: string): TCreateActionCreateTodoList {
  return {
    type: ActionType.CREATE_TODO_LIST,
    title,
  }
}

export function CreateActionDeleteTodoList(id: string): TCreateActionDeleteTodoList {
  return {
    type: ActionType.DELETE_TODO_LIST,
    id,
  }
}

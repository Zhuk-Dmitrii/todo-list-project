import { FilteredValues } from '../../components/App/App'

export enum ActionType {
  CREATE_TODO_LIST = 'CREATE_TODO_LIST',
  DELETE_TODO_LIST = 'DELETE_TODO_LIST',
  CHANGE_FILTER_TODO_LIST = 'CHANGE_FILTER_TODO_LIST',
  CHANGE_TITLE_TODO_LIST = 'CHANGE_TITLE_TODO_LIST',
}

export type TCreateActionCreateTodoList = {
  type: ActionType.CREATE_TODO_LIST
  title: string
}

export type TCreateActionDeleteTodoList = {
  type: ActionType.DELETE_TODO_LIST
  id: string
}

export type TCrateActionChangeFilterTodoList = {
  type: ActionType.CHANGE_FILTER_TODO_LIST
  id: string
  value: FilteredValues
}

export type TCreateActionChangeTitleTodoList = {
  type: ActionType.CHANGE_TITLE_TODO_LIST
  id: string
  newTitle: string
}

export type TAction =
  | TCreateActionCreateTodoList
  | TCreateActionDeleteTodoList
  | TCrateActionChangeFilterTodoList
  | TCreateActionChangeTitleTodoList

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

export function CreateActionChangeFilterTodoList(
  id: string,
  value: FilteredValues,
): TCrateActionChangeFilterTodoList {
  return {
    type: ActionType.CHANGE_FILTER_TODO_LIST,
    id,
    value,
  }
}

export function CreateActionChangeTitleTodoList(
  id: string,
  newTitle: string,
): TCreateActionChangeTitleTodoList {
  return {
    type: ActionType.CHANGE_TITLE_TODO_LIST,
    id,
    newTitle,
  }
}

import { FilteredValues } from '../types/business'

export enum ActionTypeTodoList {
  CREATE_TODO_LIST = 'CREATE_TODO_LIST',
  DELETE_TODO_LIST = 'DELETE_TODO_LIST',
  CHANGE_FILTER_TODO_LIST = 'CHANGE_FILTER_TODO_LIST',
  CHANGE_TITLE_TODO_LIST = 'CHANGE_TITLE_TODO_LIST',
}

export type TCreateActionCreateTodoList = {
  type: ActionTypeTodoList.CREATE_TODO_LIST
  todoListId: string
  title: string
}

export type TCreateActionDeleteTodoList = {
  type: ActionTypeTodoList.DELETE_TODO_LIST
  id: string
}

export type TCrateActionChangeFilterTodoList = {
  type: ActionTypeTodoList.CHANGE_FILTER_TODO_LIST
  id: string
  value: FilteredValues
}

export type TCreateActionChangeTitleTodoList = {
  type: ActionTypeTodoList.CHANGE_TITLE_TODO_LIST
  id: string
  newTitle: string
}

export type TAction =
  | TCreateActionCreateTodoList
  | TCreateActionDeleteTodoList
  | TCrateActionChangeFilterTodoList
  | TCreateActionChangeTitleTodoList

export function createActionCreateTodoList(title: string): TCreateActionCreateTodoList {
  return {
    type: ActionTypeTodoList.CREATE_TODO_LIST,
    todoListId: crypto.randomUUID(),
    title,
  }
}

export function createActionDeleteTodoList(id: string): TCreateActionDeleteTodoList {
  return {
    type: ActionTypeTodoList.DELETE_TODO_LIST,
    id,
  }
}

export function createActionChangeFilterTodoList(
  id: string,
  value: FilteredValues,
): TCrateActionChangeFilterTodoList {
  return {
    type: ActionTypeTodoList.CHANGE_FILTER_TODO_LIST,
    id,
    value,
  }
}

export function createActionChangeTitleTodoList(
  id: string,
  newTitle: string,
): TCreateActionChangeTitleTodoList {
  return {
    type: ActionTypeTodoList.CHANGE_TITLE_TODO_LIST,
    id,
    newTitle,
  }
}

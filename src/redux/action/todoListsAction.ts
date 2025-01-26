import { TodoListType } from '../../api/typesAPI/todoListTypes'
import { FilteredValues } from '../types/business'

export enum ActionTypeTodoList {
  CREATE_TODO_LIST = 'CREATE_TODO_LIST',
  DELETE_TODO_LIST = 'DELETE_TODO_LIST',
  CHANGE_FILTER_TODO_LIST = 'CHANGE_FILTER_TODO_LIST',
  CHANGE_TITLE_TODO_LIST = 'CHANGE_TITLE_TODO_LIST',
  SET_TODO_LISTS = 'SET_TODO_LISTS',
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

export type TCreateActionSetTodoLists = {
  type: ActionTypeTodoList.SET_TODO_LISTS
  todoLists: TodoListType[]
}

export type TAction =
  | TCreateActionCreateTodoList
  | TCreateActionDeleteTodoList
  | TCrateActionChangeFilterTodoList
  | TCreateActionChangeTitleTodoList
  | TCreateActionSetTodoLists

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

export function createActionSetTodoLists(todoLists: TodoListType[]): TCreateActionSetTodoLists {
  return {
    type: ActionTypeTodoList.SET_TODO_LISTS,
    todoLists,
  }
}

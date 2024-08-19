import { MouseEvent } from 'react'
import classNames from 'classnames'

import { Todo } from '../Todo/Todo'
import { TTask, FilteredValues } from '../App/App'
import { InputForm } from '../InputForm/InputForm'
import style from './TodoList.module.scss'
import { EditableSpan } from '../EditableSpan/EditableSpan'

type TProps = {
  todoListId: string
  title: string
  tasks: Array<TTask>
  filterValue: string
  removeTask: (todoListId: string, id: string) => void
  changeValueForFilter: (todoListId: string, value: FilteredValues) => void
  createTask: (todoListId: string, title: string) => void
  changeStatus: (todoListId: string, taskId: string, isDone: boolean) => void
  changeTodoValue: (todoListId: string, taskId: string, title: string) => void
  changeTodoListTitle: (todoListId: string, newTitle: string) => void
  deleteTodoList: (todoListId: string) => void
}

export function TodoList(props: TProps) {
  function handleFilterBtnClick(event: MouseEvent<HTMLButtonElement>) {
    const targetValue = event.currentTarget.value

    if (targetValue === FilteredValues.all) {
      props.changeValueForFilter(props.todoListId, FilteredValues.all)
    }

    if (targetValue === FilteredValues.active) {
      props.changeValueForFilter(props.todoListId, FilteredValues.active)
    }

    if (targetValue === FilteredValues.completed) {
      props.changeValueForFilter(props.todoListId, FilteredValues.completed)
    }
  }

  function handleClickDelete() {
    props.deleteTodoList(props.todoListId)
  }

  function createTask(title: string) {
    props.createTask(props.todoListId, title)
  }

  function handleChangeTodoListTitle(newTitle: string) {
    props.changeTodoListTitle(props.todoListId, newTitle)
  }

  return (
    <div className={style.wrapper}>
      <button className={classNames(style.btn, style.btnDelete)} onClick={handleClickDelete}>
        x
      </button>
      <EditableSpan
        className={style.title}
        title={props.title}
        changeValue={handleChangeTodoListTitle}
      />
      <InputForm createItem={createTask} />
      <ul className={style.todos}>
        {props.tasks.map(task => (
          <Todo
            key={task.id}
            todoListId={props.todoListId}
            task={task}
            removeTask={props.removeTask}
            changeStatus={props.changeStatus}
            changeTodoValue={props.changeTodoValue}
          />
        ))}
      </ul>
      <div className={style.btnControls}>
        <button
          className={classNames(style.btn, style.btnControl, {
            [style.active]: props.filterValue == FilteredValues.all,
          })}
          onClick={handleFilterBtnClick}
          value={FilteredValues.all}
        >
          All
        </button>
        <button
          className={classNames(style.btn, style.btnControl, {
            [style.active]: props.filterValue == FilteredValues.active,
          })}
          onClick={handleFilterBtnClick}
          value={FilteredValues.active}
        >
          Active
        </button>
        <button
          className={classNames(style.btn, style.btnControl, {
            [style.active]: props.filterValue == FilteredValues.completed,
          })}
          onClick={handleFilterBtnClick}
          value={FilteredValues.completed}
        >
          Completed
        </button>
      </div>
    </div>
  )
}

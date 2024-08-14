import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react'
import classNames from 'classnames'

import { Todo } from '../Todo/Todo'
import { TTask, FilteredValues } from '../App/App'
import style from './TodoList.module.scss'

type TProps = {
  todoListId: string
  title: string
  tasks: Array<TTask>
  filterValue: string
  removeTask: (todoListId: string, id: string) => void
  changeValueForFilter: (todoListId: string, value: FilteredValues) => void
  createTask: (todoListId: string, title: string) => void
  changeStatus: (todoListId: string, taskId: string, isDone: boolean) => void
  deleteTodoList: (todoListId: string) => void
}

export function TodoList(props: TProps) {
  const [titleTodo, setTitleTodo] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitleTodo(event.target.value)
    setError(null)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (titleTodo.trim() === '') {
      setError('Title is required')
      setTitleTodo('')

      return
    }

    props.createTask(props.todoListId, titleTodo.trim())
    setTitleTodo('')
  }

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

  return (
    <div className={style.wrapper}>
      <button className={classNames(style.btn, style.btnDelete)} onClick={handleClickDelete}>
        x
      </button>
      <h3 className={style.title}>{props.title}</h3>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.inputTextContainer}>
          <input
            className={classNames({ [style.errorInput]: error })}
            onChange={handleChangeTitle}
            value={titleTodo}
            type="text"
          />
          <button className={classNames(style.btn, style.btnSubmit)}>add</button>
        </div>
        {error && <p className={style.errorMessage}>{error}</p>}
      </form>
      <ul className={style.todos}>
        {props.tasks.map(task => (
          <Todo
            key={task.id}
            todoListId={props.todoListId}
            task={task}
            removeTask={props.removeTask}
            changeStatus={props.changeStatus}
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

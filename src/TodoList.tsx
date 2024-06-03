import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react'

import { TTask, FilteredValues } from './App'
import './todoList.css'

type TProps = {
  title: string
  tasks: Array<TTask>
  removeTask: (id: string) => void
  changeValueForFilter: (value: FilteredValues) => void
  createTask: (title: string) => void
}

export function TodoList(props: TProps) {
  const [titleTodo, setTitleTodo] = useState('')

  function handleChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitleTodo(event.target.value)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    props.createTask(titleTodo)
    setTitleTodo('')
  }

  function handleFilterBtnClick(event: MouseEvent<HTMLButtonElement>) {
    const targetValue = event.currentTarget.value

    if (targetValue === FilteredValues.all) {
      props.changeValueForFilter(FilteredValues.all)
    }

    if (targetValue === FilteredValues.active) {
      props.changeValueForFilter(FilteredValues.active)
    }

    if (targetValue === FilteredValues.completed) {
      props.changeValueForFilter(FilteredValues.completed)
    }
  }

  return (
    <div className="todo-list__wrapper">
      <h3 className="todo-list__title">{props.title}</h3>
      <form onSubmit={handleSubmit} className="todo-list__input-container">
        <input onChange={handleChangeTitle} value={titleTodo} type="text" />
        <button className="input-container__btn btn">add</button>
      </form>
      <ul className="todo-list__items">
        {props.tasks.map(task => {
          function handleRemoveTask() {
            props.removeTask(task.id)
          }

          return (
            <li key={task.id} className="todo-list__item">
              <input type="checkbox" checked={task.isDone} />
              <span>{task.title}</span>
              <button onClick={handleRemoveTask}>x</button>
            </li>
          )
        })}
      </ul>
      <div className="todo-list__btn-controls">
        <button
          className="btn-controls__btn btn"
          onClick={handleFilterBtnClick}
          value={FilteredValues.all}
        >
          All
        </button>
        <button
          className="btn-controls__btn btn"
          onClick={handleFilterBtnClick}
          value={FilteredValues.active}
        >
          Active
        </button>
        <button
          className="btn-controls__btn btn"
          onClick={handleFilterBtnClick}
          value={FilteredValues.completed}
        >
          Completed
        </button>
      </div>
    </div>
  )
}

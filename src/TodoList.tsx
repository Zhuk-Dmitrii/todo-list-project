import { TTask, FilteredValues } from './App'
import './todoList.css'

type TProps = {
  title: string
  tasks: Array<TTask>
  removeTask: (id: number) => void
  changeValueForFilter: (value: FilteredValues) => void
}

export function TodoList(props: TProps) {
  return (
    <div className="todo-list__wrapper">
      <h3 className="todo-list__title">{props.title}</h3>
      <div className="todo-list__input-container">
        <input type="text" />
        <button className="input-container__btn btn">add</button>
      </div>
      <ul className="todo-list__items">
        {props.tasks.map(task => (
          <li key={task.id} className="todo-list__item">
            <input type="checkbox" checked={task.isDone} />
            <span>{task.title}</span>
            <button onClick={() => props.removeTask(task.id)}>x</button>
          </li>
        ))}
      </ul>
      <div className="todo-list__btn-controls">
        <button
          onClick={() => props.changeValueForFilter(FilteredValues.all)}
          className="btn-controls__btn btn"
        >
          All
        </button>
        <button
          onClick={() => props.changeValueForFilter(FilteredValues.active)}
          className="btn-controls__btn btn"
        >
          Active
        </button>
        <button
          onClick={() => props.changeValueForFilter(FilteredValues.completed)}
          className="btn-controls__btn btn"
        >
          Completed
        </button>
      </div>
    </div>
  )
}

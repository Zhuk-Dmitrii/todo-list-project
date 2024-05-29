import './todoList.css'

export type TTasks = {
  id: number
  title: string
  isDone: boolean
}

type TProps = {
  title: string
  tasks: Array<TTasks>
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
        <li className="todo-list__item">
          <input type="checkbox" checked={props.tasks[0].isDone} />
          <span>{props.tasks[0].title}</span>
        </li>
        <li className="todo-list__item">
          <input type="checkbox" checked={props.tasks[1].isDone} />
          <span>{props.tasks[1].title}</span>
        </li>
        <li className="todo-list__item">
          <input type="checkbox" checked={props.tasks[2].isDone} />
          <span>{props.tasks[2].title}</span>
        </li>
      </ul>
      <div className="todo-list__btn-controls">
        <button className="btn-controls__btn btn">All</button>
        <button className="btn-controls__btn btn">Active</button>
        <button className="btn-controls__btn btn">Completed</button>
      </div>
    </div>
  )
}

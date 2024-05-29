import { TTasks, TodoList } from './TodoList'
import './App.css'

export function App() {
  const task1: Array<TTasks> = [
    { id: 1, title: 'HTML & CSS', isDone: true },
    { id: 2, title: 'JS/TS', isDone: true },
    { id: 1, title: 'ReactJS', isDone: false },
  ]

  const task2: Array<TTasks> = [
    { id: 1, title: 'Lineage II', isDone: true },
    { id: 2, title: 'GTA V', isDone: false },
    { id: 1, title: 'Dota 2', isDone: true },
  ]

  return (
    <div className="app">
      <TodoList title={'What to learn'} tasks={task1} />
      <TodoList title={'Games'} tasks={task2} />
    </div>
  )
}

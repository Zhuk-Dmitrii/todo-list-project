import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'

import { todoListsAPI } from '../api/todoList-api'

const meta: Meta = {
  title: 'Request',
}

export default meta

type Story = StoryObj

export const GetTodoLists: Story = {
  render: () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any>([])

    useEffect(() => {
      todoListsAPI.getTodoLists().then(res => {
        setData(res.data)
      })
    }, [])

    return <div>{JSON.stringify(data)}</div>
  },
}

export const CreateTodoLists: Story = {
  render: () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any>(null)

    useEffect(() => {
      const todoListTitle = 'todo list 2'

      todoListsAPI.createTodoList(todoListTitle).then(res => {
        setData(res.data)
      })
    }, [])

    return <div>{JSON.stringify(data)}</div>
  },
}

export const UpdateTodoLists: Story = {
  render: () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any>(null)

    useEffect(() => {
      const todoListID = '9052bf22-e2a9-4281-b193-3a2e5277d1c5'
      const newTitle = 'new todo-list title'

      todoListsAPI.updateTodoList(todoListID, newTitle).then(res => {
        setData(res.data)
      })
    }, [])

    return <div>{JSON.stringify(data)}</div>
  },
}

export const DeleteTodoLists: Story = {
  render: () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any>(null)

    useEffect(() => {
      const todoListID = '3d58e5e4-982b-46ce-b1d0-7345740cd9d7'

      todoListsAPI.deleteTodoList(todoListID).then(res => {
        setData(res.data)
      })
    }, [])

    return <div>{JSON.stringify(data)}</div>
  },
}

export const GetTodoListTasks: Story = {
  render: () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any>(null)

    useEffect(() => {
      const todoListID = '4461be41-34a1-4a6d-b102-972a4c0cdf1a'

      todoListsAPI.getTodoListTasks(todoListID).then(res => {
        setData(res.data.items)
      })
    }, [])

    return <div>{JSON.stringify(data)}</div>
  },
}

export const CreateTodoListTask: Story = {
  render: () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any>(null)

    useEffect(() => {
      const todoListID = '4461be41-34a1-4a6d-b102-972a4c0cdf1a'
      const taskTitle = 'new task'

      todoListsAPI.createTodoListTask(todoListID, taskTitle).then(res => {
        setData(res.data)
      })
    }, [])

    return <div>{JSON.stringify(data)}</div>
  },
}

export const UpdateTodoListTask: Story = {
  render: () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any>(null)

    useEffect(() => {
      const todoListID = '4461be41-34a1-4a6d-b102-972a4c0cdf1a'
      const taskID = 'b4e69bb0-871e-497a-9aa0-c53554ffb315'
      const modelTask = {
        title: 'Bla bla bla',
        description: '123123123',
        status: 5,
        priority: 3,
        startDate: '',
        deadline: '',
      }

      todoListsAPI.updateTodoListTask(todoListID, taskID, modelTask).then(res => {
        setData(res.data)
      })
    }, [])

    return <div>{JSON.stringify(data)}</div>
  },
}

export const DeleteTodoListTask: Story = {
  render: () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any>(null)

    useEffect(() => {
      const todoListID = '4461be41-34a1-4a6d-b102-972a4c0cdf1a'
      const taskID = 'dacc0881-1c6a-407a-a62e-6a4057aab9e9'

      todoListsAPI.deleteTodoListTask(todoListID, taskID).then(res => {
        setData(res.data)
      })
    }, [])

    return <div>{JSON.stringify(data)}</div>
  },
}

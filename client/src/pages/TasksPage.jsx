import React, { useEffect } from 'react'
import { useTasks } from '../context/TaskContext'

function TasksPage() {

  const {tasks, getTasks} = useTasks()

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <div>
      <div>TasksPages</div>
      <div className='flex flex-col items-center'>
        {tasks.map((task,i) => {
          return (
          <div key={task._id} className='max-w-md w-full bg-zinc-800 p-5 m-4 max-w-screen-sm rounded-md'>
            <h1 className='text-center text-2xl'>{task.title}</h1>
            <p className='bg-zinc-700 p-2 rounded-md mt-5'>{task.description}</p>
          </div>
          )
        })}
      </div>
    </div>

  )
}

export default TasksPage
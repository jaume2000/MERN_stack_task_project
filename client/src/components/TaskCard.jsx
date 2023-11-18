import React from 'react'
import { useTasks } from '../context/TaskContext'
import { Link } from 'react-router-dom'

import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'
dayjs.extend(utc)

function TaskCard({task}) {


    const {deleteTask} = useTasks()

  return (
    <div className='max-w-md w-full bg-zinc-800 p-5 m-4 max-w-screen-sm rounded-md'>

        <header className='flex justify-between'>
            <h1 className='text-center text-2xl'>{task.title}</h1>
            <div className='flex gap-x-2 items-center'>
                <button onClick={()=>{deleteTask(task._id)}}
                  className='bg-red-500 hober:bg-red-600 text-white px-4 py-2 rounded-md'
                >delete</button>
                <Link to={`/task/${task._id}`}
                  className='bg-blue-500 hober:bg-blue-600 text-white px-4 py-2 rounded-md'
                >edit</Link>
            </div>
        </header>

        <p className='bg-zinc-700 p-2 rounded-md mt-5 mb-10'>{task.description}</p>
        <p className='text-zinc-500'>{dayjs(task.date).utc().format("DD/MM/YYYY")}</p>
    </div>
  )
}

export default TaskCard
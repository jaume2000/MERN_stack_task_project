import React, { useEffect } from 'react'
import { useTasks } from '../context/TaskContext'
import TaskCard from '../components/TaskCard'

function TasksPage() {

  const {tasks, getTasks} = useTasks()

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <div>
      <div>TasksPages</div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
        {tasks.map((task,i) => <TaskCard key={task._id} task={task}/>)}
      </div>
    </div>

  )
}

export default TasksPage
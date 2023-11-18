import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest, getTaskRequest, updateTaskRequest } from "../api/tasks";
import {deleteTasksRequest} from '../api/tasks'


const TaskContext = createContext()

export const useTasks = ()=> {
    const context = useContext(TaskContext)

    if(!context){
        throw new Error("useTasks must be used within a TaskProvider")
    }

    return context
}

function TaskProvider({children}) {
    const [tasks, setTasks] = useState([])

    const getTasks = async () =>{
        try {
            const res = await getTasksRequest()
            setTasks(res.data)
        }
        catch(err){
            console.log(err)
        }
    }

    const createTask = async (task) =>{
        const res = await createTaskRequest(task)
        console.log(res)
    }

    const deleteTask = async (id) =>{
        try{
            const res = await deleteTasksRequest(id)
            console.log(res)
            if(res.status === 204){
                setTasks(tasks.filter(task => task._id != id))
            }
        }
        catch(err){
            console.log(err)
        }
    }

    const getTask = async(id)=> {
        try{
            const res = await getTaskRequest(id)
            return res.data
        }
        catch(err){
            console.log(err)
        }
    }

    const updateTask = async(id,task)=> {
        try{
            const res = await updateTaskRequest(id, task)
        }
        catch(err){
            console.log(err)
        }
    }


  return (
    <TaskContext.Provider value={{
        tasks,
        createTask,
        getTasks,
        getTask,
        deleteTask,
        updateTask
    }}>
        {children}
    </TaskContext.Provider>
  )
}

export default TaskProvider
import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { useTasks } from '../context/TaskContext'
import { useNavigate, useParams } from 'react-router-dom'

import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'
dayjs.extend(utc)


function TaskFormPage() {

  const {register, handleSubmit, setValue} = useForm()

  const {tasks, createTask, getTask, updateTask} = useTasks()

  const navigator = useNavigate()
  const params = useParams()

  useEffect(()=>{

    async function loadTask(){

      //si estamos editando una tarea...
      if(params?.id){
        const task = await getTask(params.id)

        //Cuando se carga el formulario de edición, hacemos que estos sean
        //los valores iniciales
        setValue('title', task.title)
        setValue('description', task.description)
        setValue('date', dayjs(task.date).utc().format("YYYY-MM-DD"))
        console.log(task)
      }
    }
    loadTask()

  },[])

  const onSubmit = handleSubmit(async (data)=>{

    console.log("XDDD",data)
    const dateValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format()
    }

    if(params.id){
      //Estamos editando
      await updateTask(params.id, dateValid)
    }
    else{
      await createTask(dateValid)
    }
    navigator('/tasks')

  })

  return (
    <div className="flex h-[calc(75vh-100px)] justify-center items-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <label htmlFor='title'>title</label>
          <input
            type="text"
            placeholder="Title"
            {...register("title")}

            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          />

          <label htmlFor='description'>description</label>
          <textarea
          rows="3"
          {...register("description")}
          placeholder='Description'
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />

          <label htmlFor='date'>date</label>
          <input type='date'
          {...register("date")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          ></input>

          <button className='bg-zinc-500 rounded-md w-full px-10 py-1 mt-3'>Save</button>

        </form>
      </div>
    </div>
  )
}

export default TaskFormPage
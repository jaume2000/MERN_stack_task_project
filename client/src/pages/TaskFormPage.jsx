import React from 'react'
import {useForm} from 'react-hook-form'

function TaskFormPage() {

  const {register, handleSubmit} = useForm()

  const onSubmit = handleSubmit((data)=>{
    console.log(data)
  })

  return (
    <div className="flex h-[calc(75vh-100px)] justify-center items-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          
          <input
            type="text"
            placeholder="Title"
            {...register("title")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          />

          <textarea
          rows="3"
          {...register("description")}
          placeholder='Description'
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          <button className='bg-zinc-500 rounded-md w-full px-10 py-1 mt-3'>Save</button>

        </form>
      </div>
    </div>
  )
}

export default TaskFormPage
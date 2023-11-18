import my_axios from './axios.js'

export const getTasksRequest = () => my_axios.get(`/tasks`)
export const getTaskRequest = (id) => my_axios.get(`/task/${id}`)
export const createTaskRequest = (task) => my_axios.post(`/tasks`, task)
export const updateTaskRequest = (id,task) => my_axios.put(`/task/${id}`, task)
export const deleteTasksRequest = (id) => my_axios.delete(`/task/${id}`)
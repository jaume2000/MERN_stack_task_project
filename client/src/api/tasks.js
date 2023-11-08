import my_axios from './axios.js'

export const getTasksRequest = () => my_axios.get(`/tasks`)
export const getTaskRequest = (id) => my_axios.post(`/tasks/${id}`)
export const createTaskRequest = (task) => my_axios.post(`/tasks`, task)
export const updateTaskRequest = (task) => my_axios.put(`/task/${task._id}`, task)
export const deleteTasksRequest = (id) => my_axios.delete(`/task/${id}`)
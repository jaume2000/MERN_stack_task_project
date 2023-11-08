import User from '../models/user.model.js'
import Task from '../models/task.model.js'

export const getTasks = async (req,res) => {
    const tasks = await Task.find({
        user: req.user.id
    }).populate("user")   //el populate indica que busquemos el documento al que hace referencia
    // este object id e insertemos los datos ahí directamente.
    console.log(tasks)
    res.json(tasks)
}

export const createTask = async (req,res) => {
    const {title, description, date} = req.body
    const newTask = new Task({
        title,
        description,
        date,
        user: req.user.id
    })
    const savedTask = await newTask.save()
    res.send(savedTask)
    
}

export const getTask = async (req,res) => {
    const task = await Task.findById(req.params.id).populate("user")
    if (!task){return res.status(404).json({message: "Task not found"})}
    res.json(task)
}

export const deleteTask = async (req,res) => {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task){return res.status(404).json({message: "Task not found"})}
    return res.status(204).end()
}

export const updateTask = async (req,res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        // En vez de devolvernos el dato antes de actualizar, queremos el nuevo.
        new: true
    })
    if (!task){return res.status(404).json({message: "Task not found"})}
    res.json(task)
}


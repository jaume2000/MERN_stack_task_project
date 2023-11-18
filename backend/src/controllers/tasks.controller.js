import User from '../models/user.model.js'
import Task from '../models/task.model.js'

export const getTasks = async (req,res) => {
    try{
        const tasks = await Task.find({
            user: req.user.id
        }).populate("user")   //el populate indica que busquemos el documento al que hace referencia
        // este object id e insertemos los datos ahí directamente.

        res.json(tasks)
    }
    catch(err){
        res.status(500).json(["Something went wrong!"])
    }
}

export const createTask = async (req,res) => {
    try{
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
    catch(err){
        res.status(404).json(["Task not found"])
    }
}

export const getTask = async (req,res) => {
    try{
        const task = await Task.findById(req.params.id).populate("user")
        if (!task){return res.status(404).json({message: "Task not found"})}
        res.json(task)
    }
    catch(err){
        res.status(404).json(["Task not found"])
    }
}

export const deleteTask = async (req,res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task){return res.status(404).json({message: "Task not found"})}
        return res.status(204).end()
    }
    catch(err){
        res.status(404).json(["Task not found"])
    }
}

export const updateTask = async (req,res) => {
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            // En vez de devolvernos el dato antes de actualizar, queremos el nuevo.
            new: true
        })
        if (!task){return res.status(404).json({message: "Task not found"})}
        res.json(task)
    }
    catch(err){
        res.status(404).json(["Task not found"])
    }
}


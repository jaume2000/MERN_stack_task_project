import mongoose from 'mongoose'

export const connectDB = async () =>{
    mongoose.connect('mongodb://localhost/merndb')
    .then(_=>{console.log(">>> DB connected")})
    .catch(e=>console.log(e))
}
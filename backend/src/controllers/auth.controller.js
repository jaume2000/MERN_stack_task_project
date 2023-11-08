import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import {createAccessToken} from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const register = async (req,res) => {
    const {username, password, email} = req.body
    
    
    try{

        //Validación del usuario: Ver si ya estaba registrado. Recuerda: en este caso es el email el que debe ser único, no el username.
        const userFound  = await User.findOne({email})
        if(userFound){
            res.status(400).json(["The email already exists"])
            return;
        }

        const passwordHash = await bcrypt.hash(password, 10)
    
        const newUser = new User({
            username,
            email,
            password: passwordHash
        })

        const userSaved = await newUser.save()

        //Esta función la hemos creado nosotros con un callback para que sea asíncrono. El token durará 1 día.
        const token = await createAccessToken({id: userSaved.id})

        //Creamos una cookie de sesión con este token que aparecerá en los headers de la respuesta
        res.cookie('token', token)
        
        res.json({
            id: userSaved.id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        })
    }
    catch(err){
        console.log(err)
        res.status(500).send({message: err.message})
    }
}
export const login = async (req,res) => {
    const {email, password} = req.body
    
    try {
        const userFound = await User.findOne({email})

        if(!userFound){
            return res.status(400).json(["User not found"])
        }

        const isMatch = await bcrypt.compare(password, userFound.password)

        if (!isMatch){
            return res.status(400).json(["Incorrect password"])
        }
  

        //Esta función la hemos creado nosotros con un callback para que sea asíncrono. El token durará 1 día.
        const token = await createAccessToken({id: userFound.id})

        //Creamos una cookie de sesión con este token que aparecerá en los headers de la respuesta
        res.cookie('token', token)
        
        res.json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
    }
    catch(err){
        console.log(err)
        res.status(500).send({message: err.message})
    }
}


export const logout = async (req,res) => {
    //Enviamos una cookie con un token vacío
    res.cookie('token', "", {
        expires: new Date(0)
    })

    return res.send(200)
}

//Este método le servirá al front para saber si la cookie es valida.
export const verifyToken = async (req,res) => {
    const {token} = req.cookies
    if (!token) return res.status(401).json(["Unauthorized"])

    jwt.verify(token, TOKEN_SECRET, async (err, user) =>{
        if(err) return res.status(401).json(["Unauthorized"])

        const userFound = await User.findById(user.id)
        if(!userFound) return res.status(401).json(["Unauthorized"])

        return res.json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
    })
}

//Ruta protegida por el login!
export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if (!userFound) return res.status(400).json({message: "User not found"})
    res.json({
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt

    })
}
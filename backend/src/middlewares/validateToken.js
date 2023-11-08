import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js'

export const authRequired = (req, res, next) => {

    const token = req.cookies.token

    //Tenemos un token?
    if(!token){
        return res.status(401).json({message: "No token, authorization denied"})
    }

    // ¿Es un token valido que hayamos registrado nosotros antes?
    // Piensa que en la cookie que guarda el usuario esta la ID del usuario de mongoDB
    jwt.verify(token, TOKEN_SECRET, (err, user) =>{
        if (err) return res.status(403).json({message: "Invalid token"})

        //Tenemos el usuario extraido y verificado, asignemoslo para usarlo en la siguiente ruta!
        req.user = user

        //Llamamos a la siguiente ruta
        next()
    })

}
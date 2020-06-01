import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import bcrypt from 'bcryptjs'

import pool from '../database'
import { UserI } from '../models/user'

class AuthController {

    static logIn = async (req: Request, res:Response)=>{
        const {username, password} = req.body //requiero username y password desde el front
        // comprobar si existe
        if(!(username && password)){
            return res.status(400).json({message: 'Todos los campos son requeridos'})
        }
        
        //busco el usuario por username y lo guardo en una constante para luego usarla al crear token
        let user = await pool.query('SELECT * FROM users WHERE username = ?', [username])

        //comprobacion si existe el usuario
        if (!(user.length > 0)){
            return res.status(400).json({message: 'Usuario inexistente'})
        }

        // check pass
        //compara el password del front con el que recibimos de la base de datos, si coincide devuelve true sino false
        if ((bcrypt.compareSync(password, user[0].password)) == false) {
            return res.status(400).json({message: 'Contraseña incorrecta'})
        }

        //token
        const token = jwt.sign({userId: user[0].id}, config.jwtSecret, {expiresIn: '1h'})
        res.json({message: 'logeado', token}) // devuelve el token por consola
    }

    static register = async(req: Request, res: Response)=>{
        const {username, password, email} = req.body  //requiero username, password y email desde el front
        //comprobar si existe
        if(!(username && password && email)){
            return res.status(400).json({message: 'datos incorrectos'})
        }
        // instancio un nuevo user con el modelo UserI y relleno con los valores recibidos por el req.body
        const user = new UserI()
        user.username = username
        user.password = password
        user.email = email
        
        // HACER HASH
        try{
            user.hashPassword()  // usa el metodo hash desde la entity user
            await pool.query('INSERT INTO users set ?', user)  // se le pasa user para que lo guarde en la base de datos
        }
        catch (e){
            return res.status(400).json({message: 'error de hash'})
        }
        
        //token
        const token = jwt.sign({userId: user.id}, config.jwtSecret, {expiresIn: '1h'})

        res.status(200).json({msg: 'registrado', token}) // devuelve el token al front por consola
    }

}
export default AuthController
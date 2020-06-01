import {UserI} from '../models/user'
import {Request, Response} from 'express'
import config from '../config/config'
import jwt from 'jsonwebtoken'

import pool from '../database'

class UsersController {

    public async listUsers(req: Request, res:Response){
        const users = await pool.query('SELECT * FROM users')
        res.json(users)
    }

    public async listOneUser(req:Request, res:Response){
        const {id} = req.params
        const user = await pool.query('SELECT * FROM users WHERE id = ?', [id])
        if(user.length > 0){
            return res.json(user[0])
        }
        res.status(404).json({text: 'Usuario inexistente'})
    }

    public async createUser(req:Request, res:Response){
        const {username, password, email} = req.body
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
        
        //all ok
        res.send('CREATED USER')
    }

    public updateUser(req:Request, res:Response){
        const {id} = req.params
        pool.query('UPDATE users set ? WHERE id = ?', [req.body, id])
        res.json({message: 'Usuario actualizado'})
    }

    public deleteUser(req:Request, res:Response){
        const {id} = req.params
        pool.query('DELETE FROM users WHERE id = ?', [id])
        res.json({message: 'Usuario eliminado'})
    }

    // funcion para verificar token
    public verifyToken(req:any, res:any, next:any) {
        if (!req.headers.authorization){
            return res.status(401).json({msg: 'No hay token'})
        }
        let token = req.headers.authorization
        let jwtPayload
    
        try{
            jwtPayload = <any>jwt.verify(token, config.jwtSecret)   // metodo verify, le pasamos el token y el secret
            req.userId = jwtPayload.userId
        }
        catch(e){
            return res.status(401).json({msg: 'No autorizado'})
        }
    
   
        // call next
        next() // si todo fue bien llama a la funcion siguiente que lo indicamos en la ruta users
    }

}
const usersController = new UsersController()
export default usersController
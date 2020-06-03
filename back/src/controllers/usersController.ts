import {UserI} from '../models/user'
import {Request, Response} from 'express'
import config from '../config/config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

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
            return res.status(400).json({message: 'Datos incorrectos'})
        }
        // instancio un nuevo user con el modelo UserI y relleno con los valores recibidos por el req.body
        const user = new UserI()
        user.username = username
        user.password = password
        user.email = email

        // HASH
        try{
            user.hashPassword()  // usa el metodo hash desde la entity user
            await pool.query('INSERT INTO users set ?', user)  // se le pasa user para que lo guarde en la base de datos
        }
        catch (e){
            return res.status(400).json({message: 'Error de hash'})
        }
        
        //all ok
        res.send('Usuario creado')
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
            res.locals.jwtPayload = jwtPayload.userId
        }
        catch(e){
            return res.status(401).json({msg: 'No autorizado'})
        }
    
   
        // call next
        next() // si todo fue bien llama a la funcion siguiente que lo indicamos en la ruta users
    }

    public changePassword = async(req:Request, res:Response) => {
        const userId = res.locals.jwtPayload  //requiere el payload creado desde el verifytoken
        const {oldPassword, newPassword} = req.body  //requiere los datos del front
        
        //comprobaciones
        if(!(oldPassword && newPassword)) {
            res.status(400).json({message: 'Los campos son requeridos'})
        }
        
        //trata de buscar en la base de datos el usuario segun el userId y lo almacena en user
        let user = await pool.query('SELECT * FROM users WHERE id = ?', [userId])
        
        // check pass
        //compara el password del front con el que recibimos de la base de datos, si coincide devuelve true sino false
        if ((bcrypt.compareSync(oldPassword, user[0].password)) == false) {
            return res.status(400).json({message: 'Chequea la vieja contraseña'})
        }
        user[0].password = newPassword
        
        // HASH
        try{
            const salt = bcrypt.genSaltSync(10)  // genera el salt
            user[0].password = bcrypt.hashSync(user[0].password, salt)   // le pasa el password del front y el salt generado
            await pool.query('UPDATE users set ? WHERE id = ?', [user[0], userId])
        }
        catch (e){
            return res.status(400).json({message: 'error de hash'})
        }
        
        res.json({message: 'Contraseña cambiada exitosamente'})
    }
}
const usersController = new UsersController()
export default usersController
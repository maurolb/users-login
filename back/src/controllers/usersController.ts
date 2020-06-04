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

    public updateUser= async(req:Request, res:Response)=>{
        const {id} = req.params
        const {oldPassword, newPassword, username, email} = req.body  //requiere los datos del front
        
        //busca en la base de datos el usuario segun id
        let user = await pool.query('SELECT * FROM users WHERE id = ?', [id])
        const normalPass = user[0].password  // para usarlo mas despues

        //compara el password del front con el recibido de la base de datos, si coincide devuelve true sino false
        if ((bcrypt.compareSync(oldPassword, user[0].password)) == false) {
            return res.status(400).json({message: 'Contraseña incorrecta'})
        }
        //seteo los valores del usuario obtenido segun id con los campos que me llegan desde el front
        user[0].username = username
        user[0].email = email

        //comprobacion, si tengo lleno el campo de nueva contraseña desde el front me crea un nuevo hash, sino setea el pass con la variable normalPasss
        if (newPassword == null){
            user[0].password = normalPass
        }else{
            user[0].password = newPassword
            // HASH
            const salt = bcrypt.genSaltSync(10)  // genera el salt
            user[0].password = bcrypt.hashSync(user[0].password, salt)   // le pasa el password del front y el salt generado
        }
        try{
            await pool.query('UPDATE users set ? WHERE id = ?', [user[0], id])  //guarda el nuevo usuario modificado en la base de datos
        }
        catch (e){
            return res.status(400).json({message: 'Error de al updatear '})
        }
        
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

}
const usersController = new UsersController()
export default usersController
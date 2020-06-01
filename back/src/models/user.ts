import * as bcrypt from 'bcryptjs'

export class UserI {
    
    id:number
    username: string
    password: string
    email: string
    created_at: Date

    hashPassword():void {   // cuando este creando un usuario se realiza el hash
        const salt = bcrypt.genSaltSync(10)  // genera el salt
        this.password = bcrypt.hashSync(this.password, salt)   // le pasa el password del front y el salt generado
    }


    checkPassword(password:any):boolean {  // cuando se intenta logear recibe un password desde el front como parametro
        return bcrypt.compareSync(password, this.password) //compara ese password con el que recibimos de la base de datos, si coincide devuelve true sino false
    }
}
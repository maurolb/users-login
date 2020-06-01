import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import usersRoutes from './routes/usersRoutes'
import authRoutes from './routes/authRoutes'

const app  = express()

//middlewares
app.set('port', process.env.PORT || 7000)
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes
app.use('/users', usersRoutes)
app.use('/auth', authRoutes)

//start
app.listen(app.get('port'), () =>{
    console.log('Server on por', app.get('port'))
})


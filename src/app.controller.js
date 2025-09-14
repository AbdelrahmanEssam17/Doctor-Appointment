import connectDB from "./db/connection.js"
import authController from './modules/auth/auth.controller.js'
import doctorcontroller from './modules/doctor/doctor.controller.js'
import appointment from './modules/appointment/appointment.controller.js'
import {globalErrorHandleing} from './utils/response/error.response.js'
const bootstarb=(app,express)=>{
     app.use(express.json())
     app.get('/',(req,res,next)=>res.send('hello world'))
     app.use('/auth',authController)
     app.use('/doctors', doctorcontroller);
     app.use('/appointments', appointment);

     app.all('*',(req,res,next)=>{
        return res.status(404).json("invalid routing")

     }
    )
    app.use(globalErrorHandleing)
    connectDB()
}
export default bootstarb
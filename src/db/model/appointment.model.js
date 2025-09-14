import mongoose from 'mongoose';
const { Schema, model, models }=mongoose;
const appointmentSchema =new Schema({
  patient:{
    type:Schema.Types.ObjectId,
    ref:'Patient',
    required:true,
  },
  doctor:{
    type:Schema.Types.ObjectId,
    ref:'Doctor', 
    required:true,
  },
  appointmentDate:{
    type:Date,
    required:true,
  },
  reason:{
    type:String,
    trim:true,
    maxlength:200,
  },
  status:{
    type:String,
    enum:['pending','confirmed','completed','cancelled'],
    default:'pending',
  },
  notes:{
    type:String,
    trim:true,
  },
},{timestamps:true});
const Appointment=models.Appointment||model('Appointment',appointmentSchema);
export default Appointment;

import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;
export const roleType={user:'user',admin:'admin'}
const patientSchema=new Schema({
    username:{
        type:String,
        required:true,
        minlength:3,
        maxlength:40,
        trim:true

    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
          minlength:6,  
        maxlength:1000,
    },
    phone:Number,
    DOB:Date,
    image:String,
    gender:{
        type:String,
        enum:["male","female"],
        default:'male',
    },
    roleType:{
        type:String,
        enum:Object.values(roleType),
        default:roleType.user
    }
},{timestamps:true})
const patientModel = mongoose.models.Patient || model('Patient', patientSchema);
export default patientModel;
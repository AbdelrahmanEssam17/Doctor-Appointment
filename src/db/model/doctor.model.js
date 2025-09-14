import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const doctorSchema=new Schema({
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
        maxlength:40,
    },
    phone:Number,
    DOB:Date,
    image:String,
    gender:{
        type:String,
        enum:["male","female"],
        default:'male',
    },
    specialization:{
        type:String,
        required:true,
         trim: true,
    },
      yearsofExperience:{
    type:Number,
    
      }
},{timestamps:true})
const doctorModel = mongoose.models.Doctor || model('Doctor', doctorSchema);
export default doctorModel;
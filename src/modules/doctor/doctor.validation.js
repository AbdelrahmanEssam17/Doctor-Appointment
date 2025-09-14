import joi from 'joi'
import { generalField } from './../../middleware/validation.middleware.js';
//import { addDoctor } from './service/doctor.service';
export const addDoctor=joi.object().keys({
username:generalField.username.required(),
email:generalField.email.required(),
password:generalField.password.required(),
specialization: joi.string().min(2).max(50).required()
}
).required()


export const updatedoctor=joi.object().keys({
username:generalField.username.required(),
email:generalField.email.required(),
password:generalField.password.required(),
specialization: joi.string().min(2).max(50).required()
}
).required().unknown(true);
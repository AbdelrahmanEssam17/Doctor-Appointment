import joi from 'joi'
import { generalField } from './../../middleware/validation.middleware.js';
export const signup=joi.object().keys({
username:generalField.username.required(),
email:generalField.email.required(),
password:generalField.password.required(),
confirmationPassword:generalField.confirmationPassword.valid(joi.ref('password')).required()
}
).required()

export const login =joi.object().keys({
email:generalField.email.required(),
password:generalField.password.required()
}).required()
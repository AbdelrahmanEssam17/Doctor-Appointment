import joi from 'joi';
export const generalField={
    username:joi.string().min(3).max(40).trim(),
    email:joi.string().email({tlds:{allow:['com','net']},minDomainSegments:2,maxDomainSegments:3}),
    password:joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)),
    confirmationPassword:joi.string()
}




export const validation=(schema)=>{
    return (req,res,next)=>{
        const inputData={...req.body,...req.params,...req.query}
        const validationResult=schema.validate(inputData,{abortEarly:false})
        if(validationResult.error){
            return res.status(400).json({message:"validation error",details:validationResult.error.details})
        }
        return next()
    }
}
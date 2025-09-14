   import jwt from "jsonwebtoken";
import patientModel from "../../../db/model/patient.model.js";
    import { asynchandler } from "../../../utils/response/error.response.js";
    import { successResponce } from "../../../utils/response/success.response.js";
    import { compareHash, generateHash } from "../../../utils/security/hash.security.js";
    import { generateToken } from "../../../utils/security/security.token.js";
    import { roleType } from './../../../db/model/patient.model.js';
import { verifyToken } from "../../../utils/security/security.token.js";

    // export const singup=asynchandler(
    // async (req,res,next)=>{
    //     const {username,password,email}=req.body
    //         if(await patientModel.findOne({email})){
    //             return next(new Error("email exist",{cause:409}))
    //         }
    //     const hashPassword = generateHash({ plainText: password });
    // await patientModel.create({ username, email, password: hashPassword });
    //     return successResponce({res,status:201,data:{patient}})
            
    //     }
    // )   
    export const singup = asynchandler(
  async (req,res,next)=>{
      const {username,password,email}=req.body
      if(await patientModel.findOne({email})){
          return next(new Error("email exist",{cause:409}))
      }

      const hashPassword = generateHash({ plainText: password });

      // assign the created doc to patient
      const patient = await patientModel.create({
        username,
        email,
        password: hashPassword
      });

      return successResponce({res,status:201,data:{patient}})
  }
)
    export const login =asynchandler(
        async(req,res,next)=>{
            const {email,password} =req.body
        const patient = await patientModel.findOne({ email });
    if (!patient) throw new Error("User not found");

    const isMatch = compareHash({ plainText: password, hashValue: patient.password });
    if (!isMatch) throw new Error("Invalid password");
            const accessToken=generateToken({payload:{id:patient._id},signature:patient.role===roleType.admin?process.env.SYSTEM_ACCESS_TOKEN :process.env.USER_ACCESS_TOKEN})
                const refreshToken=generateToken({payload:{id:patient._id},signature:patient.role===roleType.admin?process.env.SYSTEM_REFRESH_TOKEN :process.env.USER_ACCESS_TOKEN,expiresIn:31430000})
            return successResponce({res,status:201,data:{token:{accessToken,refreshToken}}})

        }
    ) 
   export const refreshToken=asynchandler(async(req,res,next)=>{
        const {authorization }=req.headers
        const [bearer,token]=authorization.split(" ")
        if(!bearer ||!token){
            return next(new Error("auth is required",{cause:401}))
        }
        let signature=""
        switch(bearer){
            case'system':
            signature=process.env.SYSTEM_REFRESH_TOKEN
            break; 
            case'Bearer':
            signature=process.env.USER_REFRESH_TOKEN
            break;
            default:
                break;
        }
        const decoded=verifyToken({token,signature})
        if(!decoded?.id){
            return next(new Error("invalide token",{cause:401}))
        }
        const patient=await patientModel.findById({_id:decoded.id,isDelated:false})
        if(!patient){
            return next(new Error("invalide token",{cause:401}))
        }
       const accessToken=generateToken({payload:{id:patient._id},signature:patient.role===roleType.admin?process.env.SYSTEM_ACCESS_TOKEN :process.env.USER_ACCESS_TOKEN})
                const refreshToken=generateToken({payload:{id:patient._id},signature:patient.role===roleType.admin?process.env.SYSTEM_REFRESH_TOKEN :process.env.USER_ACCESS_TOKEN,expiresIn:31430000})
            return successResponce({res,status:201,data:{token:{accessToken,refreshToken}}})
  
    })
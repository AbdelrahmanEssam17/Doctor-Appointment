
import doctorModel from '../../../db/model/doctor.model.js';
import { asynchandler } from '../../../utils/response/error.response.js'
 import { successResponce } from "../../../utils/response/success.response.js";
export const addDoctor = asynchandler(async(req,res,next)=>{
  const doctor = new doctorModel(req.body);
  await doctor.save();
  res.status(201).json({
    message: "Doctor added successfully",
    doctor
  });
});
export const getSingleDoctor =asynchandler(async(req,res,next)=>{
   const doctor=await doctorModel.findById(req.params.id)
if(!doctor){
    return next(new Error("doctor not found",{cause:404}))
}
 return successResponce({res,status:200,data:{doctor}})

})

export const getalldoctor = asynchandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const doctors = await doctorModel.find().skip(skip).limit(limit);
  const totalDocs = await doctorModel.countDocuments();
  return successResponce({
    res,
    status: 200,
    data: {
      doctors,
      pagination: { totalDocs, totalPages: Math.ceil(totalDocs / limit), currentPage: page, pageSize: limit }
    }
  });
});


export const updatedoctor=asynchandler(async(req,res,next)=>{
    const updatedoctr =await doctorModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )

    if(!updatedoctr){
        return next(new Error("doctor not found",{cause:404}))
    }
        return successResponce({res,status:200,data:{updatedoctr}})
})


export const deletedoctor = asynchandler(async (req, res, next) => {
  const deletedDoctor = await doctorModel.findByIdAndDelete(req.params.id);

  if (!deletedDoctor) {
    const error = new Error("Doctor not found");
    error.status = 404;
    return next(error);
  }

  return successResponce({
    res,
    status: 200,
    data: { deletedDoctor },
    message: "Doctor deleted successfully"
  });
});


export const searchDoctor = asynchandler(async (req, res, next) => {
  const { name, specialization, city } = req.query;

  // Build dynamic search filter
  const filter = {};
  if (name) filter.name = { $regex: name, $options: "i" }; // case-insensitive
  if (specialization) filter.specialization = { $regex: specialization, $options: "i" };
  if (city) filter.city = { $regex: city, $options: "i" };

  const doctors = await doctorModel.find(filter);

  if (!doctors.length) {
    return res.status(404).json({ message: "No doctors found" });
  }

  return successResponce({
    res,
    status: 200,
    data: { doctors },
    message: "Doctors retrieved successfully",
  });
});
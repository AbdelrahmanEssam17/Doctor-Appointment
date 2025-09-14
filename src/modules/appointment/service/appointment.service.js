// import appointmentModel from '../../../db/model/appointment.model.js'
    import { asynchandler } from "../../../utils/response/error.response.js";
    import { successResponce } from "../../../utils/response/success.response.js";
    import Appointment from './../../../db/model/appointment.model.js';



export const addAppointment = asynchandler(async (req, res, next) => {
  const { patient, doctor, appointmentDate, reason, notes } = req.body;

  if (!patient || !doctor || !appointmentDate) {
    return res.status(400).json({
      message: "patient, doctor, and appointmentDate are required"
    });
  }

  const existing = await Appointment.findOne({ doctor, appointmentDate });
  if (existing) {
    return res.status(400).json({
      message: "Doctor is already booked at this time"
    });
  }
  const appointment = new Appointment({
    patient,
    doctor,
    appointmentDate,
    reason,
    notes
  });
  await appointment.save();
  res.status(201).json({
    message: "Appointment added successfully",
    appointment
  });
});

export const bookAppointment = asynchandler(async (req, res, next) => {
  const appointment = new Appointment({
    appointmentDate: req.body.appointmentDate,
    doctor: req.params.id,     // doctor comes from URL
    patient: req.body.patient, // still required in body
    reason: req.body.reason
  });

  await appointment.save();

  return successResponce({
    res,
    status: 201,
    data: { appointment },
    message: "Appointment booked successfully"
  });
});

export const getAllAppointments = asynchandler(async (req, res, next) => {
  const appointments = await Appointment.find()
    .populate("doctor", "username specialization email") // matches schema field & ref
    .populate("patient", "username email");             // matches schema field & ref

  return successResponce({
    res,
    status: 200,
    data: appointments,
  });
});



export const deleteAppointment = asynchandler(async (req, res, next) => {
  const deleted = await Appointment.findByIdAndDelete(req.params.id);

  if (!deleted) {
    return next(new Error("Appointment not found", { cause: 404 }));
  }

  return successResponce({
    res,
    status: 200,
    data: { deleted },
    message: "Appointment deleted successfully",
  });
});

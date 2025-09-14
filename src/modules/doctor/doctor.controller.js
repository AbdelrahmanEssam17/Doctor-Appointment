
import { Router } from "express";
import * as doctorservice from './service/doctor.service.js'
import { validation } from "../../middleware/validation.middleware.js";


import * as validators from './doctor.validation.js'
const router=Router()
router.post('/adddoctor',validation(validators.addDoctor),doctorservice.addDoctor)
router.get('/getdoctor/:id',doctorservice.getSingleDoctor)
router.get('/getalldoctor',doctorservice.getalldoctor)
router.patch('/updatedoctor/:id',validation(validators.updatedoctor),doctorservice.updatedoctor)
router.delete('/deletedoctor/:id',doctorservice.deletedoctor)
router.get('/search', doctorservice.searchDoctor);
export default router




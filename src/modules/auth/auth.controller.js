import { Router } from "express";
import * as registarationService from './service/registration.service.js'
import { validation } from "../../middleware/validation.middleware.js";
import * as validators from './auth.validation.js'
const router =Router()
router.post('/signup',validation(validators.signup),registarationService.singup)
router.post('/login',validation(validators.login),registarationService.login)
router.get('/refresh-token',registarationService.refreshToken)
export default router
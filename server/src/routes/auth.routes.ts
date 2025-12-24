import { Router } from 'express';
import { logInUser, registerUser, updateUser } from '../contollers/auth.controller'

const router = Router();

router.post('/register',registerUser)
router.post("/login",logInUser)


export default  router
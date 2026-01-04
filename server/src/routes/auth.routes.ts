import { Router } from 'express';
import { logInUser, registerUser, updateUser } from '../contollers/auth.controller'
import authMiddleware from '../middleware/auth.middleware';
import User from '../models/user.model';
const router = Router();

router.post('/register',registerUser)
router.post("/login",logInUser)
router.get("/users", authMiddleware, async (req, res) => {
  
    console.log('called all user route')
    const users = await User.find({}, "_id name email");
  res.json(users);
});



export default  router
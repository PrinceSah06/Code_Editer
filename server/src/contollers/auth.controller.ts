import User from "../models/user.model";
import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import asyncHandler from "../utils/asynicHandler";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "something Wronge inside Register controller");
    }

    const checkUser = await User.findOne({ email });

    if (checkUser) {
      throw new ApiError(403, "Alredy registered user ");
    }
    const user = await User.create({ email, password });

    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }
    const token = user.genrateAuthToken();

    if (!token) {
      throw new ApiError(401, "something went Wronge while creating token");
    }

    res.status(201).json({
      token,
      success: true,
      message: "User register successFully",
    });
  }
);

export const logInUser = asyncHandler(async (req:Request, res:Response)=>{

  const {email , password} = req.body;
  
  if(!email || !password ){
    throw new ApiError(400, 'Please provide both email and password')
  }

 const user = await User.findOne({email});

 if(!user){
  throw new ApiError(404,'User  not found ')
 }

  const isMatch =  await user.comparePassword(password);

  console.log('comparing Password first : ',isMatch );
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = user.genrateAuthToken();

  res.status(201).json({
    message:'User is authorized ',
    success:true,
    token
  })
} );

export const updateUser = asyncHandler(async (req: any, res: Response) => {
  // 1. Get data from the body
  const { username, bio } = req.body;

  // 2. We use the ID from the token (req.user was set by authMiddleware)
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // 3. Update only what was sent
  // if (username) user.username = username;
  // if (bio) user?.bio = bio;

  // 4. Save to DB
  await user.save();

  res.status(200).json({
    success: true,
    message: "Updated successfully"
  });
});
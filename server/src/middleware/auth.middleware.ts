import { Request,Response,NextFunction } from "express";
import  jwt  from "jsonwebtoken";
import { ApiError
 } from "../utils/ApiError";
 import asyncHandler
  from "../utils/asynicHandler";
  import User from "../models/user.model";
  

  const authMiddleware = asyncHandler(async(req:Request,res:Response,next :NextFunction)=>{
console.log("Auth Middleware Invoked");
    const token =req.header('Authorization')?.replace("Bearer ","");
    if(!token){ 
        throw new ApiError(401,'Unauthorized request ')
    }

try {
    console.log("Verifying token:", token);
    console.log("JWT Secret:", process.env.JWT_SECRET);
    const decoded : any  = jwt.verify(token, process.env.JWT_SECRET as string)

console.log("Token decoded:", decoded);
    const user = await User.findOne({email:decoded?.email})

console.log("User found:", user);
    if(!user){
        console.log("User not found for token:", token);
        throw new ApiError(401,'Invalid token')
    }
    (req as any).user = user
    console.log('User authenticated :',user.email)
    next()

} catch (error) {
    throw new ApiError(401,'Invalid Access Token')
    
}
  });
  export default authMiddleware
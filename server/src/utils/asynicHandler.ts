import { NextFunction } from "express"

 const asyncHandler = (fn:any ) =>{
    return(req:Response,res:Response,next:NextFunction)=>{
        Promise.resolve(fn(req,res,next)).catch((err)=>next(err))
    }

 }

 export default asyncHandler
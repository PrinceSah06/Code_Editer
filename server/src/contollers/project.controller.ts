// import { Router } from "express";
import { Project } from "../models/project.model";
import asyncHandler from "../utils/asynicHandler";
import { ApiError } from "../utils/ApiError";
import { Request, Response } from "express";





const createProject = asyncHandler(async(req:Request , res:Response)=>{
 
    const {language,code,name} = req.body;
    const owners = req.user?._id

    if(!owners || !name){
        throw new ApiError(400,'Please provide all required fields');
    }

    const project = await Project.create({language,code,name,owners:[owners]})

    if(!project){
        throw new ApiError(500,'failed to create project');
    }
    res.status(201).json({
        success:true,
        message:'Project created successfully',
        project
    })
});



const getAllProjects= asyncHandler(async (req:Request,res:Response)=>{
   if (!req.user) throw new ApiError(401, "Unauthorized");

    const userId = req.user._id;
    if(!userId){
        throw new ApiError(400,'User not found');}    
        const projects = await Project.find({owners:userId});
        
        
        if(!projects){
            throw new ApiError(404,'No projects found for  this user');

        }

        res.status(200).json({
            success:true,
            message:'Projects fetched successfully',
            projects
        });
     } )



     const getOneProject = asyncHandler(async (req:Request , res:Response)=>{
       if (!req.user) throw new ApiError(401, "Unauthorized");
  const userId = req.user?._id;
        const projectId = req.params.projectId;

        if(!projectId ||!userId){
            throw new ApiError(400,'Please provide projectId');
        }
        const project = await Project.findOne({
            _id:projectId,
            owners:userId
        });
        if(!project){
            throw new ApiError(404,'Project not found');

        }

        res.status(200).json({
            success:true,
            message:'Project fetched successfully',
            project
        })
     })



     const updateUserInfo = asyncHandler (async (req:Request , res:Response)=>{
        const projectId = req.params.projectId

        let allowedFields = ['name','language','code'];

        const  updatedFields :any={};


        
        for(let fields of allowedFields){
            if(req.body[fields]!==undefined){
                updatedFields[fields]=req.body[fields]
            }
        }

        const project = await Project.findByIdAndUpdate(
    projectId,{$set:updatedFields},{new:true}
        )



        res.status(200).json({
            success:true,
            message:'Project updated successfully',
            project
        })

     })
const AddNewUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.body;
    const currentUserId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const project = await Project.findOne({
      _id: projectId,
      owners: { $in: [currentUserId] }, // ✅ FIX
    });

    if (!project) {
      return res.status(403).json({ message: "Access denied" });
    }

    const alreadyAdded = project.owners.some(
      (id) => id.toString() === userId
    );

    if (alreadyAdded) {
      return res.status(400).json({ message: "User already added" });
    }

    project.owners.push(userId);
    await project.save();

    res.json({ success: true, message: "User added to project" ,project});

  } catch (error:any) {
    console.error("AddNewUser crash:", error);
    res.status(500).json({
      success: false,
      message: error.message, // TEMP: show real error
    });
  }
});


     export {createProject,getAllProjects
        ,getOneProject,updateUserInfo ,AddNewUser
     }
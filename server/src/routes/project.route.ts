import { Router } from "express";
import {
  createProject,
  getAllProjects,
  getOneProject,
} from "../contollers/project.controller";
import  authMiddleware from "../middleware/auth.middleware";

const router = Router();

// Create a new project
router.post("/", authMiddleware, createProject);

// Get all projects of logged-in user
router.get("/", authMiddleware, getAllProjects);

// Get a single project by ID
router.get("/:projectId", authMiddleware, getOneProject);

export default router;

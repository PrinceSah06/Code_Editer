import { Server, Socket } from "socket.io";
import http from "http";
import { Project } from "../models/project.model";

export   const initSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // ✅ FIXED
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("✅ New socket connected:", socket.id);

    socket.on("join-project", async ({ projectId }) => {
      console.log(`this is project id inside socket : ${projectId}`)
     
     
        socket.join(projectId);
    
      
      console.log(`Socket ${socket.id} joined project ${projectId}`);

    const project = await Project.findOne({_id:projectId})
    console.log(`code from server inside socekt : ${project}`)

    if(project){
        socket.emit('sync-code',project.code)
    }






      socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
    });
    },)

    });


  
  

  return io;
};

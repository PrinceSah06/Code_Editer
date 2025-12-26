import React from 'react'
import { useNavigate } from 'react-router-dom'


type ProjectListProps ={
    list:Array<{
        _id:string
        ,name:string}>
}
const ProjectList = ({list}:ProjectListProps) => {
const navigate = useNavigate();


const handleProjectClick=(projectId:string)=>{
  //navigate to code editor page with projectId
  navigate(`/editer/${projectId}`);
}

  return (
    <div>
        {list.map((project)=>{
            return(
            <div 
            onClick={()=> handleProjectClick(project._id)}
            key={project._id} 
            className='border p-4 m-2 rounded-lg hover:bg-gray-200 cursor-pointer'>
                {project.name}
            </div>  
            )
        })}
      
    </div>
  )
}

export default ProjectList

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
const EditName=()=>{
 console.log('dubble clicked')
}

return (
  <div className="space-y-3">
    {list.map((project) => (
      <div onDoubleClick={EditName}
        key={project._id}
        onClick={() => handleProjectClick(project._id)}
        className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3
                   shadow-sm transition hover:shadow-md hover:bg-gray-50 cursor-pointer"
      >
        <span className="text-sm font-medium text-gray-800">
          {project.name}
        </span>

        <span className="text-xs text-gray-400">
          Open →
        </span>
      </div>
    ))}
  </div>
);

}

export default ProjectList

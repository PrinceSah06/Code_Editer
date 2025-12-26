import React from 'react'
import api from '../api/axios'

type CreateNewProjectProps={
onClose: () => void
settinhList?: React.Dispatch<React.SetStateAction<Array<{id:string,name:string}>>>
}

const CreateNewProject = ({onClose,settinhList }:CreateNewProjectProps) => {
const [projectName,setProjectName]=React.useState('')

const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
  setProjectName(e.target.value)
}
const CreateNewProjectName=(e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

console.log(" while clicking in  creatProject Name:",projectName);
//call api to create new project
api.post('/projects',{
    name:projectName,

}).then((response)=>{
    console.log("Project created successfully:",response.data);
    settinhList && settinhList((prev)=>[...prev,{id:response.data.project._id,name:response.data.project.name}])
}).catch((error)=>{
    console.error("Error creating project:",error);
});
console.log("Creating project:",projectName)
onClose();


}


  return (
<form onSubmit={(e)=>CreateNewProjectName(e) }
 className='bg-black w-screen h-screen flex justify-center items-center'>
         <div className='  rounded-xl bg-gray-400 p-4 m-2 h-100 w-1/5 flex flex-col justify-center items-start'>
        <h1 className='  text-blue-50 font-bold text-lg  pb-2'>Create New  Project</h1>
   
            <input className='p-1  w-88 text-black rounded-xl '
            value={projectName}
            onChange={(e)=>handleChange(e)}
            id='projectName' 
            type="text" 
            placeholder='Enter Your Project Name'/>
        <button  type="submit"
        className=' border mt-2 border-white p-2 rounded-lg'>Create Project</button>
     
</div> </form>

  )
}

export default CreateNewProject

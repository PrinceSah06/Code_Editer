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
  <form
    onSubmit={CreateNewProjectName}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
  >
    <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">

      <h1 className="text-lg font-semibold text-gray-800 mb-4">
        Create New Project
      </h1>

      <input
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={projectName}
        onChange={handleChange}
        id="projectName"
        type="text"
        placeholder="Enter project name"
        required
      />

      <div className="mt-4 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white
                     hover:bg-blue-700 transition"
        >
          Create
        </button>
      </div>
    </div>
  </form>
);

}

export default CreateNewProject

import React, { useEffect } from 'react'
import CreateNewProject from '../componets/CreateNewProject'
import ProjectList from '../componets/PorjectList';
import api from '../api/axios';
const Home = () => {
  const [showCreateProject,setShowCreateProject]=React.useState(false);
// const[hideBtn ,setHideBtn]=React.useState(true);
const [list ,setList ]=React.useState<Array<{id:string,name:string}>>([]);



useEffect(  ()=>{

     const res =  api.get('/projects')
      .then((response)=>{
    console.log(response.data.projects);
     return   setList(response.data.projects);
        
       })
      .catch((error)=>{ 
        console.log(error)
      setList([])
      })   
  // setList( lest)
},[])
  
  return (
    <div>

    {!showCreateProject && (
 <> <button className='m-4 p-2 bg-blue-500 text-white rounded-lg'
   onClick={() => setShowCreateProject(true)}>
    Create New Project
  </button>

  <ProjectList list={list} /></>
)}

{showCreateProject && (
  <CreateNewProject settingList={setList}   onClose={() => setShowCreateProject(false)} />
)}

    </div>
  )
}

export default Home

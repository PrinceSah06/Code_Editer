import React, { useEffect, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { useParams} from 'react-router-dom';
import api from '../api/axios';

type EditerProps={
    value:string,
    onchange:(value:string)=>void,
    height?:string,

}
type FetchDataType={
    _id:string,
    name:string,
    code?:string,
    language?:string  ,
    owners?:string[],
  }
const EditerCom = ({value,onchange}:EditerProps) => {
 const [fetchData,setFeatchData]=useState<FetchDataType| null >(null)
  const {projectId}= useParams<{projectId:string}>();
  console.log("Editing project with ID:",projectId);
  

  

  useEffect(()=>{
    if(!projectId) return;
    api.get(`/projects/${projectId}`)
    .then((response)=>{
        console.log("Fetched project data:",response.data);
        onchange(response.data.project.code);
        setFeatchData(response.data.project);
    })
    .catch((error)=>{
        console.error("Error fetching project data:",error);
    }); 

  },[projectId])

  
  if (!fetchData) {
    return <div className="text-white p-4">Loading editor...</div>;
  }
  return (
    <div>
          <div className="h-full w-full bg-black text-green-400 p-4">
      Code Editor will be here 
    </div>
    <Editor 
    height='100vh' 
     value={value}
      onChange={(e)=>onchange(e || '')}
       language={fetchData.language || 'javascript'}
          theme="vs-dark"
        options={{
        fontSize: 14,
        minimap: { enabled: false },
        lineNumbers: "on",
        tabSize: 2,
      }}
    />
    </div>
  )
}

export default EditerCom

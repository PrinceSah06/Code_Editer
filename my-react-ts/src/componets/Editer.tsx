import React from 'react';
import { Editor } from '@monaco-editor/react';


type EditerProps={
    value:string,
    onchange:(value:string)=>void,
    height?:string,

}
const EditerCom = ({value,onchange}:EditerProps) => {
  return (
    <div>
          <div className="h-full w-full bg-black text-green-400 p-4">
      Code Editor will be here
    </div>
    <Editor 
    height='100vh' 
     value={value}
      onChange={(e)=>onchange(e || '')}
       language="javascript"
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

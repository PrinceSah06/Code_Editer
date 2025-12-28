import React, { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useDebounce } from "../hooks/useDebounce";

type FetchDataType = {
  _id: string;
  name: string;
  code?: string;
  language?: string;
  owners?: string[];
};



const EditerCom = () => {
  const [fetchData, setFetchData] = useState<FetchDataType | null>(null);
  const [theme, setTheme] = useState<string>("vs-dark");

  const { projectId } = useParams<{ projectId: string }>();
  const debounceValue = useDebounce(fetchData?.code,1000)
  const [hasTyped, setHasTyped] = useState(false);

type SaveStatus = "idle" | "saving" | "saved" | "error";

const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");


  useEffect(() => {
    if (!projectId) return;

    api
      .get(`/projects/${projectId}`)
      .then((response) => {
        setFetchData(response.data.project);
      })
      .catch((error) => {
        console.error("Error fetching project data:", error);
      });


  


  }, [projectId]);

  const handleThemeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTheme(event.target.value);
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;

    setFetchData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        language: value,
      };
    });
  };

  const handleCodeChange = (value: string) => {
    setHasTyped(true)
    setSaveStatus('saving')
    setFetchData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        code: value,
      };
    });
  };

 

  useEffect(()=>{
  if (!projectId || !fetchData) return;
if (debounceValue === undefined) return;
if(!hasTyped) return;


    api.patch(`/projects/${projectId}`, {
    code: debounceValue,
    language: fetchData?.language,
    name: fetchData?.name,
  }).then(() => {
    console.log("Saved (debounced)");
    setSaveStatus("saved")
    hideSatus()
  }).catch((error) => {

  setSaveStatus('error')
   
    console.error("Error saving project data (debounced):", error); 
  })},[  debounceValue,
  projectId,
  fetchData?.language,
  fetchData?.name,])

  if (!fetchData) {
    return <div className="text-white p-4">Loading editor...</div>;
  }

  const hideSatus = ()=>{
    setTimeout(()=>{
setSaveStatus("idle")
    },2000)

  }

  return (
    <div>
<div className="flex flex-wrap items-center gap-3 bg-neutral-900 px-4 py-3 text-gray-200">

  {/* Title + status */}
  <div className="flex items-center gap-3">
    <h1 className="text-lg font-semibold text-white">
      Code Editor
    </h1>

    <span className="text-sm text-gray-400">
      {saveStatus === "saving" && "🟡 Saving..."}
      {saveStatus === "saved" && "🟢 Saved"}
      {saveStatus === "error" && "🔴 Error"}
    </span>
  </div>

  {/* Controls */}
  <div className="ml-auto flex flex-wrap gap-2">
    <select
      onChange={handleThemeChange}
      className="rounded-md border border-gray-700 bg-neutral-800 px-2 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="vs-dark">Dark</option>
      <option value="vs-light">Light</option>
    </select>

    <select
      onChange={handleLanguageChange}
      className="rounded-md border border-gray-700 bg-neutral-800 px-2 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="javascript">JavaScript</option>
      <option value="typescript">TypeScript</option>
      <option value="html">HTML</option>
      <option value="css">CSS</option>
    </select>
  </div>
</div>


      <Editor
        height="100vh"
        value={fetchData.code || ""}
        onChange={(value) =>{ 
          handleCodeChange(value || "")}}
        language={fetchData.language || "javascript"}
        theme={theme}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          lineNumbers: "on",
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default EditerCom;

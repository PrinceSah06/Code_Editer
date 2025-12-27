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
  }).catch((error) => {
    console.error("Error saving project data (debounced):", error); 
  })},[  debounceValue,
  projectId,
  fetchData?.language,
  fetchData?.name,])

  if (!fetchData) {
    return <div className="text-white p-4">Loading editor...</div>;
  }

  return (
    <div>
      <div className="flex bg-black text-green-400 p-4">
        <h1>Code Editor</h1>

        <div className="ml-auto flex gap-4">
          <select
            onChange={handleThemeChange}
            className="border rounded px-2 bg-black"
          >
            <option value="vs-dark">Dark</option>
            <option value="vs-light">Light</option>
          </select>

          <select
            onChange={handleLanguageChange}
            className="border rounded px-2 bg-black"
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
        onChange={(value) => handleCodeChange(value || "")}
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

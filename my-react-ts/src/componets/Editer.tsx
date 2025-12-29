import React, { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useDebounce } from "../hooks/useDebounce";
import { useProjectDataById } from "../services/getData";
import EditerHeader from "./EditerHeader";
import type { SaveStatus } from "../types/project";

const EditerCom = () => {
  // const [project, setProject] = useState<ProjectType | null>(null);
  const { projectId } = useParams<{ projectId: string }>();

  const [theme, setTheme] = useState<string>("vs-dark");
  const { project, setProject } = useProjectDataById(projectId || "");

  const debounceValue = useDebounce(project?.code, 1000);
  const [hasTyped, setHasTyped] = useState(false);

  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [isEditingFileName, setIsEditingFileName] = useState(false);

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;

    setProject((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        language: value,
      };
    });
  };

  const handleCodeChange = (value: string) => {
    setHasTyped(true);
    setSaveStatus("saving");
    setProject((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        code: value,
      };
    });
  };
  const hideStatus = () => {
    setTimeout(() => {
      setSaveStatus("idle");
    }, 2000);
  };
  const saveFileName =()=>{
    if(!projectId|| !project?.name) return ;

    try {
      api.patch(`/projects/${projectId}`,{name:project.name})
      
      setSaveStatus('saved')
      hideStatus()
    } catch (error) {
      setSaveStatus('error')
      console.error('Failed to remane File',error)

      
    }
  }

  useEffect(() => {
    if (!projectId || !project) return;
    if (debounceValue === project.code) return;

    if (debounceValue === undefined) return;
    if (!hasTyped) return;

    api
      .patch(`/projects/${projectId}`, {
        code: debounceValue,
        language: project?.language,
        name: project?.name,
      })
      .then(() => {
        console.log("Saved (debounced)");
        setSaveStatus("saved");
        hideStatus();
      })
      .catch((error) => {
        setSaveStatus("error");

        console.error("Error saving project data (debounced):", error);
      });
  }, [debounceValue, hasTyped, projectId, project?.language, project?.name]);

  if (!project) {
    return <div className="text-white p-4">Loading editor...</div>;
  }

  return (
    <div>
      <EditerHeader
        isEditing={isEditingFileName}
        fileName={project.name}
        onStartEdit={() => setIsEditingFileName(true)}
        onFinishEdit={() =>{ setIsEditingFileName(false)
          saveFileName()}
        }
        onFileNameChange={(value) =>
          setProject((prev) => (prev ? { ...prev, name: value } : prev))
        }
        handleThemeChange={handleThemeChange}
        saveStatus={saveStatus}
        handleLanguageChange={handleLanguageChange}
      />

      <Editor
        height="100vh"
        value={project.code || ""}
        onChange={(value) => {
          handleCodeChange(value || "");
        }}
        language={project.language || "javascript"}
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

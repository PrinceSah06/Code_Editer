import React, { createContext, useContext, useState } from "react";

type ProjectType = {
  _id: string;
  name: string;
  language: string;
  code: string;
  owners: string[];
};

type ProjectContextType = {
  project: ProjectType | null;
  setProject: React.Dispatch<React.SetStateAction<ProjectType | null>>;
};

const ProjectContext = createContext<ProjectContextType | null>(null);

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const [project, setProject] = useState<ProjectType | null>(null);

  return (
    <ProjectContext.Provider value={{ project, setProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used inside ProjectProvider");
  }
  return context;
};

import { useState, useEffect } from "react";
import type { ProjectType } from "../types/project";

import api from "../api/axios";
export function useProjectDataById(projectId: string) {
  const [project, setProject] = useState<ProjectType | null>(null);

  useEffect(() => {
    if (!projectId) return;

    api
      .get(`/projects/${projectId}`)
      .then((response) => {
        setProject(response.data.project);
      })
      .catch((error) => {
        console.error("Error fetching project data:", error);
      });
  }, [projectId]);

  return { project, setProject };
}

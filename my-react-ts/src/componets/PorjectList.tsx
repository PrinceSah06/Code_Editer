import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type ProjectListProps = {
  list: Array<{
    _id: string,
    name: string
  }>
}

const ProjectList = ({ list }: ProjectListProps) => {
  const navigate = useNavigate();

  const handleProjectClick = (projectId: string) => {
    navigate(`/editer/${projectId}`);
  }

  if (list.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-700 bg-slate-800/20 backdrop-blur-sm">
        <div className="bg-slate-800 p-4 rounded-full mb-4">
          <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-slate-200 mb-2">No projects found</h3>
        <p className="text-slate-400">Create your first project to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((project) => (
        <div
          key={project._id}
          onClick={() => handleProjectClick(project._id)}
          className="group relative flex flex-col justify-between p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer overflow-hidden shadow-lg hover:shadow-indigo-500/10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative z-10 flex items-start justify-between mb-8">
            <div className="p-3 bg-slate-900/50 rounded-xl group-hover:bg-indigo-500/20 transition-colors">
              <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <button className="text-slate-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>

          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors mb-1 truncate">
              {project.name}
            </h3>
            <div className="flex items-center gap-2 mt-4 text-sm font-medium text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
              Open Workspace
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectList

import React from 'react'
import api from '../api/axios'

type CreateNewProjectProps = {
  onClose: () => void
  settingList?: React.Dispatch<React.SetStateAction<Array<{ _id: string, name: string }>>>
}

const CreateNewProject = ({ onClose, settingList }: CreateNewProjectProps) => {
  const [projectName, setProjectName] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value)
  }

  const handleCreateProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    setIsSubmitting(true);
    api.post('/projects', {
      name: projectName,
    }).then((response) => {
      if (settingList && response.data.project) {
        settingList((prev) => [...prev, { _id: response.data.project._id, name: response.data.project.name }])
      }
      onClose();
    }).catch((error) => {
      console.error("Error creating project:", error);
    }).finally(() => {
      setIsSubmitting(false);
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <form
        onSubmit={handleCreateProject}
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-slate-900 border border-slate-700/50 shadow-2xl shadow-indigo-500/10"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-cyan-400"></div>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-2">Create Workspace</h2>
          <p className="text-slate-400 text-sm mb-6">Enter a name for your new code editor project.</p>

          <div className="space-y-4 mb-8">
            <div>
              <label htmlFor="projectName" className="block text-sm font-medium text-slate-300 mb-1">
                Project Name
              </label>
              <input
                id="projectName"
                type="text"
                value={projectName}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                placeholder="e.g. My Awesome App"
                required
                autoFocus
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !projectName.trim()}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                'Create Project'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateNewProject

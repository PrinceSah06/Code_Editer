import React, { useEffect } from 'react'
import CreateNewProject from '../componets/CreateNewProject'
import ProjectList from '../componets/PorjectList';
import api from '../api/axios';

const Home = () => {
  const [showCreateProject, setShowCreateProject] = React.useState(false);
  const [list, setList] = React.useState<Array<{ _id: string, name: string }>>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(true);
    api.get('/projects')
      .then((response) => {
        setList(response.data.projects || []);
      })
      .catch((error) => {
        console.log(error)
        setList([])
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Projects</span>
            </h1>
            <p className="text-slate-400">Manage and access your code editor workspaces.</p>
          </div>
          <button
            className="group relative px-6 py-3 font-semibold text-white transition-all duration-300 ease-in-out bg-indigo-600 rounded-xl hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            onClick={() => setShowCreateProject(true)}
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Project
            </span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <ProjectList list={list} />
        )}
      </div>

      {showCreateProject && (
        <CreateNewProject settingList={setList} onClose={() => setShowCreateProject(false)} />
      )}
    </div>
  )
}

export default Home

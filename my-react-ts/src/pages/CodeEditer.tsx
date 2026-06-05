import { useEffect } from "react";
import Editer from "../componets/Editer";
import { useParams, useNavigate } from "react-router-dom";
import socket from "../socket";

const CodeEditer = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!projectId) return;

    socket.connect();

    const handleConnect = () => {
      socket.emit("join-project", { projectId });
    };

    const handleError = (err: any) => {
      console.error("Socket error:", err.message);
    };

    socket.on("connect", handleConnect);
    socket.on("connect_error", handleError);

    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("connect_error", handleError);
      socket.disconnect();
    };
  }, [projectId]);

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200">
      <header className="flex items-center justify-between px-6 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 -ml-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Back to Projects"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            <h1 className="font-medium text-sm text-slate-300">Workspace <span className="text-slate-500">#{projectId?.slice(0, 8)}</span></h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-indigo-500 flex items-center justify-center text-xs font-bold text-white z-10">You</div>
            <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-xs text-slate-300">?</div>
          </div>
          <button className="px-3 py-1.5 text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-md hover:bg-indigo-500/20 transition-colors">
            Share
          </button>
        </div>
      </header>
      
      <main className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0">
          {/* Assuming Editer handles its own full width/height properly */}
          <Editer />
        </div>
      </main>
    </div>
  );
};

export default CodeEditer;

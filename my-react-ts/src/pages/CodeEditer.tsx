import React, { useEffect, useState } from "react";
import Editer from "../componets/Editer";
import { useParams } from "react-router-dom";
import socket from "../socket";

const CodeEditer = () => {
  const [code, setCode] = useState("");
  const { projectId } = useParams();

useEffect(() => {
  if (!projectId) return;

  console.log("🔌 Trying to connect socket...");
  socket.connect();

  const handleConnect = () => {
    console.log("✅ Connected to socket:", socket.id);
    socket.emit("join-project", { projectId });
    console.log('new user joined')
  };

  const handleError = (err: any) => {
    console.error("❌ Socket error:", err.message);
  };

  // 👇 attach listeners
  socket.on("connect", handleConnect);
  socket.on("connect_error", handleError);

  // 👇 IMPORTANT: handle already-connected socket
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
    <div>
      <Editer value={code} onchange={setCode} />
    </div>
  );
};

export default CodeEditer;

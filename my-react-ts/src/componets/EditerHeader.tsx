import React, { useEffect } from "react";

interface header {
  handleThemeChange(event: React.ChangeEvent<HTMLSelectElement>): void;
  handleLanguageChange(event: React.ChangeEvent<HTMLSelectElement>): void;
  saveStatus: string;
  fileName: string;
  onStartEdit(): void;
  onFinishEdit(): void;
  onFileNameChange(val: string): void;
  isEditing: boolean;
}

const EditerHeader = ({
  fileName,
  onStartEdit,
  onFileNameChange,
  onFinishEdit,
  handleThemeChange,
  handleLanguageChange,
  isEditing,
  saveStatus,
}: header) => {



 
  return (
    <div className="flex flex-wrap items-center gap-3 bg-neutral-900 px-4 py-3 text-gray-200">
      {/* Title + status */}
      {isEditing ? (
        <>
          <input
          value={fileName}
            className="bg-neutral-800 border border-gray-600 px-2 py-1 rounded text-white"
            autoFocus
            type="text"
            onKeyDown={(e) => e.key === "Enter" && onFinishEdit()}
            onBlur={onFinishEdit}
            onChange={(e) => onFileNameChange(e.target.value)}
          >
                     </input>
        </>
      ) : (
        <>
          {" "}
          <h1
            className="text-lg font-semibold text-white cursor-pointer"
            onClick={onStartEdit}
          >
            {fileName}
          </h1>
        </>
      )}

      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold text-white">Code Editor</h1>

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
  );
};

export default EditerHeader;

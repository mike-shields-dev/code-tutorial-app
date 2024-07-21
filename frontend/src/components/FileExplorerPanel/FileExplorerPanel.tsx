"use client";

import { useWebContainerContext } from "@/context/WebContainerContext";
import DirectoryComponent from "./DirectoryComponent/DirectoryComponent";
import { getAppName } from "./utils";

export default function FileExplorerPanel() {
  const { fileSystem, error } = useWebContainerContext();
  
  if (!fileSystem || error) return <div>Error: {error}</div>;
  
  const appName = getAppName(fileSystem);

  return (
    <nav id="file-explorer" className="overflow-hidden p-2">
      <header>
        <h1>File Explorer</h1>
      </header>
      <DirectoryComponent
        dirNode={fileSystem}
        dirPath={`${appName}`}
      />
    </nav>
  );
}

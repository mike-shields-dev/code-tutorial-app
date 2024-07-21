import { DirectoryNode, FileSystemTree } from "@webcontainer/api";
import { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import FileComponent from "../FileComponent/FileComponent";
import { getSortedDirEntries, isDirectoryNode, isFileNode } from "../utils";

export default function DirectoryComponent({
  dirNode,
  dirPath,
}: {
  dirNode: DirectoryNode | FileSystemTree;
  dirPath: string;
}) {
  const dirName = dirPath.split("/").at(-1);

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="list-none pl-2">
      <button
        className="flex"
        onClick={toggleOpen}
        style={{ cursor: "pointer" }}
      >
        <span className="flex items-center gap-1">
          {isOpen ? (
            <MdOutlineKeyboardArrowDown />
          ) : (
            <MdOutlineKeyboardArrowRight />
          )}
          {dirName}
        </span>
      </button>
      {isOpen && (
        <ul
          role="directory"
          aria-label={`Directory: ${dirName}`}
          className="pl-2"
        >
          {getSortedDirEntries(dirNode).map(([dirEntryPath, dirEntry]) => {
            if (isDirectoryNode(dirEntry)) {
              return (
                <DirectoryComponent
                  key={dirEntryPath}
                  dirNode={dirEntry.directory}
                  dirPath={dirEntryPath}
                />
              );
            } else if (isFileNode(dirEntry)) {
              return (
                <FileComponent
                  key={dirEntryPath}
                  fileNode={dirEntry}
                  filePath={dirEntryPath}
                />
              );
            }
          })}
        </ul>
      )}
    </li>
  );
}

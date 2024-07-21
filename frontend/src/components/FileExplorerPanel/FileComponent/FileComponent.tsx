import { FileNode } from "@webcontainer/api";
import FileIconSelector from "./FileIconSelector/FileIconSelector";
import * as path from "path";

export default function FileComponent({
  filePath,
  fileNode,
}: {
  fileNode: FileNode;
  filePath: string;
}) {
  const fileName = path.basename(filePath);

  if (!fileName) return null;

  return (
    <li className="list-none" role="file">
      <span className="gap-1 flex items-center pl-2">
        <FileIconSelector fileName={fileName} />
        {fileName}
      </span>
    </li>
  );
}

import { FileNode } from "@webcontainer/api";
import { promises as fs } from "fs";

export default async function getFile(filePath: string): Promise<FileNode> {
  const stat = await fs.stat(filePath);
  
  if (!stat.isFile()) {
    throw new Error('The provided path is not a file');
  }

  const contents = await fs.readFile(filePath, "utf8");
  return { file: { contents } };
}


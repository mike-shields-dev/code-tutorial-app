import { FileSystemTree } from "@webcontainer/api";
import { promises as fs } from "fs";
import path from "path";
import getFileNode from "./getFileNode";

export default async function getFileSystemTree(
  directoryPath: string
): Promise<FileSystemTree> {
  const stat = await fs.stat(directoryPath);

  if (!stat.isDirectory()) {
    throw new Error("The provided path is not a directory");
  }

  const directoryEntries = await fs.readdir(directoryPath, {
    withFileTypes: true,
  });
  const tree: FileSystemTree = {};
  for (const directoryEntry of directoryEntries) {
    const directoryEntryPath = path.join(directoryPath, directoryEntry.name);
    if (directoryEntry.isDirectory()) {
      tree[directoryEntry.name] = {
        directory: await getFileSystemTree(directoryEntryPath),
      };
    }
    if (directoryEntry.isFile()) {
      tree[directoryEntry.name] = await getFileNode(directoryEntryPath);
    }
  }
  return tree;
}

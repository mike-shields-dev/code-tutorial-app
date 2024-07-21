import { DirectoryNode, FileSystemTree } from "@webcontainer/api";

/**
 * Returns the directory of the provided path,
 * from provided lessonFileSystem
 * @param lessonFileSystem {FileSystemTree}
 * @param path {string}
 */
export default function getInitialEditorDirectory(
  lessonFileSystem: FileSystemTree,
  path: string
) { 
  const pathSegments = path.split("/");
  let dir: FileSystemTree | DirectoryNode = lessonFileSystem;

  for (const segment of pathSegments) {
    if (dir.hasOwnProperty(segment)) {
      if (dir[segment].hasOwnProperty("directory")) {
        const directoryNode = dir[segment] as DirectoryNode;
        const directory = directoryNode.directory;
        dir = directory;
      }
    }
  }

  return dir;
}

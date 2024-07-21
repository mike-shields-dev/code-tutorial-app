import { DirectoryNode, FileNode, FileSystemTree } from "@webcontainer/api";

/**
 * Asserts that the provided node is a DirectoryNode
 * @see DirectoryNode
 *
 * @param node
 *
 * @returns `boolean`
 */
export function isFileNode(node: DirectoryNode | FileNode): node is FileNode {
  return (node as FileNode).file !== undefined;
}

/**
 * Asserts that the provided node is a FileNode
 * @see FileNode
 *
 * @param node
 *
 * @returns `boolean`
 */
export function isDirectoryNode(
  node: DirectoryNode | FileNode
): node is DirectoryNode {
  return (node as DirectoryNode).directory !== undefined;
}

/**
 * Retrieves the app name as defined in the `package.json` file in the lesson's app directory
 * @param fileSystem { FileSystemTree } The lesson's file system tree
 * @returns {string}
 */
export function getAppName(fileSystem: FileSystemTree) {
  if (!fileSystem) return null;
  if (fileSystem && fileSystem.hasOwnProperty("package.json")) {
    const fileNode = fileSystem["package.json"] as FileNode;
    const packageJSON = JSON.parse(fileNode.file.contents.toString());
    return packageJSON.name || "";
  }
}

/**
 * Returns the sorted entries of the provided dirNode, with directories preceding files & both
 * directories and files sorted alphabetically.
 *
 * @param dirNode { DirectoryNode | FileSystemTree }
 * @returns { Array<DirectoryNode | FileNode> }
 */
export function getSortedDirEntries(dirNode: DirectoryNode | FileSystemTree) {
  return Object.entries(dirNode).toSorted(([pathA, nodeA], [pathB, nodeB]) => {
    const isDirA = isDirectoryNode(nodeA);
    const isDirB = isDirectoryNode(nodeB);

    if (isDirA && !isDirB) {
      return -1; // A is a directory and B is not, so A comes first
    }
    if (!isDirA && isDirB) {
      return 1; // B is a directory and A is not, so B comes first
    }

    // Both are directories or both are files, sort alphabetically
    return pathA.localeCompare(pathB);
  });
}

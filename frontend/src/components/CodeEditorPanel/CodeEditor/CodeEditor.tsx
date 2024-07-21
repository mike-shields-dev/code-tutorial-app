import { Editor } from "@monaco-editor/react";
import { FileNode, FileSystemTree } from "@webcontainer/api";

function CodeEditor({
  initialFileSystem,
  editorConfig,
}: {
  initialFileSystem: FileSystemTree;
  editorConfig: CodeEditorConfig;
}) {
  return (
    <Editor defaultLanguage="javascript" language={editorConfig.language} />
  );
}

export default CodeEditor;

import { ReactNode, useMemo } from "react";
import BrowserPanel from "../BrowserPanel/BrowserPanel";
import CodeEditorPanel from "../CodeEditorPanel/CodeEditorPanel";
import FileExplorerPanel from "../FileExplorerPanel/FileExplorerPanel";
import InstructionsPanel from "../InstructionsPanel/InstructionsPanel";
import TerminalPanel from "../TerminalPanel/TerminalPanel";

export default function LessonUI({ config }: { config: LessonConfig }) {
  const {
    hasBrowser,
    hasCodeEditor,
    hasFileExplorer,
    hasInstructions,
    hasTerminal,
  } = config;

  // const UIComponents = useMemo(() => {
  //   const components: { key: string; component: ReactNode }[] = [];
  //   if (hasInstructions) {
  //     components.push({
  //       key: "instructions_panel",
  //       component: <InstructionsPanel />,
  //     });
  //   }
  //   if (hasFileExplorer) {
  //     components.push({
  //       key: "file_explorer_panel",
  //       component: <FileExplorerPanel />,
  //     });
  //   }
  //   if (hasCodeEditor) {
  //     components.push({
  //       key: "code_editor_panel",
  //       component: <CodeEditorPanel />,
  //     });
  //   }
  //   if (hasBrowser) {
  //     components.push({
  //       key: "browser-panel",
  //       component: <BrowserPanel />,
  //     });
  //   }
  //   if (hasTerminal) {
  //     components.push({
  //       key: "terminal_panel",
  //       component: <TerminalPanel key="terminal_panel" />,
  //     });
  //   }

  //   return components;
  // }, [hasBrowser, hasTerminal, hasCodeEditor, hasFileExplorer, hasInstructions, ]);

  return (
    <div className="flex h-full border-2 border-red-500 w-screen items-stretch ">
      Lesson UI
      {/* {UIComponents.map(({ key, component }) => (
          <div key={key} className="grow border-2 border-red-500">
            {component}
          </div>
        ))} */}
    </div>
  );
}

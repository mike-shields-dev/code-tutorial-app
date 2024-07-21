import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
  useMemo,
} from "react";
import { FileSystemTree, WebContainer } from "@webcontainer/api";
import {
  devModeLog,
  devModeTrace,
  pipeStreamToLogger,
} from "@/utils/devModeConsoleMethods";

export interface WebContainerContextValues {
  webContainer: WebContainer | null;
  url: string;
  error: string;
  isFileSystemMounted: boolean;
  fileSystem: FileSystemTree | null;
  areDepsInstalled: boolean;
  hasStarted: boolean;
}

const initialValues: WebContainerContextValues = {
  webContainer: null,
  url: "",
  error: "",
  isFileSystemMounted: false,
  fileSystem: null,
  areDepsInstalled: false,
  hasStarted: false,
};

export const WebContainerContext =
  createContext<WebContainerContextValues>(initialValues);

interface WebContainerContextProviderProps {
  children: ReactNode;
  config: WebContainerConfig;
  tutorialID: string;
  lessonID: string;
  nodeAppDir: FileSystemTree;
}

export const WebContainerContextProvider = ({
  children,
  config,
  nodeAppDir,
}: WebContainerContextProviderProps) => {
  const { shouldPreinstallDependencies, shouldStartNodeApp } = config;

  const [webContainer, setWebContainer] = useState<WebContainer | null>(null);
  const [didBoot, setDidBoot] = useState<boolean>(false);
  const [isFileSystemMounted, setIsFileSystemMounted] =
    useState<boolean>(false);
  const [fileSystem, setFileSystem] = useState<FileSystemTree | null>(
    nodeAppDir
  );
  const [areDepsInstalled, setAreDepsInstalled] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Web Container Start up sequence
    try {
      if (!didBoot) {
        boot();
      }
      if (didBoot && webContainer && !isFileSystemMounted) {
        mount(nodeAppDir);
      }
      if (
        isFileSystemMounted &&
        shouldPreinstallDependencies &&
        !areDepsInstalled
      ) {
        installDependencies();
      }
      if (areDepsInstalled && shouldStartNodeApp && !hasStarted) {
        startServer();
      }
    } catch (error) {
      if (error instanceof Error) {
        devModeTrace(error.message);
        setError(error.message);
      }
    }
  }, [
    didBoot,
    webContainer,
    isFileSystemMounted,
    fileSystem,
    shouldPreinstallDependencies,
    areDepsInstalled,
    hasStarted,
  ]);

  async function boot() {
    devModeLog("Booting WebContainer...");
    setDidBoot(true);
    const containerInstance = await WebContainer.boot();
    setWebContainer(containerInstance);
    devModeLog("WebContainer instantiated:", containerInstance);
  }

  async function mount(fileSystem: FileSystemTree) {
    devModeLog("Mounting file system...");
    await webContainer?.mount(fileSystem);
    setIsFileSystemMounted(true);
    setFileSystem;
    devModeLog("File System mounted:", fileSystem);
  }

  async function installDependencies() {
    const installProcess = await webContainer?.spawn("npm", ["install"]);
    devModeLog("Installing dependencies...");

    installProcess?.output &&
      pipeStreamToLogger(installProcess.output, devModeLog);

    const installProcessExitCode = await installProcess?.exit;
    if (installProcessExitCode !== 0) {
      throw new Error("Failed to install dependencies");
    }
    setAreDepsInstalled(true);
  }

  async function startServer() {
    const startProcess = await webContainer?.spawn("npm", ["run", "start"]);
    setHasStarted(true);
    devModeLog("Starting application...");

    startProcess?.output && pipeStreamToLogger(startProcess.output, devModeLog);

    webContainer?.on("server-ready", (port, url) => {
      setUrl(url);
    });
  }

  const value = useMemo(
    () => ({
      webContainer,
      error,
      url,
      isFileSystemMounted,
      fileSystem,
      areDepsInstalled,
      hasStarted,
    }),
    [
      error,
      webContainer,
      error,
      url,
      isFileSystemMounted,
      fileSystem,
      areDepsInstalled,
      hasStarted,
    ]
  );

  return (
    <WebContainerContext.Provider value={value}>
      {children}
    </WebContainerContext.Provider>
  );
};

export const useWebContainerContext = () => {
  const context = useContext(WebContainerContext);

  if (!context) {
    throw new Error(
      "useWebContainerContext must be used within a WebContainerContextProvider"
    );
  }

  return context;
};

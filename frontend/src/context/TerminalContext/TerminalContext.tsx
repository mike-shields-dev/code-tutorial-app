import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Terminal } from "@xterm/xterm";

const isBrowser = typeof window !== "undefined";

// Define context type
type TerminalContextType = {
  terminal: Terminal | null;
  terminalInitialised: boolean;
};

// Create context
const TerminalContext = createContext<TerminalContextType | undefined>(
  undefined
);

// Custom hook to use TerminalContext
export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error("useTerminal must be used within a TerminalProvider");
  }
  return context;
};

// TerminalProvider component
export const TerminalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const terminalRef = useRef<Terminal | null>(null);
  const [terminalInitialised, setTerminalInitialised] = useState(false);

  useEffect(() => {
    async function initialiseTerminal() {
      const { Terminal } = await import("@xterm/xterm");
      const { FitAddon } = await import("@xterm/addon-fit");
      const terminal = new Terminal();
      const fitAddon = new FitAddon();
      terminal.loadAddon(fitAddon);
      fitAddon.fit();

      terminalRef.current = terminal;
      setTerminalInitialised(true);
    }

    if (!terminalRef.current && isBrowser && !terminalInitialised) {
      initialiseTerminal();
    }

    return () => {
      terminalRef?.current?.dispose();
    };
  }, [terminalRef.current, isBrowser]);

  const value = {
    terminal: terminalRef.current,
    terminalInitialised,
  };

  return (
    <TerminalContext.Provider value={value}>
      {children}
    </TerminalContext.Provider>
  );
};

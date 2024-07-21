"use client";

import React, { useEffect, useRef } from "react";
import {
  TerminalProvider,
  useTerminal,
} from "@/context/TerminalContext/TerminalContext";

export default function TerminalPanel(props: any) {
  return (
    <TerminalProvider>
      <TerminalUI {...props} />
    </TerminalProvider>
  );
}

function TerminalUI() {
  const { terminal, terminalInitialised } = useTerminal();
  const terminalElRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!terminalInitialised || !terminal || !terminalElRef.current) return;

    terminal.open(terminalElRef.current);
  }, [terminal, terminalElRef, terminalInitialised]);

  return <div ref={terminalElRef} className="h-full" />;
}

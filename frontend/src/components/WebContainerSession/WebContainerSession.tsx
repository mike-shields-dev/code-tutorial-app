"use client";

import React, { ReactNode } from "react";
import {
  useWebContainerContext,
  WebContainerContextProvider,
} from "@/context/WebContainerContext";
import { FileSystemTree } from "@webcontainer/api";

function WebContainerSession({
  children,
  config,
  tutorialID,
  lessonID,
  nodeAppDir,
}: {
  children: ReactNode;
  config: WebContainerConfig;
  tutorialID: string;
  lessonID: string;
  nodeAppDir: FileSystemTree;
}) {
  return (
    <WebContainerContextProvider
      {...{ config, tutorialID, lessonID, nodeAppDir }}
    >
      {children}
    </WebContainerContextProvider>
  );
}

export default WebContainerSession;

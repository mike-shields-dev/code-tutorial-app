import { useContext } from "react";
import { WebContainerContext } from "@/context/WebContainerContext/WebContainerContext";

export const useWebContainerContext = () => {
  const context = useContext(WebContainerContext);

  if (!context) {
    throw new Error(
      "useWebContainerContext must be used within a WebContainerContextProvider"
    );
  }

  return context;
};

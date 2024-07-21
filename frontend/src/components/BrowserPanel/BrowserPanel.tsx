"use client";

import { useWebContainerContext } from "@/context/WebContainerContext";

export default function BrowserPanel() {
  const { url } = useWebContainerContext();

  return (
    <div className="flex justify-center items-center h-full">
      {url ? (
        <Browser url={url} />
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </div>
  );
}

function Browser({ url }: { url: string }) {
  return (
    <div className="w-full h-full">
      <iframe src={url} className="w-full h-full" />
    </div>
  );
}

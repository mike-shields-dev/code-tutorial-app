import React, { ReactNode } from "react";
import { FaReact } from "react-icons/fa";
import { DiJavascript1 } from "react-icons/di";
import { VscJson } from "react-icons/vsc";
import { SiTypescript } from "react-icons/si";
import { VscFile } from "react-icons/vsc"; // Default file icons
import { BiLogoGit } from "react-icons/bi";
import { ImInfo } from "react-icons/im";
import { PiBracketsAngleBold } from "react-icons/pi";

export default function FileIcon({ fileName }: { fileName: string }) {
  const icon = icons.find((mapping) => {
    const match = mapping.pattern.test(fileName);
    return match;
  })?.icon || <FileIcon.Generic />;
  return <>{icon}</>;
}

FileIcon.React = () => (
  <FaReact className="text-cyan-400" data-testid="FileIcon.React" />
);
FileIcon.JavaScript = () => (
  <DiJavascript1
    className="text-yellow-400"
    data-testid="FileIcon.JavaScript"
  />
);
FileIcon.TypeScript = () => (
  <SiTypescript className="text-blue-500" data-testid="FileIcon.TypeScript" />
);
FileIcon.JSON = () => (
  <VscJson className="text-orange-500" data-testid="FileIcon.JSON" />
);
FileIcon.Git = () => (
  <BiLogoGit className="text-orange-700" data-testid="FileIcon.Git" />
);
FileIcon.HTML = () => (
  <PiBracketsAngleBold className="text-pink-500" data-testid="FileIcon.HTML" />
);
FileIcon.README = () => (
  <ImInfo className="text-purple-500" data-testid="FileIcon.README" />
);
FileIcon.Generic = () => <VscFile data-testid="FileIcon.Generic" />;

// A lookup table pairing each RegEx pattern with the corresponding Icon
const icons: { pattern: RegExp; icon: ReactNode }[] = [
  { pattern: /^\.gitignore$/, icon: <FileIcon.Git /> }, // Example for .gitignore
  { pattern: /\.tsx$/, icon: <FileIcon.React /> },
  { pattern: /\.jsx$/, icon: <FileIcon.React /> },
  { pattern: /\.ts$/, icon: <FileIcon.TypeScript /> },
  { pattern: /\.(js|cjs|mjs)$/, icon: <FileIcon.JavaScript /> },
  { pattern: /\.json$/, icon: <FileIcon.JSON /> },
  { pattern: /^README\.md$/i, icon: <FileIcon.README /> },
  { pattern: /\.html$/, icon: <FileIcon.HTML /> },
];

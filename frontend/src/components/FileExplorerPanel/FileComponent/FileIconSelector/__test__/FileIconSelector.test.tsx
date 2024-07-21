import { render, screen } from "@testing-library/react";
import FileIcon from "../FileIconSelector";

describe("FileIconSelector", () => {
  it("Renders the React Icon if provided file name has the extension '.tsx'", () => {
    render(<FileIcon fileName="test.tsx" />);
    expect(screen.getByTestId("FileIcon.React")).toBeInTheDocument();
  });

  it("Renders the React Icon if provided file name has the extension '.jsx'", () => {
    render(<FileIcon fileName="test.jsx" />);
    expect(screen.getByTestId("FileIcon.React")).toBeInTheDocument();
  });

  it("Renders the JavaScript Icon if provided file name has the extension '.js'", () => {
    render(<FileIcon fileName="test.js" />);
    expect(screen.getByTestId("FileIcon.JavaScript")).toBeInTheDocument();
  });

  it("Renders the JavaScript Icon if provided file name has the extension '.cjs'", () => {
    render(<FileIcon fileName="test.cjs" />);
    expect(screen.getByTestId("FileIcon.JavaScript")).toBeInTheDocument();
  });

  it("Renders the JavaScript Icon if provided file name has the extension '.mjs'", () => {
    render(<FileIcon fileName="test.mjs" />);
    expect(screen.getByTestId("FileIcon.JavaScript")).toBeInTheDocument();
  });

  it("Renders the JSON Icon if provided file name has the extension '.json'", () => {
    render(<FileIcon fileName="test.json" />);
    expect(screen.getByTestId("FileIcon.JSON")).toBeInTheDocument();
  });

  it("Renders the TypeScript Icon if provided file name has the extension '.ts'", () => {
    render(<FileIcon fileName="test.ts" />);
    expect(screen.getByTestId("FileIcon.TypeScript")).toBeInTheDocument();
  });

  it("Renders the Git Icon if provided file name is '.gitignore'", () => {
    render(<FileIcon fileName=".gitignore" />);
    expect(screen.getByTestId("FileIcon.Git")).toBeInTheDocument();
  });

  it("Renders the HTML Icon if provided file name has the extension '.html'", () => {
    render(<FileIcon fileName="test.html" />);
    expect(screen.getByTestId("FileIcon.HTML")).toBeInTheDocument();
  });

  it("Renders the README Icon if provided file name is 'README.md'", () => {
    render(<FileIcon fileName="README.md" />);
    expect(screen.getByTestId("FileIcon.README")).toBeInTheDocument();
  });

  it("Renders the README Icon if provided file name is 'readme.md' (case insensitive)", () => {
    render(<FileIcon fileName="readme.md" />);
    expect(screen.getByTestId("FileIcon.README")).toBeInTheDocument();
  });

  it("Renders the Generic Icon if provided file name does not match any pattern", () => {
    render(<FileIcon fileName="test.unknown" />);
    expect(screen.getByTestId("FileIcon.Generic")).toBeInTheDocument();
  });
});


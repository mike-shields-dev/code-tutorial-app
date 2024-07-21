import React from "react";

function TutorialLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <header className="h-16 bg-gray-200">Header</header>
      <main className="flex flex-1 overflow-hidden w-screen">{children}</main>
      <footer className="h-16 bg-gray-200">Footer</footer>
    </div>
  );
}

export default TutorialLayout;

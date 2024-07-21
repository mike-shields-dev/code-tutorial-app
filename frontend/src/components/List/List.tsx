import React, { ReactNode, Children } from "react";

export default async function List({ children }: { children: ReactNode }) {
  return (
    <ul>
      {Children.toArray(children).map((child) => (
        <li key={`${child}`}>{child}</li>
      ))}
    </ul>
  );
}

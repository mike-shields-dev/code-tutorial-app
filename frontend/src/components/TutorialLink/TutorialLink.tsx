import Link from 'next/link';
import React, { ReactNode } from 'react'

async function TutorialLink({
    tutorialID,
    children,
  }: {
    tutorialID: string;
    children: ReactNode;
  }) {
    return <Link href={`tutorials/${tutorialID}`}>{children}</Link>;
  }

export default TutorialLink;

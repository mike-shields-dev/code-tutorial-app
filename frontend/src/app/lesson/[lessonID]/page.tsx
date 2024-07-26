import LessonUI from "@/components/LessonUI/LessonUI";
import WebContainerSession from "@/components/WebContainerSession/WebContainerSession";
import {
  getLessonConfig,
  getNodeAppDir,
  getWebContainerConfig,
} from "@/utils/localFileSystemMethods";
import { notFound } from "next/navigation";

export default async function LessonPage({
  params: { tutorialID, lessonID },
}: {
  params: { tutorialID: string; lessonID: string };
}) {
  let lessonConfig;
  
  try {
    lessonConfig = await getLessonConfig(tutorialID, lessonID);
  } catch (err) {
    notFound();
  }

  if (lessonConfig.hasWebContainer) {
    const webContainerConfig = await getWebContainerConfig(
      tutorialID,
      lessonID
    );
    const nodeAppDir = await getNodeAppDir(tutorialID, lessonID);

    return (
      <WebContainerSession
        {...{ config: webContainerConfig, tutorialID, lessonID, nodeAppDir }}
      >
        <LessonUI {...{ config: lessonConfig }} />
      </WebContainerSession>
    );
  }
}

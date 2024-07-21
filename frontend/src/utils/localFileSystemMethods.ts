"use server";

import { Dirent, promises as fs } from "fs";
import path from "path";
import { createRequire } from "module";
import vm from "vm";
import getFileSystemTree from "./getFileSystemTree";

/**
 * Retrieves the exports object from CommonJS modules.
 * @param pathSegments { string } - The path segments to the module file.
 * @returns { Promise<T> } The exports object from the CommonJS module.
 */
async function getCommonJSExports<T>(filePath: string): Promise<T> {
  const fileContent = await fs.readFile(filePath, "utf8");

  // Create a new context for evaluating the module content
  const script = new vm.Script(fileContent, {
    filename: filePath, // Optional, but can be useful for error messages
  });

  // Create a sandbox context with require and module.exports
  const sandbox = {
    require: createRequire(import.meta.url),
    module: { exports: {} },
    exports: {},
  };

  // Run the script in the sandbox context
  script.runInNewContext(sandbox);

  // Extract module.exports from the sandbox context
  const moduleExports = sandbox.module.exports as T;

  return moduleExports;
}

/**
 * Retrieves the TutorialCard component configuration for the provided tutorialID.
 *
 * @param tutorialID { string }
 * @returns { Promise<TutorialCardConfig> }
 */
export async function getTutorialCardConfig(tutorialID: string) {
  const filePath = path.join(
    "tutorials",
    tutorialID,
    "tutorial-card.config.js"
  );
  const exports: TutorialCardConfig = await getCommonJSExports(filePath);

  if (!("config" in exports)) {
    throw new Error(`Module ${filePath} does not export property "config"`);
  }

  return exports.config as TutorialCardConfig;
}


/**
 * Retrieves the LessonCard component configuration for
 * the provided tutorialID and LessonID.
 *
 * @param tutorialID { string }
 * @param lessonID { string }
 * @returns { Promise<LessonCardConfig> }
 */
export async function getLessonCardConfig(
  tutorialID: string,
  lessonID: string
) {
  const filePath = path.join(
    "tutorials",
    tutorialID,
    "lessons",
    lessonID,
    "lesson-card.config.js"
  );
  const exports: TutorialCardConfig = await getCommonJSExports(filePath);

  if (!("config" in exports)) {
    throw new Error(`Module ${filePath} does not export property "config"`);
  }

  return exports.config as LessonCardConfig;
}

/**
 * Retrieves the lesson configuration for the given tutorialID
 *
 * @param tutorialID { string } The ID of the tutorial / the tutorial folder name
 * @param lessonID { string }The ID of the lesson / the lesson folder name
 * @returns { Promise<LessonConfig> }
 */
export async function getLessonConfig(tutorialID: string, lessonID: string) {
  const configFilename = "lesson.config.js";
  const filePath = path.join(
    "tutorials",
    tutorialID,
    "lessons",
    lessonID,
    configFilename
  );
  const exports: LessonConfig = await getCommonJSExports(filePath);

  if (!("config" in exports)) {
    throw new Error(
      `Module ${configFilename} does not export property "config"`
    );
  }

  return exports.config as LessonConfig;
}

/**
 * Retrieves a list of tutorials based on the contents of the tutorials directory.
 * The list will consist of non-empty tutorial directories
 * @returns { Promise<string[]> }
 */
export async function getTutorialsList(): Promise<string[]> {
  const tutorialsDirectoryPath = path.join(process.cwd(), "tutorials");

  try {
    // Read directory entries with file types
    const tutorialsDirectoryEntries: Dirent[] = await fs.readdir(tutorialsDirectoryPath, { withFileTypes: true });

    // Filter out directories
    const tutorialDirectories: Dirent[] = tutorialsDirectoryEntries.filter(entry => entry.isDirectory());

    // Filter out empty directories
    const nonEmptyTutorialDirectories: Dirent[] = await Promise.all(
      tutorialDirectories.map(async tutorialDirectory => {
        const tutorialDirPath = path.join(tutorialsDirectoryPath, tutorialDirectory.name);
        const tutorialDirectoryEntries = await fs.readdir(tutorialDirPath);

        if (tutorialDirectoryEntries.length > 0) {
          return tutorialDirectory;
        }
        return null;
      })
    ).then(results => results.filter((dir): dir is Dirent => dir !== null)); // Filter out null values

    // Return the names of non-empty tutorial directories
    return nonEmptyTutorialDirectories.map(tutorialDirectory => tutorialDirectory.name);

  } catch (error) {
    console.error(`Error reading tutorials directory: ${error}`);
    return [];
  }
}


export async function getLessonsList(tutorialID: string) {
  const dirPath = path.normalize(
    path.join(process.cwd(), "tutorials", tutorialID, "lessons")
  );

  const lessonDirEntries = await fs.readdir(dirPath, {
    withFileTypes: true,
  });

  const lessonsList = await Promise.all(
    lessonDirEntries.map(async (entry: Dirent) => {
      if (entry.isDirectory()) {
        return entry.name;
      }
      return null;
    })
  );

  return lessonsList.filter((entry) => entry !== null) as string[];
}

export async function getWebContainerConfig(
  tutorialID: string,
  lessonID: string
) {
  const configFilename = "web-container.config.js";
  const filePath = path.normalize(
    path.join(
      process.cwd(),
      "tutorials",
      tutorialID,
      "lessons",
      lessonID,
      configFilename
    )
  );

  const exports: LessonConfig = await getCommonJSExports(filePath);

  if (!("config" in exports)) {
    throw new Error(
      `Module ${configFilename} does not export property "config"`
    );
  }

  return exports.config as WebContainerConfig;
}

export async function getCodeEditorConfig(
  tutorialID: string,
  lessonID: string
) {
  const configFilename = "code-editor.config.js";
  const filePath = path.normalize(
    path.join(
      process.cwd(),
      "tutorials",
      tutorialID,
      "lessons",
      lessonID,
      configFilename
    )
  );

  const exports: LessonConfig = await getCommonJSExports(filePath);

  if (!("config" in exports)) {
    throw new Error(
      `Module ${configFilename} does not export property "config"`
    );
  }

  return exports.config as CodeEditorConfig;
}

export async function getNodeAppDir(tutorialID: string, lessonID: string) {
  const dirPath = path.normalize(
    path.join("tutorials", tutorialID, "lessons", lessonID, "app")
  );

  const nodeAppDir = await getFileSystemTree(dirPath);

  return nodeAppDir;
}

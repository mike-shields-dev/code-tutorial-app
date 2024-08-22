declare global {
  /**
   * @description Represents a tutorial in the system.
   *
   * @property {number} [id] - The unique identifier of the tutorial.
   * @property {string} title - The title of the tutorial.
   * @property {boolean} is_active - Whether the tutorial is currently active.
   * @property {Date} [createdAt] - The date and time when the tutorial was created.
   */
  interface ITutorial {
    id?: number;
    title: string;
    description: string;
    is_published: boolean;
    createdAt?: Date;
  }

  /**
   * @description Represents a lesson in the system.
   *
   * @property {number} [id] - The unique identifier of the lesson.
   * @property {string} title - The title of the lesson.
   * @property {boolean} is_active - Whether the lesson is currently available.
   * @property {Date} [createdAt] - The date and time when the lesson was created.
   */
  interface ILesson {
    id?: number;
    title: string;
    is_published: boolean;
    createdAt?: Date;
  }

  /**
   * @description Represents a topic of study, e.g., HTML.
   *
   * @property {number} [id] - The unique identifier of the topic.
   * @property {string} name - The name of the topic.
   * @property {Date} [createdAt] - The date and time when the topic was created.
   */
  interface ITopic {
    id?: number;
    name: string;
    createdAt?: Date;
  }

  /**
   * @description Configuration options for a lesson.
   *
   * @property {boolean} hasWebContainer - Whether the lesson uses a web container.
   * @property {boolean} hasBrowser - Whether the lesson uses the Browser UI.
   * @property {boolean} hasCodeEditor - Whether the lesson uses the Code Editor UI.
   * @property {boolean} hasTerminal - Whether the lesson uses the Terminal UI.
   * @property {boolean} hasFileExplorer - Whether the lesson uses the File Explorer UI.
   * @property {boolean} hasInstructions - Whether the lesson uses the Instructions UI.
   */
  interface ILessonConfig {
    hasWebContainer: boolean;
    hasBrowser: boolean;
    hasCodeEditor: boolean;
    hasTerminal: boolean;
    hasFileExplorer: boolean;
    hasInstructions: boolean;
  }

  /**
   * @description Configuration options for the code editor.
   *
   * @property {string} language - The programming language used in the lesson's code editor.
   */
  interface ICodeEditorConfig {
    language: string;
  }

  /**
   * @description Configuration options for the web container.
   *
   * @property {boolean} shouldPreinstallDependencies - Whether dependencies should be installed at the beginning of a lesson.
   * @property {boolean} shouldStartNodeApp - Whether the node app should be started at the beginning of a lesson.
   */
  interface IWebContainerConfig {
    shouldPreinstallDependencies: boolean;
    shouldStartNodeApp: boolean;
  }

  /**
   * @description Configuration for displaying a TutorialCard.
   *
   * @property {number} [id] - The id number of the tutorialCard
   * @property {string} title - The tutorial's title.
   * @property {string} description - The tutorial's description.
   * @property {string} [imgSrc] - The URL of an image to be displayed in the TutorialCard.
   * @property {string} [imgAlt] - A description of the image, for accessibility.
   */
  export interface ITutorialCard {
    id?: number;
    title: string;
    description: string;
    imgSrc?: string;
    imgAlt?: string;
  }

  /**
   * @description Configuration for displaying a LessonCard.
   *
   * @property {string} description - The description of the lesson.
   */
  interface ILessonCardConfig {
    description: string;
  }
}

export {};

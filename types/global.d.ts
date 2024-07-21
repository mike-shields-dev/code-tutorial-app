declare global {
  /**
   * @description The name of the tutorial.
   *
   * @property id `number`
   * ID of the tutorial in the `tutorials` table in the database.
   *
   * @property title `string`
   * The title of the Tutorial.
   *
   * @property createdAt `Date`
   * The date and time that the tutorial was created in the database.
   */
  interface Tutorial {
    id: number;
    title: string;
    createdAt: Date;
  }

  /**
   * @description The name of the lesson.
   *
   * @property id `number`
   * ID of the lesson in the `lessons` table in the database.
   *
   * @property title `string`
   * The title of the lesson in the `lessons` table in the database.
   *
   * @property createdAt `Date`
   * The date and time that the lesson was created in the database.
   */
  interface Lesson {
    id: number;
    title: string;
    createdAt: Date;
  }

  /**
   * @description Represents an area of study e.g. HTML
   *
   * @property id `number`
   * The topic's primary key in `topics` database table.
   *
   * @property name `string`
   * The name of the topic.
   *
   * @property createdAt `Date`
   * The date and time that the topic was created in the `topics` table in the database.
   */
  interface Topic {
    id: number;
    name: string;
    createdAt: Date;
  }

  /**
   * @description Lesson configuration options.
   * @property hasWebContainer `boolean`
   *
   * Determines whether the lesson uses a web container.
   *
   * @property hasBrowser `boolean`
   * Determines whether the lesson uses the Browser UI.
   *
   * @property hasCodeEditor `boolean`
   * Determines whether the lesson uses the Code Editor UI.
   *
   * @property hasTerminal `boolean`
   * Determines whether the lesson uses the Terminal UI.
   *
   * @property hasFileExplorer `boolean`
   * Determines whether the lesson uses the File Explorer UI.
   *
   * @property hasInstructions `boolean`
   * Determines whether the lesson uses the Instructions UI.
   */
  interface LessonConfig {
    hasWebContainer: boolean;
    hasBrowser: boolean;
    hasCodeEditor: boolean;
    hasTerminal: boolean;
    hasFileExplorer: boolean;
    hasInstructions: boolean;
  }

  /**
   * @description Code Editor Configurations.
   *
   * @property language { string }
   * The programming language used in the lesson's code editor.
   */
  interface CodeEditorConfig {
    language: string;
  }

  /**
   * @description Web Container configurations.
   *
   * @property shouldPreinstallDependencies `boolean`
   * Determines whether dependencies should be installed at the beginning of a lesson.
   *
   * @property shouldStartNodeApp `boolean`
   * Determines whether the node app should be started at the beginning of a lesson.
   */
  interface WebContainerConfig {
    shouldPreinstallDependencies: boolean;
    shouldStartNodeApp: boolean;
  }

  /**
   * @description Configures the content of a TutorialCard
   *
   * @property title `string`
   * The tutorial's title to be displayed in the TutorialCard
   *
   * @property description `string`
   * The tutorial's description to be displayed in the TutorialCard
   *
   * @property [imgSrc] `string`
   * The url of an image to be displayed in the TutorialCard
   *
   * @property [imgAlt] `string`
   * A description of the image, for accessibility
   */
  interface TutorialCardConfig {
    title: string;
    description: string;
    imgSrc: string;
    imgAlt: string;
  }

  interface LessonCardConfig {
    description: string;
  }
}

export {};

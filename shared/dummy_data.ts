const dummyData: ITutorial[] = [
  {
    id: 0,
    title: "Introduction to HTML",
    description: "Learn how HTML is used to define the structure of web pages.",
    is_published: true,
    lessons: [
      { title: "What is HTML?", is_published: true },
      { title: "HTML topics", is_published: true },
      { title: "HTML Attributes", is_published: true },
      { title: "HTML Elements", is_published: true },
    ],
    topics: [{ name: "HTML" }, { name: "Web Development" }],
    level: "beginner",
  },
  {
    id: 1,
    title: "CSS Basics",
    description: "Learn how to target DOM elements and change how they look.",
    is_published: true,
    lessons: [
      { title: "What is CSS?", is_published: true },
      { title: "CSS Selectors", is_published: true },
      { title: "CSS Properties", is_published: true },
      { title: "CSS Box Model", is_published: true },
    ],
    topics: [{ name: "CSS" }, { name: "Web Development" }],
    level: "beginner",
  },
  {
    id: 2,
    title: "JavaScript Fundamentals",
    description: "Learn how to add interactivity to your web applications.",
    is_published: true,
    lessons: [
      { title: "What is JavaScript?", is_published: true },
      { title: "Variables", is_published: true },
      { title: "Functions", is_published: true },
      { title: "Objects", is_published: true },
    ],
    topics: [{ name: "JavaScript" }, { name: "Web Development" }],
    level: "beginner",
  },
  {
    id: 3,
    title: "TypeScript for Beginners",
    description:
      "Learn how TypeScript can help you to catch bugs and create large scale projects.",
    is_published: true,
    lessons: [
      { title: "What is TypeScript?", is_published: true },
      { title: "Type Annotations", is_published: true },
      { title: "Interfaces", is_published: true },
      { title: "Classes", is_published: true },
    ],
    topics: [{ name: "TypeScript" }, { name: "Web Development" }],
    level: "intermediate",
  },
];

export default dummyData;

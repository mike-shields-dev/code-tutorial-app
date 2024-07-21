# Code Tutorial App

Author: [Mike Shields](https://github.com/mike-shields-dev)

## About

A code tutorial application inspired by platforms such as [FreeCodeCamp](https://www.freecodecamp.org/) and [Codecademy](https://www.codecademy.com/) etc.

The application uses [web container](https://webcontainers.io/) technology, to instantiate a sand-boxed [Node.js](https://nodejs.org/en) runtime in the browser.

The web container instance exposes an [API](https://webcontainers.io/api), allowing front-end code to interact with the web container.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The project has been developed using [`pnpm`](https://pnpm.io/).

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Getting Started

1. Using git, clone the repository to your local machine.
2. Run `pnpm install` to install the project's dependencies.
3. Run `pnpm dev` to start the development server.
4. Open a web browser and navigate to [http://localhost:3000](http://localhost:3000) to view the root page of the application.

## Tutorials Directory

The `tutorials` directory is located at the root of the project.

The current structure is as follows, it is likely to change as the project develops.

```bash
tutorials/
└── tutorial-1
    ├── tutorial-card.config.js
    └── lessons
        └── lesson-1
            ├── code-editor.config.js
            ├── lesson-card.config.js
            ├── lesson.config.js
            ├── web-container.config.js
            └── app
                ├── package.json
                └── src
                    ├── hello-world.js
                    └── index.js
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

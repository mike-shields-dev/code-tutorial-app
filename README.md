<h1>Code Tutorial App</h1>
Author: <cite>Michael Shields</cite>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Project Structure](#project-structure)
  - [Starting the App](#starting-the-app)

## Introduction

Welcome to the Code Tutorial App project!

## Getting Started

### Prerequisites

- [NodeJS](https://nodejs.org/en)
- [Git](https://git-scm.com/)
- [PNPM](https://pnpm.io/)

### Installation

1. Use `git clone https://github.com/mike-shields-dev/code-tutorial-app.git` to clone this repository to your development environment.
2. Open up a terminal and `cd` to the root of the project
3. Run `pnpm i` to install the required dependencies.

### Project Structure

The project structure is depicted below: 

```bash
  .
  ├── backend
  ├── docs
  ├── frontend
  ├── node_modules
  ├── package.json
  ├── pnpm-lock.yaml
  ├── pnpm-workspace.yaml
  ├── README.md
  ├── tsconfig.base.json
  └── types
```

### Starting the App 

The project is configured using `pnpm` so that the scripts in the root `package.json` run the scripts in the `backend/package.json` and `frontend/package.json`, allowing the entire stack to be started up from the root.

The application can be started in 3 modes: **Development**, **Test** & **Production**.

- Development Mode: `pnpm dev`
- Test Mode: `pnpm test` 
- Production Mode: `pnpm start` 

You can find specific instructions in the linked READMEs below:

- [Frontend README](docs/README.frontend.md)
- [Backend README](docs/README.backend.md)

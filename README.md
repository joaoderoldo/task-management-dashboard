<div align="center">
<a href="https://task-management-dashboard-eight.vercel.app/" target="_blank"><img src="https://i.imgur.com/B1FoBVF.png" style="display:block; margin:auto;"/></a>
</div>

## Overview
Tasker is a task management application designed to help users manage their tasks. It allows users to create, update, delete, and filter tasks based on their status and title.

## Architecture

Tasker is built using a modern web development stack:

- **Frontend**: The frontend is built using React, a popular JavaScript library for building user interfaces. The application is component-based, which makes the code more modular and easier to maintain.

- **State Management**: By default Tasker uses React's built-in state management capabilities (useContext) to manage the application state, but in the [feature/zustand-approach](https://github.com/joaoderoldo/task-management-dashboard/tree/feature/zustand-approach) branch, there is a implementation of [Zustand](https://github.com/pmndrs/zustand) global state management

- **Styling**: Tasker uses [Tailwind](https://github.com/tailwindlabs/tailwindcss) to create a modular style.

- **Testing**: Tasker uses [Vitest](https://github.com/vitest-dev/vitest) for testing. Vitest is faster than Jest and is totally typesafe.


## Project Structure

The project is structured as follows:

- `.vscode`: This directory contains vscode recommended configurations.
- `public/`: This directory contains static files like HTML and images.
- `src/`: This directory contains all the source code of the application.
  - `assets/`: This directory contains all assets (Images, Icons, Files) used by Tasker.
  - `components/`: This directory contains all generic components.
  - `constants/`: This directory contains all generic constants.
  - `contexts/`: This directory contains contexts for global state management.
  - `hooks/`: This directory contains hooks to wrapper logic from the application.
  - `layouts/`: This directory contains all the layouts to wrapper the main content.
  - `tests/`: This directory contains all the test files.
  - `types/`: This directory contains generic types.
- `.env.example`: This file is the example of `.env` with configurations.

## Running the Project

To run the project, follow these steps:

1. Copy `.env.example` and create a `.env` file, and fill the `VITE_LOCAL_STORAGE_KEY` with a custom value.
2. Install the dependencies: `yarn install`
3. Start the development server: `yarn dev`
4. Run the tests: `yarn test`

## Additional state management
By default, Tasker works based on `Context API` to manage global states, but there is another implementations with `Zustand`, to use it follow the steps bellow.

1. Checkout to the branch [feature/zustand-approach](https://github.com/joaoderoldo/task-management-dashboard/tree/feature/zustand-approach)(If not, just use `git fetch all --prune` then checkout)
2. Run `yarn install` again to install `Zustand` dependencies
3. Start the development server: `yarn dev`

## Commands

- `yarn dev`: Run the development server.
- `yarn build`: Generate the build files.
- `yarn lint`: Validate all code lints to check if there some warning.
- `yarn preview`: Run a local server, but serving the `dist/` folder.
- `yarn test`: Run all tests.
- `yarn test:watch`: Run all tests, but keep watching for changes in the test files.
- `yarn test:ui`: Run a local server with a iterative tests UI.
- `yarn coverage`: Generate a test coverage file.
- `yarn check-types`: Validate if there is a missing typescript correct typos.

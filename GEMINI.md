# Project Overview

This project is a web-based music challenge game built with React and Vite. It consists of a series of mini-games designed to be played in a sequence. The application uses `react-router-dom` for navigation between games, and the user can also navigate using the left and right arrow keys.

The game includes the following components:
- **Game 1: Guess the Song:** Players listen to song snippets and can reveal the title and artist.
- **Game 2: Guess the Picture:** Players reveal a picture tile by tile to guess what's depicted.
- **Game 3: Crossword:** A music-themed crossword puzzle.
- **Game 4: Grand Quiz:** A multiple-choice quiz about music theory and culture.
- **Welcome Screen:** The initial screen of the application.
- **End Screen:** A screen that appears after all games are completed.

## Building and Running

To get the project running locally, follow these steps:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    This will start the Vite development server, and you can view the application in your browser at the URL provided (usually `http://localhost:5173`).

3.  **Build for Production:**
    ```bash
    npm run build
    ```
    This command builds the application for production, and the output will be in the `dist` directory.

4.  **Preview the Production Build:**
    ```bash
    npm run preview
    ```
    This command serves the production build locally for previewing.

## Development Conventions

- The project is structured with a main `App.jsx` file that handles routing and navigation.
- Each game is a separate React component located in the `src/components` directory.
- Styling is done with CSS, with a general `App.css` and a `Game.css` for game-specific styles.
- The project uses functional components with hooks.
- The game flow is defined in the `gameFlow` array in `App.jsx`.
- Audio and picture assets are stored in the `audios` and `pictures` directories in the public folder.

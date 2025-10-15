# 2048 Game

A modern and responsive implementation of the classic 2048 puzzle game, built with Next.js, React, and Tailwind CSS. The goal is to slide numbered tiles on a grid to combine them and create a tile with the number 2048.


## Features

-   **Classic 2048 Gameplay**: Slide tiles in four directions (Up, Down, Left, Right) to merge matching numbers.
-   **Responsive Design**: The game is fully responsive and playable on desktops, tablets, and mobile devices.
-   **Customizable Board Size**: Choose from various grid sizes (3x3 up to 8x8) for a different level of challenge.
-   **Score Tracking**: Your score is tracked and updated as you merge tiles.
-   **Win/Loss Detection**: The game notifies you when you've won by creating a 2048 tile or when you've lost because no more moves are possible.
-   **Keyboard Controls**: Use arrow keys or WASD keys for intuitive gameplay on desktops.
-   **Sleek UI**: A clean and modern user interface with smooth animations and a visually appealing color scheme.
-   **Restart Game**: Easily start a new game at any time.

## Screenshots

*(Space for screenshots of the game in action. Add your images here.)*

### Desktop View
![Desktop Screenshot](link-to-desktop-screenshot.png)

### Mobile View
![Mobile Screenshot](link-to-mobile-screenshot.png)

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/)
-   **Library**: [React](https://reactjs.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [Radix UI](https://www.radix-ui.com/) & [shadcn/ui](https://ui.shadcn.com/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Animations**: [tailwindcss-animate](https://www.npmjs.com/package/tailwindcss-animate)

## Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/2048-game.git
    cd 2048-game
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```

### Running the Application

1.  **Start the development server:**
    ```sh
    npm run dev
    ```
    or
    ```sh
    yarn dev
    ```

2.  Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the game in action.

## Project Structure

```
/
├── app/                  # Main application pages and styles
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main game page component
├── components/           # Reusable UI components
│   ├── game-board.tsx    # The game grid component
│   ├── game-controls.tsx # Controls for board size, restart, and movement
│   └── ui/               # UI components from shadcn/ui
├── lib/                  # Core game logic and utilities
│   ├── 2048.ts           # Game logic (board initialization, moves, etc.)
│   └── utils.ts          # Utility functions (e.g., cn for class names)
├── public/               # Static assets
└── ...                   # Configuration files (Next.js, Tailwind, etc.)

```

# 2048 Game

<p align="center">
  <a href="https://nextjs.org" target="_blank">
    <img src="https://img.shields.io/badge/Next.js-14.x-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  </a>
  <a href="https://react.dev" target="_blank">
    <img src="https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react&logoColor=white" alt="React">
  </a>
  <a href="https://tailwindcss.com" target="_blank">
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  </a>
  <a href="https://www.typescriptlang.org" target="_blank">
    <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  </a>
</p>

A modern and responsive implementation of the classic 2048 puzzle game, built with Next.js, React, and Tailwind CSS. The goal is to slide numbered tiles on a grid to combine them and create a tile with the number 2048.


## Features

-   **Classic 2048 Gameplay**: Slide tiles in four directions (Up, Down, Left, Right) to merge matching numbers.
-   **Responsive Design**: The game is fully responsive and playable on desktops, tablets, and mobile devices.
-   **Customizable Board Size**: Choose from various grid sizes (3x3 up to 8x8) for a different level of challenge.
-   **Score Tracking**: Your score is tracked and updated as you merge tiles.
-   **Win/Loss Detection**: The game notifies you when you've won by creating a 2048 tile or when you've lost because no more moves are possible.
-   **Keyboard Controls**: Use arrow keys or WASD keys for intuitive gameplay on desktops.
-   **Mobile Touch Controls**: Use your finger to swipe tiles on mobile devices for intuitive gameplay.
-   **Sleek UI**: A clean and modern user interface with smooth animations and a visually appealing color scheme.
-   **Restart Game**: Easily start a new game at any time.

## Screenshots


### Desktop View
<img width="1896" height="915" alt="image" src="https://github.com/user-attachments/assets/2f471315-8cf9-478c-b5d3-2f88ac441dd3" />

### Mobile View
<img width="259" height="421" alt="image" src="https://github.com/user-attachments/assets/181ffe71-c6c8-42d1-af8b-2347701ec060" />


## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/)
-   **Library**: [React](https://reactjs.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
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
│   ├── theme-provider.tsx# Theme provider for light/dark mode
│   └── ui/               # UI components from shadcn/ui
├── lib/                  # Core game logic and utilities
│   ├── 2048.ts           # Game logic (board initialization, moves, etc.)
│   └── utils.ts          # Utility functions (e.g., cn for class names)
├── public/               # Static assets
└── ...                   # Configuration files (Next.js, Tailwind, etc.)

```

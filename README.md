# React Mines

This repository contains a small web implementation of the **Mines** game built with [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/). It was created during my *Computer Science studies* as my first major React project. The gameplay was inspired by the "Mines" gambling game on stake.com.

## Features

- Adjustable grid size and number of mines
- Place bets and cash out
- Progress bar with a timer per round
- Statistics for profits, losses and total profit
- Sound effects using Howler
- Lottie-based animations for winning and losing
- State managed with Jotai and UI built with Material UI
- Dockerfile for containerized builds

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build
   ```

A `Dockerfile` is provided to generate a container image that serves the production build using the `serve` package.

## Motivation

I built this project as part of my computer science studies to familiarize myself with React and its ecosystem. Recreating the gameplay of stake.com's Mines offered a fun challenge in state management, animations and UI design. While simple, it was an excellent introduction to React development and working with TypeScript, Jotai and Material UI.

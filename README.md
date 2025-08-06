# Assembly: Endgame

A hangman-style word game built with **React** and **Vite**. Guess the hidden word and prevent the programming world from being overrun by Assembly!

## Overview

- Start with a random word drawn from a built‑in word list.
- Each incorrect guess removes one of eight programming language “lives.”
- Win by revealing all letters before all languages are eliminated.
- Lose if every language is gone—the Assembly apocalypse begins!

## Features

- Interactive on‑screen keyboard for letter guesses
- Colorful language chips that disappear as lives are lost
- Fun farewell messages for each language
- Confetti celebration on victory

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
This starts the Vite development server, usually at `http://localhost:5173`.

### Production Build
```bash
npm run build
```

## Project Structure

```
assembly-endgame/
├── public/                 # Static assets
├── src/
│   ├── App.jsx             # Main game component
│   ├── components/
│   │   └── Header.jsx      # Optional header component
│   ├── languages.js        # Languages used as lives
│   ├── utils.js            # Helper functions
│   ├── words.js            # Word list
│   └── index.jsx           # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md               # (Place this file here)
```

## Contributing

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Submit a pull request with a clear description


# Tic Tac Toe

A modern, fully responsive Tic Tac Toe web application built with HTML, CSS, and TypeScript. Features both single-player mode with intelligent AI and local two-player mode, wrapped in a sleek, animated interface.

## Features

- **Two Game Modes**
  - Single Player: Challenge an intelligent AI opponent
  - Two Player: Play locally with a friend

- **Intelligent AI**
  - Prioritizes winning moves
  - Blocks opponent's winning moves
  - Strategic corner and center play
  - Adaptive difficulty for engaging gameplay

- **Modern UI/UX**
  - Clean, professional design with smooth animations
  - Hover effects and interactive feedback
  - Winning line animation
  - Modal-based game results
  - Accessible and keyboard-friendly

- **Fully Responsive**
  - Optimized for desktop, tablet, and mobile devices
  - Touch-friendly interface
  - Adaptive layout and typography

- **Polished Animations**
  - Cell pop-in effects
  - Winning cell highlights
  - Smooth transitions throughout
  - SVG-based winning line drawing

## Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with CSS Grid, Flexbox, and animations
- **TypeScript** - Strongly-typed game logic and state management
- **JavaScript (ES6+)** - Compiled TypeScript output
- **SVG** - Winning line graphics

## Game Modes

### Single Player Mode
Play against the computer AI. The AI implements a strategic algorithm that:
1. Takes immediate winning moves when available
2. Blocks the player's winning moves
3. Prioritizes center position for strategic advantage
4. Chooses corners when available
5. Falls back to random available positions

The AI plays as "O" while the player plays as "X".

### Two Player Mode
Local multiplayer mode where two players take turns on the same device. Players alternate between "X" and "O" with clear turn indicators.

## Project Structure

```
tic-tac-toe/
├── index.html          # Main HTML structure
├── style.css           # Complete styling and animations
├── script.ts           # TypeScript source code
├── script.js           # Compiled JavaScript (generated)
├── package.json        # Project dependencies
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite build configuration
└── README.md           # This file
```

## How to Run Locally

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tic-tac-toe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Compile TypeScript** (optional - development mode does this automatically)
   ```bash
   npm run build
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Navigate to `http://localhost:5173` (or the URL shown in your terminal)

### Build for Production

To create an optimized production build:

```bash
npm run build
npm run preview
```

The optimized files will be in the `dist/` directory.

## How to Play

1. **Select a Game Mode**
   - Click "Single Player" to play against the AI
   - Click "Two Player" to play with a friend

2. **Make Your Move**
   - Click on any empty cell to place your mark (X or O)
   - The current player is shown at the top of the board

3. **Win the Game**
   - Get three in a row (horizontally, vertically, or diagonally)
   - The winning line will be highlighted with an animation
   - A modal will display the winner

4. **Game Controls**
   - **Restart Game**: Start a new game in the current mode
   - **Change Mode**: Return to mode selection
   - **Play Again**: Quick restart after game ends
   - **Back to Menu**: Return to mode selection after game ends

## Code Highlights

### TypeScript Types & Interfaces
```typescript
type Player = 'X' | 'O';
type CellValue = Player | null;
type Board = CellValue[];
type GameMode = 'single' | 'two-player';
type GameStatus = 'playing' | 'won' | 'draw';

interface GameState {
  board: Board;
  currentPlayer: Player;
  gameMode: GameMode;
  gameStatus: GameStatus;
  winner: Player | null;
  winningLine: number[] | null;
}
```

### AI Strategy
The AI uses a priority-based decision system:
1. Check for winning move
2. Block opponent's winning move
3. Take center if available
4. Take corner if available
5. Take any available position

## Screenshots

![Mode Selection](screenshots/mode-selection.png)
*Choose between Single Player and Two Player modes*

![Gameplay](screenshots/gameplay.png)
*Clean, responsive game board with smooth animations*

![Winner Announcement](screenshots/winner.png)
*Celebratory modal with winning line highlight*

## Future Enhancements

Potential features for future versions:

- **Score Tracking** - Keep track of wins, losses, and draws across sessions
- **Difficulty Levels** - Easy, Medium, and Hard AI modes
- **Online Multiplayer** - Play with friends remotely
- **Game History** - Review past games with move-by-move replay
- **Custom Themes** - Multiple color schemes and visual styles
- **Sound Effects** - Audio feedback for moves and wins
- **Animations Library** - More elaborate winning celebrations
- **Leaderboard** - Track statistics and achievements
- **Time Limits** - Optional move timers for competitive play
- **Undo Move** - Option to take back the last move (practice mode)

## Browser Support

This application works on all modern browsers:
- Chrome (90+)
- Firefox (88+)
- Safari (14+)
- Edge (90+)
- Opera (76+)

## License

MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

**Enjoy the game!** If you have suggestions or find bugs, please open an issue or submit a pull request.

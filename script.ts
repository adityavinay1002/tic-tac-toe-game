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

interface WinningCombination {
  indices: number[];
  line: { x1: number; y1: number; x2: number; y2: number };
}

const WINNING_COMBINATIONS: WinningCombination[] = [
  { indices: [0, 1, 2], line: { x1: 25, y1: 50, x2: 275, y2: 50 } },
  { indices: [3, 4, 5], line: { x1: 25, y1: 150, x2: 275, y2: 150 } },
  { indices: [6, 7, 8], line: { x1: 25, y1: 250, x2: 275, y2: 250 } },
  { indices: [0, 3, 6], line: { x1: 50, y1: 25, x2: 50, y2: 275 } },
  { indices: [1, 4, 7], line: { x1: 150, y1: 25, x2: 150, y2: 275 } },
  { indices: [2, 5, 8], line: { x1: 250, y1: 25, x2: 250, y2: 275 } },
  { indices: [0, 4, 8], line: { x1: 25, y1: 25, x2: 275, y2: 275 } },
  { indices: [2, 4, 6], line: { x1: 275, y1: 25, x2: 25, y2: 275 } },
];

class TicTacToe {
  private state: GameState;
  private cells: NodeListOf<HTMLElement>;
  private turnIndicator: HTMLElement;
  private resultModal: HTMLElement;
  private resultMessage: HTMLElement;
  private resultIcon: HTMLElement;
  private winningLine: SVGElement;
  private winningLinePath: SVGLineElement;

  constructor() {
    this.state = {
      board: Array(9).fill(null),
      currentPlayer: 'X',
      gameMode: 'two-player',
      gameStatus: 'playing',
      winner: null,
      winningLine: null,
    };

    this.cells = document.querySelectorAll('.cell');
    this.turnIndicator = document.getElementById('current-turn')!;
    this.resultModal = document.getElementById('result-modal')!;
    this.resultMessage = document.getElementById('result-message')!;
    this.resultIcon = document.getElementById('result-icon')!;
    this.winningLine = document.getElementById('winning-line')!;
    this.winningLinePath = this.winningLine.querySelector('line')!;

    this.initializeEventListeners();
    this.showModeSelection();
  }

  private initializeEventListeners(): void {
    document.getElementById('single-player-btn')?.addEventListener('click', () => {
      this.startGame('single');
    });

    document.getElementById('two-player-btn')?.addEventListener('click', () => {
      this.startGame('two-player');
    });

    document.getElementById('restart-btn')?.addEventListener('click', () => {
      this.resetGame();
    });

    document.getElementById('change-mode-btn')?.addEventListener('click', () => {
      this.showModeSelection();
    });

    document.getElementById('play-again-btn')?.addEventListener('click', () => {
      this.hideModal();
      this.resetGame();
    });

    document.getElementById('back-to-menu-btn')?.addEventListener('click', () => {
      this.hideModal();
      this.showModeSelection();
    });

    this.cells.forEach((cell, index) => {
      cell.addEventListener('click', () => this.handleCellClick(index));
    });
  }

  private showModeSelection(): void {
    document.getElementById('mode-selection')?.classList.remove('hidden');
    document.getElementById('game-container')?.classList.add('hidden');
  }

  private hideModeSelection(): void {
    document.getElementById('mode-selection')?.classList.add('hidden');
    document.getElementById('game-container')?.classList.remove('hidden');
  }

  private startGame(mode: GameMode): void {
    this.state.gameMode = mode;
    this.hideModeSelection();
    this.resetGame();
  }

  private resetGame(): void {
    this.state = {
      board: Array(9).fill(null),
      currentPlayer: 'X',
      gameMode: this.state.gameMode,
      gameStatus: 'playing',
      winner: null,
      winningLine: null,
    };

    this.cells.forEach((cell) => {
      cell.textContent = '';
      cell.classList.remove('taken', 'x', 'o', 'winner');
    });

    this.winningLine.classList.remove('show');
    this.updateTurnIndicator();
  }

  private handleCellClick(index: number): void {
    if (
      this.state.board[index] !== null ||
      this.state.gameStatus !== 'playing'
    ) {
      return;
    }

    this.makeMove(index, this.state.currentPlayer);

    if (
      this.state.gameStatus === 'playing' &&
      this.state.gameMode === 'single' &&
      this.state.currentPlayer === 'O'
    ) {
      setTimeout(() => this.makeAIMove(), 500);
    }
  }

  private makeMove(index: number, player: Player): void {
    this.state.board[index] = player;
    this.updateCell(index, player);

    const winner = this.checkWinner();
    if (winner) {
      this.state.gameStatus = 'won';
      this.state.winner = winner.player;
      this.state.winningLine = winner.indices;
      this.highlightWinningCells(winner.indices);
      this.drawWinningLine(winner.line);
      setTimeout(() => this.showResult(winner.player), 800);
    } else if (this.state.board.every((cell) => cell !== null)) {
      this.state.gameStatus = 'draw';
      setTimeout(() => this.showResult(null), 500);
    } else {
      this.switchPlayer();
    }
  }

  private updateCell(index: number, player: Player): void {
    const cell = this.cells[index];
    cell.textContent = player;
    cell.classList.add('taken', player.toLowerCase());
  }

  private switchPlayer(): void {
    this.state.currentPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
    this.updateTurnIndicator();
  }

  private updateTurnIndicator(): void {
    const playerName =
      this.state.gameMode === 'single' && this.state.currentPlayer === 'O'
        ? 'Computer'
        : `Player ${this.state.currentPlayer}`;

    this.turnIndicator.textContent = `${playerName}'s Turn`;

    this.turnIndicator.classList.remove('x-turn', 'o-turn');
    this.turnIndicator.classList.add(
      this.state.currentPlayer === 'X' ? 'x-turn' : 'o-turn'
    );
  }

  private checkWinner(): { player: Player; indices: number[]; line: { x1: number; y1: number; x2: number; y2: number } } | null {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination.indices;
      if (
        this.state.board[a] &&
        this.state.board[a] === this.state.board[b] &&
        this.state.board[a] === this.state.board[c]
      ) {
        return {
          player: this.state.board[a] as Player,
          indices: combination.indices,
          line: combination.line,
        };
      }
    }
    return null;
  }

  private highlightWinningCells(indices: number[]): void {
    indices.forEach((index) => {
      this.cells[index].classList.add('winner');
    });
  }

  private drawWinningLine(line: { x1: number; y1: number; x2: number; y2: number }): void {
    this.winningLinePath.setAttribute('x1', line.x1.toString());
    this.winningLinePath.setAttribute('y1', line.y1.toString());
    this.winningLinePath.setAttribute('x2', line.x2.toString());
    this.winningLinePath.setAttribute('y2', line.y2.toString());
    this.winningLine.classList.add('show');
  }

  private showResult(winner: Player | null): void {
    if (winner) {
      const playerName =
        this.state.gameMode === 'single' && winner === 'O'
          ? 'Computer'
          : `Player ${winner}`;
      this.resultMessage.textContent = `${playerName} Wins!`;
      this.resultIcon.textContent = '🎉';
    } else {
      this.resultMessage.textContent = "It's a Draw!";
      this.resultIcon.textContent = '🤝';
    }
    this.resultModal.classList.remove('hidden');
  }

  private hideModal(): void {
    this.resultModal.classList.add('hidden');
  }

  private makeAIMove(): void {
    if (this.state.gameStatus !== 'playing') return;

    const bestMove = this.findBestMove();
    if (bestMove !== -1) {
      this.makeMove(bestMove, 'O');
    }
  }

  private findBestMove(): number {
    const availableMoves = this.state.board
      .map((cell, index) => (cell === null ? index : -1))
      .filter((index) => index !== -1);

    if (availableMoves.length === 0) return -1;

    const winningMove = this.findWinningMove('O');
    if (winningMove !== -1) return winningMove;

    const blockingMove = this.findWinningMove('X');
    if (blockingMove !== -1) return blockingMove;

    if (this.state.board[4] === null) return 4;

    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(
      (index) => this.state.board[index] === null
    );
    if (availableCorners.length > 0) {
      return availableCorners[
        Math.floor(Math.random() * availableCorners.length)
      ];
    }

    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  private findWinningMove(player: Player): number {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination.indices;
      const cells = [this.state.board[a], this.state.board[b], this.state.board[c]];

      const playerCount = cells.filter((cell) => cell === player).length;
      const emptyCount = cells.filter((cell) => cell === null).length;

      if (playerCount === 2 && emptyCount === 1) {
        if (this.state.board[a] === null) return a;
        if (this.state.board[b] === null) return b;
        if (this.state.board[c] === null) return c;
      }
    }
    return -1;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TicTacToe();
});

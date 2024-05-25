import React, { useState } from 'react';
import './App.css';

const initialState = {
  board: Array(9).fill(null),
  nextPlayer: 'X',
  winner: null,
};

const App = () => {
  const [state, setState] = useState(initialState);

  const handleSquareClick = (index) => {
    if (state.board[index] || state.winner) return;

    const newBoard = state.board.slice();
    newBoard[index] = state.nextPlayer;

    const winner = calculateWinner(newBoard);

    setState({
      board: newBoard,
      nextPlayer: state.nextPlayer === 'X' ? 'O' : 'X',
      winner: winner,
    });
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleSquareClick(index)}>
        {state.board[index]}
      </button>
    );
  };

  const calculateWinner = (board) => {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of winningLines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const resetGame = () => {
    setState(initialState);
  };

  let status;
  if (state.winner) {
    status = `Winner: ${state.winner}`;
  } else {
    status = `Next player: ${state.nextPlayer}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <div className="status">{status}</div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <button className="reset-btn" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default App;

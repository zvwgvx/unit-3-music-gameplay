import React, { useState, useEffect, useRef } from 'react';
import './Game.css';

// --- BẠN SẼ THAY ĐỔI NỘI DUNG Ở ĐÂY ---
const crosswordData = {
  grid: [
    [null, { number: 1, answer: 'F' }, { answer: 'A' }, { answer: 'N' }, null],
    [null, { answer: 'L' }, null, { number: 2, answer: 'O' }, null],
    [{ number: 3, answer: 'S' }, { answer: 'O' }, { answer: 'L' }, { answer: 'O' }, null],
    [null, { answer: 'W' }, null, { answer: 'P' }, null],
    [null, { number: 4, answer: 'E' }, { answer: 'R' }, { answer: 'A' }, null],
  ],
  clues: {
    across: [
      { number: 3, text: 'A performance by a single musician' },
      { number: 4, text: 'A dramatic work in one or more acts, set to music' },
    ],
    down: [
      { number: 1, text: 'A devoted admirer of a singer or band' },
      { number: 2, text: 'A musical composition' },
    ],
  },
};
// -----------------------------------------

function Game3_Crossword() {
  const [gridState, setGridState] = useState([]);
  const [checkState, setCheckState] = useState([]); // 'correct', 'incorrect', or ''
  const inputRefs = useRef([]);

  useEffect(() => {
    const initialGrid = crosswordData.grid.map(row =>
      row.map(cell => (cell ? '' : null))
    );
    setGridState(initialGrid);

    const initialCheck = crosswordData.grid.map(row =>
        row.map(cell => (cell ? '' : null))
    );
    setCheckState(initialCheck);

    // Create refs for each input cell
    inputRefs.current = crosswordData.grid.map((row, rIdx) => 
        row.map((cell, cIdx) => 
            cell ? React.createRef() : null
        )
    );

  }, []);

  const handleInputChange = (e, r, c) => {
    const newGridState = [...gridState];
    newGridState[r][c] = e.target.value.toUpperCase().slice(0, 1);
    setGridState(newGridState);

    // Auto-focus next input
    if (e.target.value && c < crosswordData.grid[r].length - 1 && gridState[r][c+1] !== null) {
        inputRefs.current[r][c+1]?.current.focus();
    }
  };

  const handleCheckAnswers = () => {
    const newCheckState = gridState.map((row, rIdx) =>
      row.map((cellValue, cIdx) => {
        if (crosswordData.grid[rIdx][cIdx] === null) return null;
        const isCorrect = cellValue === crosswordData.grid[rIdx][cIdx].answer;
        return isCorrect ? 'correct' : 'incorrect';
      })
    );
    setCheckState(newCheckState);
  };

  const handleReset = () => {
    const initialGrid = crosswordData.grid.map(row =>
        row.map(cell => (cell ? '' : null))
    );
    setGridState(initialGrid);

    const initialCheck = crosswordData.grid.map(row =>
        row.map(cell => (cell ? '' : null))
    );
    setCheckState(initialCheck);
  }

  return (
    <div className="game-container">
      <h2>Game 3: Music Crossword</h2>
      <p className="description">Use the clues to fill in the crossword puzzle.</p>
      
      <div className="crossword-container">
        <div 
            className="crossword-grid" 
            style={{ gridTemplateColumns: `repeat(${crosswordData.grid[0].length}, 40px)` }}
        >
          {gridState.map((row, rIdx) =>
            row.map((cell, cIdx) => {
              const cellData = crosswordData.grid[rIdx][cIdx];
              if (cellData === null) {
                return <div key={`${rIdx}-${cIdx}`} className="grid-cell black-cell"></div>;
              }
              return (
                <div key={`${rIdx}-${cIdx}`} className="grid-cell">
                  {cellData.number && <span className="cell-number">{cellData.number}</span>}
                  <input
                    ref={inputRefs.current[rIdx][cIdx]}
                    type="text"
                    maxLength="1"
                    className={`cell-input ${checkState[rIdx][cIdx]}`}
                    value={cell}
                    onChange={(e) => handleInputChange(e, rIdx, cIdx)}
                  />
                </div>
              );
            })
          )}
        </div>

        <div className="crossword-clues">
          <h3>Across</h3>
          <ul className="clues-list">
            {crosswordData.clues.across.map(clue => (
              <li key={`across-${clue.number}`}><strong>{clue.number}.</strong> {clue.text}</li>
            ))}
          </ul>
          <h3 style={{marginTop: '20px'}}>Down</h3>
          <ul className="clues-list">
            {crosswordData.clues.down.map(clue => (
              <li key={`down-${clue.number}`}><strong>{clue.number}.</strong> {clue.text}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="input-area">
        <button onClick={handleCheckAnswers} className="game-button">Check Answers</button>
        <button onClick={handleReset} className="game-button" style={{backgroundColor: 'var(--accent-color-2)'}}>Reset</button>
      </div>
    </div>
  );
}

export default Game3_Crossword;

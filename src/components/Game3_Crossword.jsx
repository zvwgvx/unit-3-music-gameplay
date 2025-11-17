import React, { useState, useMemo } from 'react';
import './Game.css';

// --- BẠN SẼ THAY ĐỔI NỘI DUNG Ở ĐÂY ---
const crosswordData = {
  gridSize: [7, 9], // 7 hàng, 9 cột
  words: [
    { clue: 'A performance by a single musician', answer: 'SOLO', start: [2, 0], direction: 'across' },
    { clue: 'A dramatic work set to music', answer: 'OPERA', start: [4, 2], direction: 'across' },
    { clue: 'A devoted admirer of a band', answer: 'FAN', start: [0, 3], direction: 'down' },
    { clue: 'A musical composition', answer: 'SONG', start: [2, 1], direction: 'down' },
    { clue: 'The speed at which a passage of music is played', answer: 'TEMPO', start: [2, 5], direction: 'down' },
  ]
};
// -----------------------------------------

const buildGrid = (gridSize, words) => {
  const grid = Array(gridSize[0]).fill(null).map(() => Array(gridSize[1]).fill(null));
  const wordMap = {};

  words.forEach((word, index) => {
    const { answer, start, direction } = word;
    let [row, col] = start;
    wordMap[index] = [];

    for (let i = 0; i < answer.length; i++) {
      if (!grid[row][col]) {
        grid[row][col] = { number: 0, letter: '' };
      }
      if (i === 0) {
        grid[row][col].number = index + 1;
      }
      grid[row][col].answer = answer[i];
      wordMap[index].push([row, col]);

      if (direction === 'across') col++;
      else row++;
    }
  });
  return { grid, wordMap };
};

function Game3_Crossword() {
  const { grid, wordMap } = useMemo(() => buildGrid(crosswordData.gridSize, crosswordData.words), []);
  const [selectedClue, setSelectedClue] = useState(null);
  const [revealedWords, setRevealedWords] = useState(new Set());

  const handleClueClick = (index) => {
    if (revealedWords.has(index)) return;
    setSelectedClue(index);
  };

  const handleRevealWord = () => {
    if (selectedClue === null) return;
    setRevealedWords(new Set(revealedWords).add(selectedClue));
    setSelectedClue(null);
  };

  const isCellHighlighted = (r, c) => {
    if (selectedClue === null) return false;
    return wordMap[selectedClue]?.some(([row, col]) => row === r && col === c);
  };

  const getCellLetter = (r, c) => {
    for (const wordIndex of revealedWords) {
      const cellInWord = wordMap[wordIndex]?.find(([row, col]) => row === r && col === c);
      if (cellInWord) {
        const letterIndex = wordMap[wordIndex].findIndex(([row, col]) => row === r && col === c);
        return crosswordData.words[wordIndex].answer[letterIndex];
      }
    }
    return '';
  };

  const acrossClues = crosswordData.words.map((w, i) => ({...w, id: i})).filter(w => w.direction === 'across');
  const downClues = crosswordData.words.map((w, i) => ({...w, id: i})).filter(w => w.direction === 'down');

  return (
    <div className="game-container">
      <h2>Game 3: Crossword</h2>
      <p className="description">Click on a clue, discuss the answer, then reveal the word!</p>
      
      <div className="crossword-layout">
        <div className="crossword-grid-container">
          <div className="crossword-grid" style={{ gridTemplateColumns: `repeat(${grid[0].length}, 38px)` }}>
            {grid.map((row, rIdx) =>
              row.map((cell, cIdx) => {
                if (cell === null) {
                  return <div key={`${rIdx}-${cIdx}`} className="grid-cell black-cell" />;
                }
                return (
                  <div key={`${rIdx}-${cIdx}`} className={`grid-cell ${isCellHighlighted(rIdx, cIdx) ? 'highlighted' : ''}`}>
                    {cell.number > 0 && <span className="cell-number">{cell.number}</span>}
                    <span className="cell-letter">{getCellLetter(rIdx, cIdx)}</span>
                  </div>
                );
              })
            )}
          </div>
          {selectedClue !== null && !revealedWords.has(selectedClue) && (
            <button onClick={handleRevealWord} className="game-button">
              Reveal Selected Word
            </button>
          )}
        </div>

        <div className="crossword-clues-panel">
          <div className="clues-group">
            <h4>Across</h4>
            <ul className="clues-list">
              {acrossClues.map(word => (
                <li
                  key={word.id}
                  className={`clue-item ${selectedClue === word.id ? 'selected' : ''} ${revealedWords.has(word.id) ? 'revealed' : ''}`}
                  onClick={() => handleClueClick(word.id)}
                >
                  <strong>{wordMap[word.id] ? grid[word.start[0]][word.start[1]].number : ''}.</strong> {word.clue}
                </li>
              ))}
            </ul>
          </div>
          <div className="clues-group">
            <h4>Down</h4>
            <ul className="clues-list">
              {downClues.map(word => (
                <li
                  key={word.id}
                  className={`clue-item ${selectedClue === word.id ? 'selected' : ''} ${revealedWords.has(word.id) ? 'revealed' : ''}`}
                  onClick={() => handleClueClick(word.id)}
                >
                  <strong>{wordMap[word.id] ? grid[word.start[0]][word.start[1]].number : ''}.</strong> {word.clue}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game3_Crossword;

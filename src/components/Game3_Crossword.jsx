import React, { useState, useMemo } from 'react';
import './Game.css';

const crosswordData = {
  gridSize: [11, 12],
  words: [
    { clue: 'Remove from competition', answer: 'ELIMINATE', start: [1, 2], direction: 'across' },
    { clue: 'Sequence of shows', answer: 'SERIES', start: [5, 0], direction: 'across' },
    { clue: 'Person who decides', answer: 'JUDGE', start: [8, 2], direction: 'across' },
    { clue: 'Having natural skill', answer: 'TALENTED', start: [10, 2], direction: 'across' },
    { clue: 'To present a show', answer: 'PERFORM', start: [0, 2], direction: 'down' },
    { clue: 'People watching', answer: 'AUDIENCE', start: [1, 8], direction: 'down' },
    { clue: 'Song released alone', answer: 'SINGLE', start: [5, 5], direction: 'down' },
  ]
};

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

  const handleClueClick = (id) => {
    if (revealedWords.has(id)) return;
    setSelectedClue(id);
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

  const acrossClues = crosswordData.words.map((w, i) => ({ ...w, id: i })).filter(w => w.direction === 'across');
  const downClues = crosswordData.words.map((w, i) => ({ ...w, id: i })).filter(w => w.direction === 'down');

  return (
    <div className="game-container">
      <h2>Symphony of Words</h2>
      <p className="description">Click on a clue, discuss the answer, then reveal the word!</p>

      <div className="crossword-layout">
        <div className="crossword-grid-container">
          <div className="crossword-grid" style={{ gridTemplateColumns: `repeat(${grid[0].length}, var(--cell-size))` }}>
            {grid.map((row, rIdx) =>
              row.map((cell, cIdx) => {
                if (cell === null) {
                  return <div key={`${rIdx}-${cIdx}`} className="grid-cell black-cell" />;
                }
                return (
                  <div key={`${rIdx}-${cIdx}`} className={`grid-cell ${isCellHighlighted(rIdx, cIdx) ? 'highlighted' : ''} ${getCellLetter(rIdx, cIdx) ? 'unboxed' : 'gift-cell'}`}>
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



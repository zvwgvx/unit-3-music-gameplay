import React, { useState, useEffect } from 'react';
import './Game.css';

const pictures = [
  { src: '/pictures/1.jpeg', answer: 'Thắng Ngọt' },
  { src: '/pictures/2.png', answer: 'Taylor Swift' },
  { src: '/pictures/3.jpeg', answer: 'The Beatles' },
  { src: '/pictures/4.jpg', answer: 'New Answer 1' },
  { src: '/pictures/5.png', answer: 'New Answer 2' },
  { src: '/pictures/6.jpg', answer: 'New Answer 3' },
  { src: '/pictures/7.png', answer: 'New Answer 4' },
  { src: '/pictures/8.jpeg', answer: 'New Answer 5' },
  { src: '/pictures/9.jpg', answer: 'New Answer 6' },
  { src: '/pictures/10.png', answer: 'New Answer 7' },
];

const GRID_SIZE = 16;

function Game2_GuessPicture() {
  const [currentPicIndex, setCurrentPicIndex] = useState(0);
  const [revealedTiles, setRevealedTiles] = useState(new Set());
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  useEffect(() => {
    setRevealedTiles(new Set());
    setIsAnswerRevealed(false);
  }, [currentPicIndex]);

  const handleTileClick = (index) => {
    if (revealedTiles.has(index)) return;
    const newRevealedTiles = new Set(revealedTiles);
    newRevealedTiles.add(index);
    setRevealedTiles(newRevealedTiles);
  };

  const handleRevealAnswer = () => {
    setIsAnswerRevealed(true);
    const allTiles = new Set(Array.from({ length: GRID_SIZE }, (_, i) => i));
    setRevealedTiles(allTiles);
  };

  const handleNextPicture = () => {
    if (currentPicIndex < pictures.length - 1) {
      setCurrentPicIndex(currentPicIndex + 1);
    }
  };

  const currentPicture = pictures[currentPicIndex];

  return (
    <div className="game-container">
      <h2>Hidden Masterpiece</h2>

      <div className="round-indicator">
        Picture {currentPicIndex + 1} of {pictures.length}
      </div>

      <p className="description">Click on the tiles to reveal parts of the picture and make your guess!</p>

      <div className="picture-reveal-container">
        <div className="picture-grid">
          <div
            className="picture-grid-bg"
            style={{ backgroundImage: `url(${currentPicture.src})` }}
          />
          {Array.from({ length: GRID_SIZE }).map((_, index) => (
            <div
              key={index}
              className={`grid-tile variant-${(index % 4) + 1} ${revealedTiles.has(index) ? 'revealed' : ''}`}
              onClick={() => handleTileClick(index)}
            >
              {index + 1}
            </div>
          ))}
        </div>

        <div className="picture-controls">
          <div className="song-card-buttons">
            <button onClick={handleRevealAnswer} className="game-button" disabled={isAnswerRevealed}>
              Reveal
            </button>
            {currentPicIndex < pictures.length - 1 && (
              <button onClick={handleNextPicture} className="game-button">
                Next
              </button>
            )}
          </div>

          {isAnswerRevealed && (
            <div className="revealed-answer">
              <p>{currentPicture.answer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Game2_GuessPicture;

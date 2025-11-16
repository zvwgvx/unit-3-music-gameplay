import React, { useState, useEffect } from 'react';
import './Game.css';

// --- BẠN SẼ THAY ĐỔI NỘI DUNG Ở ĐÂY ---
const puzzles = [
  { sentence: 'A person who writes music is called a _____.', answer: 'composer' },
  { sentence: 'The main recurring musical theme in a piece is the _____.', answer: 'melody' },
  { sentence: 'A performance by a single musician is a _____.', answer: 'solo' },
  // Thêm các câu đố khác vào đây
];
// -----------------------------------------

function Game3_VocabPuzzle() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [message, setMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    setUserGuess('');
    setMessage('');
    setIsCorrect(null);
  }, [currentIndex]);

  const handleCheckAnswer = () => {
    const correctAnswer = puzzles[currentIndex].answer;
    if (userGuess.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setMessage(`Correct! The word is "${correctAnswer}".`);
      setIsCorrect(true);
    } else {
      setMessage('Incorrect. Try again!');
      setIsCorrect(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < puzzles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setMessage("You've completed all the puzzles!");
      setIsCorrect(null);
    }
  };

  const currentPuzzle = puzzles[currentIndex];
  const sentenceParts = currentPuzzle.sentence.split('_____');

  return (
    <div className="game-container">
      <h2>Game 3: Vocab Puzzle</h2>
      <p className="description">Fill in the blank with the correct music-related word.</p>
      
      <div style={{ fontSize: '1.3rem', margin: '20px 0' }}>
        {sentenceParts[0]}
        <span style={{ 
          display: 'inline-block', 
          width: '120px', 
          borderBottom: '2px solid var(--warm-text)', 
          margin: '0 8px',
          verticalAlign: 'bottom'
        }}></span>
        {sentenceParts[1]}
      </div>

      <div className="input-area">
        <input
          type="text"
          className="game-input"
          placeholder="Enter the word..."
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          disabled={isCorrect === true}
        />
        <button onClick={handleCheckAnswer} className="game-button" disabled={isCorrect === true}>
          Check
        </button>
      </div>

      {message && (
        <div className={`feedback-message ${isCorrect ? 'correct' : 'incorrect'}`}>
          {message}
        </div>
      )}

      {isCorrect && (
        <button onClick={handleNext} className="game-button" style={{marginTop: '20px'}}>
          Next Puzzle
        </button>
      )}
    </div>
  );
}

export default Game3_VocabPuzzle;

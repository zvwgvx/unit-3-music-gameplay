import React, { useState, useEffect } from 'react';
import './Game.css';

// --- BẠN SẼ THAY ĐỔI NỘI DUNG Ở ĐÂY ---
const images = [
  { src: '/images/image1.jpg', answer: 'Grammy Awards' },
  { src: '/images/image2.jpg', answer: 'Taylor Swift' },
  { src: '/images/image3.jpg', answer: 'The Beatles' },
  // Thêm các hình ảnh khác vào đây
];
// -----------------------------------------

function Game2_GuessPicture() {
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
    const correctAnswer = images[currentIndex].answer;
    if (userGuess.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setMessage(`Correct! It's "${correctAnswer}".`);
      setIsCorrect(true);
    } else {
      setMessage('Incorrect. Try again!');
      setIsCorrect(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setMessage("You've completed all the pictures!");
      setIsCorrect(null);
    }
  };

  return (
    <div className="game-container">
      <h2>Game 2: Guess the Picture</h2>
      <p className="description">Look at the image and guess the artist, logo, or event!</p>
      
      <img 
        src={images[currentIndex].src} 
        alt="Guess the picture" 
        style={{ 
          maxWidth: '80%', 
          maxHeight: '300px', 
          borderRadius: '15px', 
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)' 
        }} 
      />

      <div className="input-area">
        <input
          type="text"
          className="game-input"
          placeholder="Enter your guess..."
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
          Next Picture
        </button>
      )}
    </div>
  );
}

export default Game2_GuessPicture;

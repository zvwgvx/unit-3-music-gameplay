import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

// Import game components
import Game1_GuessSong from './components/Game1_GuessSong.jsx';
import Game2_GuessPicture from './components/Game2_GuessPicture.jsx';
import Game3_Crossword from './components/Game3_Crossword.jsx';
import Game4_GrandQuiz from './components/Game4_GrandQuiz.jsx';
import EndScreen from './components/EndScreen.jsx';

// --- Define the game flow ---
const gameFlow = ['/', '/game1', '/game2', '/game3', '/game4', '/end'];

function Welcome() {
  const gradientStyle = {
    backgroundImage: 'linear-gradient(45deg, #D32F2F, #FFA000)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    fontWeight: 'bold',
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '3.5rem', margin: '0 0 15px 0' }}>
        <span style={gradientStyle}>Unit 3: Music Challenge</span>
      </h1>
      <p style={{ fontSize: '1.3rem', color: 'var(--warm-text)', marginTop: '10px' }}>
        An interactive review by <span style={gradientStyle}>Group 3</span> (ITK
        <span style={gradientStyle}>67</span>).
      </p>
    </div>
  );
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      const currentIndex = gameFlow.indexOf(location.pathname);

      if (event.key === 'ArrowRight') {
        if (currentIndex < gameFlow.length - 1) {
          navigate(gameFlow[currentIndex + 1]);
        }
      } else if (event.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          navigate(gameFlow[currentIndex - 1]);
        }
      }
    };

    // Add event listener when the component mounts
    window.addEventListener('keydown', handleKeyDown);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [location, navigate]); // Re-run the effect if location or navigate changes

  return (
    <div className="app-container">
      <div className="game-content">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/game1" element={<Game1_GuessSong />} />
          <Route path="/game2" element={<Game2_GuessPicture />} />
          <Route path="/game3" element={<Game3_Crossword />} />
          <Route path="/game4" element={<Game4_GrandQuiz />} />
          <Route path="/end" element={<EndScreen />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

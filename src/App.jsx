import React, { useEffect, useRef } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';

// Import game components
import Welcome from './components/Welcome.jsx';
import Game1_GuessSong from './components/Game1_GuessSong.jsx';
import Game2_GuessPicture from './components/Game2_GuessPicture.jsx';
import Game3_Crossword from './components/Game3_Crossword.jsx';
import Game4_GrandQuiz from './components/Game4_GrandQuiz.jsx';
import EndScreen from './components/EndScreen.jsx';
import PageTransition from './components/PageTransition.jsx';

import ScaleWrapper from './components/ScaleWrapper.jsx';

// --- Define the game flow ---
const gameFlow = ['/', '/game1', '/game2', '/game3', '/game4', '/end'];

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Track previous index to determine direction
  const previousIndex = useRef(0);
  const currentIndex = gameFlow.indexOf(location.pathname);

  // Calculate direction: 1 for forward (next), -1 for backward (prev)
  // Default to 0 if indices are same (initial load)
  const direction = currentIndex > previousIndex.current ? 1 : -1;

  useEffect(() => {
    // Update previous index AFTER render/transition starts
    previousIndex.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const idx = gameFlow.indexOf(location.pathname);

      if (event.key === 'ArrowRight') {
        if (idx < gameFlow.length - 1) {
          navigate(gameFlow[idx + 1]);
        }
      } else if (event.key === 'ArrowLeft') {
        if (idx > 0) {
          navigate(gameFlow[idx - 1]);
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
      <ScaleWrapper>
        <div className="game-content">
          <AnimatePresence mode="wait" custom={direction}>
            <Routes location={location}>
              <Route path="/" element={
                <PageTransition direction={direction}>
                  <Welcome />
                </PageTransition>
              } />
              <Route path="/game1" element={
                <PageTransition direction={direction}>
                  <Game1_GuessSong />
                </PageTransition>
              } />
              <Route path="/game2" element={
                <PageTransition direction={direction}>
                  <Game2_GuessPicture />
                </PageTransition>
              } />
              <Route path="/game3" element={
                <PageTransition direction={direction}>
                  <Game3_Crossword />
                </PageTransition>
              } />
              <Route path="/game4" element={
                <PageTransition direction={direction}>
                  <Game4_GrandQuiz />
                </PageTransition>
              } />
              <Route path="/end" element={
                <PageTransition direction={direction}>
                  <EndScreen />
                </PageTransition>
              } />
            </Routes>
          </AnimatePresence>
        </div>
      </ScaleWrapper>
    </div>
  );
}

export default App;

import React, { useState, useRef } from 'react';
import './Game.css';

// UPDATED: Now accepts title and artist
function SongCard({ songNumber, src, title, artist }) {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const audioRef = useRef(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      if (!hasPlayed) {
        setHasPlayed(true);
      }
    }
  };

  const handleReveal = () => {
    setIsRevealed(true);
  };

  return (
    <div className="song-card">
      <audio ref={audioRef} src={src} />
      <h3>Song #{songNumber}</h3>
      
      <div className="song-card-buttons">
        <button onClick={handlePlay} className="game-button">
          {hasPlayed ? 'Play Again' : 'Play Song'}
        </button>
        <button onClick={handleReveal} className="game-button" disabled={isRevealed}>
          Reveal
        </button>
      </div>

      {isRevealed && (
        <div className="revealed-answer">
          {/* UPDATED: Display both title and artist */}
          <p>{title} - <strong>{artist}</strong></p>
        </div>
      )}
    </div>
  );
}

export default SongCard;

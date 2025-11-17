import React, { useState, useRef, useEffect } from 'react';
import './Game.css';

function SongCard({ songNumber, src, title, artist }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const audioRef = useRef(null);

  // Function to handle toggling play/stop
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.currentTime = 0; // Always play from the start
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleReveal = () => {
    setIsRevealed(true);
    // Stop the music when revealing the answer
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Effect to handle when the song ends on its own
  useEffect(() => {
    const audio = audioRef.current;
    const handleSongEnd = () => setIsPlaying(false);

    if (audio) {
      audio.addEventListener('ended', handleSongEnd);
    }

    // Cleanup function to remove the event listener
    return () => {
      if (audio) {
        audio.removeEventListener('ended', handleSongEnd);
      }
    };
  }, []);

  // Determine the button text
  const getButtonText = () => {
    if (isPlaying) {
      return 'Stop';
    }
    // If we get here, it's not playing. We can just show "Play"
    // The "Play Again" logic is implicitly handled by restarting the audios.
    return 'Play'; 
  };

  return (
    <div className="song-card">
      <audio ref={audioRef} src={src} />
      <h3>Song #{songNumber}</h3>
      
      <div className="song-card-buttons">
        <button onClick={togglePlay} className="game-button">
          {getButtonText()}
        </button>
        <button onClick={handleReveal} className="game-button" disabled={isRevealed}>
          Reveal
        </button>
      </div>

      {isRevealed && (
        <div className="revealed-answer">
          <p>{title} - <strong>{artist}</strong></p>
        </div>
      )}
    </div>
  );
}

export default SongCard;

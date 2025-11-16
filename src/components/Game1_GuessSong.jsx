import React from 'react';
import SongCard from './SongCard'; // Import the new component
import './Game.css';

// --- BẠN SẼ THAY ĐỔI NỘI DUNG Ở ĐÂY ---
// UPDATED: The data structure now includes title and artist
const songs = [
  { src: '/audio/1.mp3', title: 'Blinding Lights', artist: 'The Weeknd' },
  { src: '/audio/2.mp3', title: 'Shape of You', artist: 'Ed Sheeran' },
  { src: '/audio/3.mp3', title: 'Levitating', artist: 'Dua Lipa' },
  { src: '/audio/4.mp3', title: 'Watermelon Sugar', artist: 'Harry Styles' },
];
// -----------------------------------------

function Game1_GuessSong() {
  return (
    <div className="game-container">
      <h2>Game 1: Guess the Song</h2>
      <p className="description">
        Listen to the songs and try to guess the name. Click "Reveal" when you are ready!
      </p>
      
      <div className="song-grid">
        {songs.map((song, index) => (
          <SongCard 
            key={index}
            songNumber={index + 1}
            src={song.src}
            // UPDATED: Pass title and artist as props
            title={song.title}
            artist={song.artist}
          />
        ))}
      </div>
    </div>
  );
}

export default Game1_GuessSong;

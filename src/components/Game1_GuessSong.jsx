import React from 'react';
import SongCard from './SongCard';
import './Game.css';

const songs = [
  { src: '/audios/1.mp3', title: 'Chuyện Thường', artist: 'Thắng Ngọt' },
  { src: '/audios/2.mp3', title: 'Yummy', artist: 'Justin Bieber' },
  { src: '/audios/3.mp3', title: 'Bạc Phận', artist: 'Jack67' },
  { src: '/audios/4.mp3', title: 'Maskoff', artist: 'Future' },
];

function Game1_GuessSong() {
  return (
    <div className="game-container">
      <h2>Game 1: Guess the Song</h2>
      <p className="description">
        Listen to the songs and try to guess. Click 'Reveal' when you are ready!
      </p>

      <div className="song-grid">
        {songs.map((song, index) => (
          <SongCard
            key={index}
            songNumber={index + 1}
            src={song.src}
            title={song.title}
            artist={song.artist}
          />
        ))}
      </div>
    </div>
  );
}

export default Game1_GuessSong;

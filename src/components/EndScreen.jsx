import  React from 'react';
import './Game.css';

function EndScreen() {
  return (
    <div className="game-container">
      <h2>Congratulations!</h2>
      <p className="description">
        You have completed all the music challenges. Well done!
      </p>
    </div>
  );
}

export default EndScreen;

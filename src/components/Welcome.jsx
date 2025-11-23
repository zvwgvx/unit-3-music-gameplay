import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

function Welcome() {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/game1');
    };

    return (
        <div className="welcome-container">
            {/* Background Decorations */}
            <div className="welcome-bg-decoration">
                {/* Musical Notes */}
                <div className="music-note">♪</div>
                <div className="music-note">♫</div>
                <div className="music-note">♩</div>
                <div className="music-note">♬</div>
                <div className="music-note">♭</div>
                <div className="music-note">♮</div>
                <div className="music-note">♯</div>

                {/* Snowflakes - Generating a few for effect */}
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="snowflake"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${5 + Math.random() * 10}s`,
                            animationDelay: `${Math.random() * 5}s`,
                            opacity: Math.random() * 0.5 + 0.3,
                            fontSize: `${0.8 + Math.random() * 1}rem`
                        }}
                    >
                        ❄
                    </div>
                ))}
            </div>

            <div className="welcome-content">
                {/* Vinyl Record Visual */}
                <div className="vinyl-container">
                    <div className="vinyl-grooves"></div>
                    <div className="vinyl-label">
                        <span style={{ fontSize: '1.5rem' }}>🎄</span>
                    </div>
                </div>

                <div className="welcome-badge">
                    ❄️ Interactive Music Session ❄️
                </div>

                <h1 className="welcome-title">
                    Unit 3: Music Challenge
                </h1>

                <p className="welcome-subtitle">
                    A cozy review with <span className="highlight-group">Group 3</span> (ITK 67).
                </p>

                <div className="start-button-container">
                    <div className="start-btn" onClick={handleStart}>
                        <span style={{ marginLeft: '4px' }}>▶</span>
                    </div>

                    <div className="press-hint">
                        Press Right Arrow or Click Start
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;

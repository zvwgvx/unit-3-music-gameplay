import React, { useState, useEffect } from 'react';

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

const ScaleWrapper = ({ children }) => {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            const scaleX = window.innerWidth / DESIGN_WIDTH;
            const scaleY = window.innerHeight / DESIGN_HEIGHT;
            const newScale = Math.min(scaleX, scaleY);
            setScale(newScale);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial calculation

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent', // Transparent to show body background
            }}
        >
            <div
                style={{
                    width: `${DESIGN_WIDTH}px`,
                    height: `${DESIGN_HEIGHT}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center',
                    position: 'relative',
                    overflow: 'hidden', // Ensure content doesn't spill out of the slide
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default ScaleWrapper;

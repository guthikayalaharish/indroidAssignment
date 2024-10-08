// src/components/PlayerInput.js
import React, { useState } from 'react';

const PlayerInput = ({ setPlayerName, setInGame }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setPlayerName(name);
        setInGame(true); // Move to the game screen
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Enter your name to start the game:</h2>
            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter your name to enter the game" 
                required 
            />
            <button type="submit">Start Game</button>
        </form>
    );
};

export default PlayerInput;

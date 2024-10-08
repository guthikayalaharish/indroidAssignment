// src/components/MobileView.js
import React, { useState } from 'react';

const MobileView = ({ question, options, onSubmit }) => {
    const [name, setName] = useState("");
    const [selectedOption, setSelectedOption] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(name, selectedOption);
    };

    return (
        <div>
            <h2>{question}</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Enter your name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <div>
                    {Object.entries(options).map(([key, value]) => (
                        <div key={key}>
                            <label>
                                <input
                                    type="radio"
                                    value={key}
                                    checked={selectedOption === key}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                    required
                                />
                                {key}: {value}
                            </label>
                        </div>
                    ))}
                </div>
                <button type="submit">Submit Answer</button>
            </form>
        </div>
    );
};

export default MobileView;

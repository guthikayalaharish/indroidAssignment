// src/components/Game.js
import React, { useState } from 'react';
import QrCode from './QrCode';

const questions = [
    {
        question: "What is the capital of France?",
        options: { A: "Berlin", B: "Madrid", C: "Paris", D: "Lisbon" },
        answer: "C",
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: { A: "Earth", B: "Mars", C: "Jupiter", D: "Saturn" },
        answer: "B",
    },
    {
        question: "What is the largest ocean on Earth?",
        options: { A: "Atlantic Ocean", B: "Indian Ocean", C: "Arctic Ocean", D: "Pacific Ocean" },
        answer: "D",
    },
    {
        question: "Which is the smallest country in the world?",
        options: { A: "Monaco", B: "Vatican City", C: "San Marino", D: "Liechtenstein" },
        answer: "B",
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: { A: "Charles Dickens", B: "J.K. Rowling", C: "William Shakespeare", D: "Mark Twain" },
        answer: "C",
    },
];

const Game = ({ playerName, setCongratulationMessage }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false); // Flag to check if game is over

    const handleAnswer = (selectedOption) => {
        const correctAnswer = questions[currentQuestion].answer;
        if (selectedOption === correctAnswer) {
            // Update the congratulatory message in the App component
            setCongratulationMessage(`Congratulations ${playerName}, you have answered correctly!`);

            // Move to the next question after a delay
            setTimeout(() => {
                setCongratulationMessage(''); // Clear message
                setCurrentQuestion((prev) => (prev + 1 < questions.length ? prev + 1 : setIsGameOver(true)));
            }, 3000); // 3 seconds delay before moving to next question
        } else {
            alert("Sorry, that's incorrect!");
        }
    };

    return (
        <div>
            <h1>KBC-Style Game</h1>
            <QrCode value="http://192.168.1.6:3000" /> {/* Replace with your local IP address */}

            {isGameOver ? (
                <h2>Game Over! Thank you for playing!</h2>
            ) : (
                <>
                    <div>
                        <h2>{questions[currentQuestion].question}</h2>
                        <div>
                            {Object.entries(questions[currentQuestion].options).map(([key, value]) => (
                                <button key={key} onClick={() => handleAnswer(key)}>
                                    {key}: {value}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Game;

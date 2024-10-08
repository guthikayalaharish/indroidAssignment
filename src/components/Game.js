// src/components/Game.js
import React, { useState, useEffect } from 'react';
import QrCode from './QrCode';
import io from 'socket.io-client';

const socket = io('http://192.168.1.6:4000'); // Connect to the WebSocket server

const questions = [
    {
        question: "What is the capital of Telangana?",
        options: ["A) Amaravathi", "B) Hyderabad", "C) Bangalore", "D) Delhi"],
        answer: "B",
    },
    {
        question: "What is the full form of AI?",
        options: ["A) Article index", "B) Artificial intelligence", "C) Artificial input", "D) astroid innovation"],
        answer: "B",
    },
    {
        question: "What is the value of pi?",
        options: ["A) 3.141", "B) 3.541", "C) 3.175", "D) 3.132"],
        answer: "A",
    },
    {
        question: "Who is the current president of india'?",
        options: ["A) Draupadhi Murmu", "B) Amit shah", "C) Narendra Modi", "D) Ramnath Kovind"],
        answer: "A",
    },
    {
        question: "how many sides are there for square?",
        options: ["A) 6", "B) 3", "C) 2", "D) 4"],
        answer: "D",
    },
];

const Game = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [congratulationMessage, setCongratulationMessage] = useState('');

    useEffect(() => {
        socket.on('displayCongrats', (data) => {
            setCongratulationMessage(`Congratulations ${data.playerName}, you have answered correctly!`);
        });
    }, []);

    const handleAnswer = (answer) => {
        const correctAnswer = questions[currentQuestionIndex].answer;
        if (answer === correctAnswer) {
            const playerName = prompt("Enter your name:"); // Get the player's name
            socket.emit('playerAnswered', { playerName, correct: true });
            setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length); // Move to the next question
        } else {
            socket.emit('playerAnswered', { playerName: "Unknown", correct: false }); // Handle wrong answer
        }
    };

    return (
        <div>
            <h1>KBC-Style Game</h1>
            <QrCode value="http://192.168.1.6:3000" /> {}
            {congratulationMessage && <h2>{congratulationMessage}</h2>}
            <h3>{questions[currentQuestionIndex].question}</h3>
            <div>
                {questions[currentQuestionIndex].options.map((option, index) => (
                    <button key={index} onClick={() => handleAnswer(option.charAt(0))}>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Game;

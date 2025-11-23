import React, { useState } from 'react';
import './Game.css';

const quizData = [
  {
    question: "Which of these is a type of musical composition?",
    options: ["Sonata", "Sonnet", "Stanza", "Sestina"],
    correctAnswer: "Sonata"
  },
  {
    question: "The term 'adagio' indicates that the music should be played...",
    options: ["Quickly and lively", "Slowly", "Loudly", "Quietly"],
    correctAnswer: "Slowly"
  },
  {
    question: "Which letter is used to represent the Treble Clef?",
    options: ["F", "C", "G", "B"],
    correctAnswer: "G"
  },
  {
    question: "How many keys are on a standard piano?",
    options: ["66", "88", "72", "96"],
    correctAnswer: "88"
  },
  {
    question: "Who is known as the 'King of Pop'?",
    options: ["Elvis Presley", "Michael Jackson", "Prince", "Freddie Mercury"],
    correctAnswer: "Michael Jackson"
  },
  {
    question: "How many strings does a standard violin have?",
    options: ["4", "6", "5", "3"],
    correctAnswer: "4"
  },
  {
    question: "Which is the highest female voice type?",
    options: ["Alto", "Soprano", "Mezzo-Soprano", "Contralto"],
    correctAnswer: "Soprano"
  },
  {
    question: "Which city is considered the birthplace of Jazz?",
    options: ["Chicago", "New York", "New Orleans", "Memphis"],
    correctAnswer: "New Orleans"
  },
  {
    question: "In a 4/4 time signature, how many beats are in a measure?",
    options: ["3", "4", "2", "6"],
    correctAnswer: "4"
  },
  {
    question: "What symbol indicates silence in music?",
    options: ["Note", "Rest", "Clef", "Staff"],
    correctAnswer: "Rest"
  }
];

function Game4_GrandQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  // Score is less important for presentation, but we keep it internally
  const [score, setScore] = useState(0);

  const currentQuestion = quizData[currentQuestionIndex];

  const handleAnswerClick = (option) => {
    if (isAnswered) return;

    setSelectedAnswer(option);
    setIsAnswered(true);
    if (option === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // End of quiz
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const isQuizFinished = currentQuestionIndex >= quizData.length;

  if (isQuizFinished) {
    return (
      <div className="game-container">
        <h2>Grand Quiz Complete!</h2>
        <div className="revealed-answer" style={{ marginTop: '40px' }}>
          <p style={{ fontSize: '1.5rem' }}>Thank you for playing!</p>
          <p>You answered {score} out of {quizData.length} correctly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <h2>Game 4: Grand Quiz</h2>
      <div className="round-indicator">
        Question {currentQuestionIndex + 1} of {quizData.length}
      </div>
      <p className="description">Select the correct answer.</p>

      <div style={{ width: '100%', maxWidth: '800px' }}>
        <p className="quiz-question">{currentQuestion.question}</p>
        <div className="quiz-options">
          {currentQuestion.options.map((option, index) => {
            let buttonClass = 'quiz-option-button';
            if (isAnswered) {
              // Always highlight the correct answer in green
              if (option === currentQuestion.correctAnswer) {
                buttonClass += ' correct';
              }
              // Highlight selected wrong answer in red
              else if (option === selectedAnswer) {
                buttonClass += ' incorrect';
              }
            }
            return (
              <button
                key={index}
                className={buttonClass}
                onClick={() => handleAnswerClick(option)}
                disabled={isAnswered}
              >
                {option}
              </button>
            );
          })}
        </div>
        {isAnswered && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button onClick={handleNextQuestion} className="game-button">
              {currentQuestionIndex < quizData.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Game4_GrandQuiz;

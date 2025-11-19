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
];

function Game4_GrandQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
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
    }
  };

  const isQuizFinished = currentQuestionIndex >= quizData.length - 1 && isAnswered;

  return (
    <div className="game-container">
      <h2>Game 4: Grand Quiz</h2>
      <div className="round-indicator">
        Question {currentQuestionIndex + 1} of {quizData.length}
      </div>
      <p className="description">Answer the multiple-choice questions about music theory and culture.</p>
      
      <div style={{width: '100%', maxWidth: '600px'}}>
        <p className="quiz-question">{currentQuestion.question}</p>
        <div className="quiz-options">
          {currentQuestion.options.map((option, index) => {
            let buttonClass = 'quiz-option-button';
            if (isAnswered) {
              if (option === currentQuestion.correctAnswer) {
                buttonClass += ' correct';
              } else if (option === selectedAnswer) {
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
          <div style={{textAlign: 'center', marginTop: '20px'}}>
            {!isQuizFinished ? (
              <button onClick={handleNextQuestion} className="game-button">
                Next Question
              </button>
            ) : (
              <div className="revealed-answer">
                <p>Quiz Finished! Your score: {score}/{quizData.length}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Game4_GrandQuiz;

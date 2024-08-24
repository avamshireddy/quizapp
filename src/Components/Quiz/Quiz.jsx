import React, { useState } from 'react';
import './Quiz.css';
import quizData from '../../assets/data';
import quizIcon from '../../assets/f3115dbe-e2a0-4b15-b95e-f341c9299f9b_900_900.jpeg'; // Updated image name

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [correctCount, setCorrectCount] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const question = quizData[index];

    const handleOptionClick = (option) => {
        if (quizCompleted || selectedAnswers[index] !== undefined) return; 
        
        const isAnswerCorrect = option === question.answer;
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[index] = option;
        setSelectedAnswers(updatedAnswers);

        if (isAnswerCorrect) {
            setCorrectCount(correctCount + 1);
        }
    };

    const handleNextQuestion = () => {
        if (index < quizData.length - 1) {
            setIndex(index + 1);
        } else {
            setQuizCompleted(true);
        }
    };

    const handlePreviousQuestion = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    const getPerformanceMessage = () => {
        const percentage = (correctCount / quizData.length) * 100;
        if (percentage === 100) {
            return "Excellent job! You got all the answers right!";
        } else if (percentage >= 80) {
            return "Great work! You scored high!";
        } else if (percentage >= 50) {
            return "Good effort! You scored above average.";
        } else {
            return "Keep trying! You can do better.";
        }
    };

    return (
        <div className='container'>
            <div className="header">
                <img src={quizIcon} alt="Quiz Icon" className="quiz-icon" /> {/* Use the updated image */}
                <h1>Quiz</h1>
            </div>
            <hr />
            {!quizCompleted ? (
                <>
                    <h2>{index + 1}. {question.question}</h2>
                    <ul>
                        {question.options.map((option, i) => (
                            <li 
                                key={i} 
                                onClick={() => handleOptionClick(option)}
                                className={
                                    selectedAnswers[index] !== undefined 
                                    ? (option === question.answer 
                                        ? 'correct' 
                                        : (option === selectedAnswers[index] ? 'incorrect' : '')
                                      ) 
                                    : ''
                                }
                                role="button"
                                aria-pressed={selectedAnswers[index] === option ? "true" : "false"}
                                disabled={selectedAnswers[index] !== undefined}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                    {selectedAnswers[index] !== undefined && (
                        <div className={`feedback ${selectedAnswers[index] === question.answer ? 'correct' : 'incorrect'}`} aria-live="polite">
                            {selectedAnswers[index] === question.answer ? "Correct!" : `Incorrect! The correct answer is ${question.answer}.`}
                        </div>
                    )}

                    <div className="button-group">
                        <button onClick={handlePreviousQuestion} disabled={index === 0} aria-label="Previous question">Previous</button>
                        <button onClick={handleNextQuestion} aria-label="Next question">Next</button>
                    </div>
                    <div className="index">{index + 1} of {quizData.length} questions</div>
                </>
            ) : (
                <div className="results" aria-live="polite">
                    <h2>Quiz Completed!</h2>
                    <p>You got {correctCount} out of {quizData.length} correct.</p>
                    <p>{getPerformanceMessage()}</p>
                </div>
            )}
        </div>
    );
};

export default Quiz;

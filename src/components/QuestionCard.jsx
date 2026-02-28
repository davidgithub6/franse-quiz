import React from 'react';
import './QuestionCard.css';

const QuestionCard = ({ question, image }) => {
    return (
        <div className="question-card fade-in">
            {image && (
                <div className="question-image-container">
                    <img src={image} alt="Quiz context" className="question-image" />
                </div>
            )}
            <h2 className="question-text">{question}</h2>
        </div>
    );
};

export default QuestionCard;

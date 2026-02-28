import React from 'react';
import './FeedbackOverlay.css';

const FeedbackOverlay = ({ isCorrect, onContinue }) => {
    return (
        <div className={`feedback-overlay slide-up ${isCorrect ? 'correct' : 'incorrect'}`}>
            <div className="feedback-content">
                <div className="feedback-message">
                    <div className="feedback-icon">
                        {isCorrect ? '✓' : '✗'}
                    </div>
                    <h3>{isCorrect ? 'Uitstekend!' : 'Helaas, dat is onjuist.'}</h3>
                </div>
                <button
                    className={`btn ${isCorrect ? '' : 'danger'}`}
                    onClick={onContinue}
                >
                    Doorgaan
                </button>
            </div>
        </div>
    );
};

export default FeedbackOverlay;

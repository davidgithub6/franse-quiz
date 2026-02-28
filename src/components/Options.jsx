import React from 'react';
import './Options.css';

const Options = ({ options, selectedOption, onSelectOption, isSubmitted, correctAnswerIndex }) => {
    return (
        <div className="options-container fade-in">
            {options.map((option, index) => {
                let optionStateClass = '';

                if (isSubmitted) {
                    if (index === correctAnswerIndex) {
                        optionStateClass = 'correct';
                    } else if (index === selectedOption) {
                        optionStateClass = 'incorrect';
                    } else {
                        optionStateClass = 'disabled';
                    }
                } else if (selectedOption === index) {
                    optionStateClass = 'selected';
                }

                return (
                    <button
                        key={index}
                        className={`option-btn ${optionStateClass}`}
                        onClick={() => !isSubmitted && onSelectOption(index)}
                        disabled={isSubmitted}
                    >
                        {option}
                    </button>
                );
            })}
        </div>
    );
};

export default Options;

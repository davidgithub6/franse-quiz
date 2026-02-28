import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ current, total }) => {
    const percentage = Math.min(100, Math.max(0, (current / total) * 100));

    return (
        <div className="progress-container">
            <div className="progress-bar-bg">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${percentage}%` }}
                >
                    <div className="progress-bar-highlight"></div>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;

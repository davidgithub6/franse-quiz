import { useState } from 'react';
import { questions } from './data/questions';
import QuestionCard from './components/QuestionCard';
import Options from './components/Options';
import FeedbackOverlay from './components/FeedbackOverlay';
import ProgressBar from './components/ProgressBar';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('START'); // START, QUIZ, RESULTS

  const [currentQueue, setCurrentQueue] = useState([]); // Remaining questions in queue
  const [mistakesQueue, setMistakesQueue] = useState([]); // Mistakes made
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index in total context for progress

  const [activeQuestion, setActiveQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const [score, setScore] = useState(0);
  const totalQuestions = questions.length;
  // Progress counter
  const [progress, setProgress] = useState(0);
  // Track if we are in the 'review' phase
  const [isReviewPhase, setIsReviewPhase] = useState(false);

  const startQuiz = () => {
    setCurrentQueue([...questions]);
    setMistakesQueue([]);
    setScore(0);
    setProgress(0);
    setIsReviewPhase(false);

    // Set first question
    setActiveQuestion(questions[0]);
    setIsSubmitted(false);
    setSelectedOption(null);
    setGameState('QUIZ');
  };

  const checkAnswer = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);

    const correct = selectedOption === activeQuestion.correctAnswerIndex;
    setIsCorrect(correct);

    if (correct) {
      if (!isReviewPhase) {
        setScore(prev => prev + 1);
      }
    } else {
      // Add to mistakes queue if not already there or even if it is, we might want to re-ask it until correct
      setMistakesQueue(prev => [...prev, activeQuestion]);
    }
  };

  const handleContinue = () => {
    setProgress(prev => prev + 1); // Progress strictly goes up

    const newQueue = currentQueue.slice(1);

    if (newQueue.length > 0) {
      // Still have questions in the current queue
      setCurrentQueue(newQueue);
      setActiveQuestion(newQueue[0]);
      resetQuestionState();
    } else if (mistakesQueue.length > 0) {
      // Current queue empty, but we have mistakes! Enter review phase.
      setIsReviewPhase(true);
      setCurrentQueue([...mistakesQueue]);
      setActiveQuestion(mistakesQueue[0]);
      setMistakesQueue([]); // Clear mistakes queue, will repopulate if they fail again
      resetQuestionState();
    } else {
      // All queues empty!
      setGameState('RESULTS');
    }
  };

  const resetQuestionState = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setIsCorrect(false);
  };

  // The true total operations expected:
  // Usually progress maxes out when all are done, but it can exceed if there are mistakes.
  // We can just keep progress bar based on (progress / (totalQuestions + additionalMistakes))
  // But Duolingo usually fills the bar once you hit totalQuestions. 
  // Let's assume the bar requires totalQuestions + remaining mistakes in currentQueue + mistakesQueue length
  const totalBarLength = totalQuestions + (isReviewPhase ? currentQueue.length + mistakesQueue.length - 1 : mistakesQueue.length);

  return (
    <div className="app-container">
      {gameState === 'START' && (
        <div className="start-screen fade-in">
          <h1>France Quiz</h1>
          <p>Test je kennis over Franse aardrijkskunde, kunst en bezienswaardigheden!</p>
          <button className="btn" onClick={startQuiz}>Start Nu</button>
        </div>
      )}

      {gameState === 'QUIZ' && activeQuestion && (
        <div className="quiz-screen fade-in">
          <ProgressBar current={progress} total={totalBarLength || totalQuestions} />

          <div className="quiz-content">
            <QuestionCard
              question={activeQuestion.question}
              image={activeQuestion.image}
            />

            <Options
              options={activeQuestion.options}
              selectedOption={selectedOption}
              onSelectOption={setSelectedOption}
              isSubmitted={isSubmitted}
              correctAnswerIndex={activeQuestion.correctAnswerIndex}
            />
          </div>

          <div className="quiz-actions" style={{ marginTop: 'auto', paddingTop: '24px' }}>
            {!isSubmitted && (
              <button
                className="btn"
                onClick={checkAnswer}
                disabled={selectedOption === null}
              >
                Controleer
              </button>
            )}
          </div>

          {isSubmitted && (
            <FeedbackOverlay
              isCorrect={isCorrect}
              onContinue={handleContinue}
            />
          )}
        </div>
      )}

      {gameState === 'RESULTS' && (
        <div className="end-screen fade-in">
          <h2>Quiz Voltooid!</h2>
          <div className="score-display">{score} / {totalQuestions}</div>
          <p>
            {score === totalQuestions
              ? "Perfect! Je bent een echte Frankrijk kenner!"
              : "Goed gedaan! Oefening baart kunst."}
          </p>
          <button className="btn" onClick={startQuiz} style={{ marginTop: '24px' }}>Nog een keer spelen</button>
        </div>
      )}
    </div>
  );
}

export default App;

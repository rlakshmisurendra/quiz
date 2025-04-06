import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain } from 'lucide-react';
import { questions as initialQuestions } from '../data/questions';
import { QuizCard } from './QuizCard';
import { ProgressBar } from './ProgressBar';
import { ScoreCard } from './ScoreCard';
import type { QuizState } from '../types';

export const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const [questions] = useState(initialQuestions);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    selectedAnswers: Array(questions.length).fill(null),
    seenQuestions: new Set(),
    isFinished: false,
    score: 0,
  });
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0 && !quizState.selectedAnswers[quizState.currentQuestion]) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !quizState.selectedAnswers[quizState.currentQuestion]) {
      handleSelectAnswer('');
      handleNext();
    }
    return () => clearInterval(timer);
  }, [timeLeft, isActive, quizState.currentQuestion]);

  useEffect(() => {
    setTimeLeft(60);
  }, [quizState.currentQuestion]);

  const handleSelectAnswer = (answer: string) => {
    const newSelectedAnswers = [...quizState.selectedAnswers];
    newSelectedAnswers[quizState.currentQuestion] = answer;
    
    const newScore = newSelectedAnswers.reduce((score, selected, index) => 
      selected === questions[index].correct ? score + 1 : score, 0
    );

    const newSeen = new Set(quizState.seenQuestions);
    newSeen.add(quizState.currentQuestion);

    setQuizState(prev => ({
      ...prev,
      selectedAnswers: newSelectedAnswers,
      seenQuestions: newSeen,
      score: newScore,
    }));
  };

  const handleNext = () => {
    if (quizState.currentQuestion < questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
    } else {
      setQuizState(prev => ({
        ...prev,
        isFinished: true,
      }));
    }
  };

  const handlePrevious = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
      }));
    }
  };

  const handleRestart = () => {
    setQuizState({
      currentQuestion: 0,
      selectedAnswers: Array(questions.length).fill(null),
      seenQuestions: new Set(),
      isFinished: false,
      score: 0,
    });
    setTimeLeft(60);
    setIsActive(false);
  };

  const startQuiz = () => {
    setIsActive(true);
  };

  if (!isActive && !quizState.isFinished) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-12 h-12 text-blue-500" />
            <h1 className="text-4xl font-bold text-gray-800">Ready to Start?</h1>
          </div>
          <p className="text-gray-600 text-lg mb-8">
            You'll have 60 seconds for each question.
          </p>
          <button
            onClick={startQuiz}
            className="px-8 py-4 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
          >
            Begin Quiz
          </button>
        </div>
      </div>
    );
  }

  if (quizState.isFinished) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <ScoreCard
          score={quizState.score}
          total={questions.length}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Brain className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-800">Quiz Master</h1>
        </div>
        
        <ProgressBar
          current={quizState.currentQuestion}
          total={questions.length}
        />

        <div className="mb-4 text-xl font-semibold text-gray-700">
          Time Left: {timeLeft} seconds
        </div>
      </div>

      {questions.length > 0 ? (
        <>
          <QuizCard
            question={questions[quizState.currentQuestion]}
            selectedAnswer={quizState.selectedAnswers[quizState.currentQuestion]}
            onSelectAnswer={handleSelectAnswer}
            showFeedback={!!quizState.selectedAnswers[quizState.currentQuestion]}
          />

          <div className="max-w-2xl mx-auto mt-8 flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={quizState.currentQuestion === 0}
              className="px-6 py-2 rounded-lg bg-white text-gray-700 shadow-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {quizState.selectedAnswers[quizState.currentQuestion] && (
              <button
                onClick={handleNext}
                className="px-6 py-2 rounded-lg bg-blue-500 text-white shadow-md hover:bg-blue-600"
              >
                {quizState.currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-600">
          No questions available. Please add some questions in the admin panel.
        </div>
      )}
    </div>
  );
};
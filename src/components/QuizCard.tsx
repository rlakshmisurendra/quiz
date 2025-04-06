import React from 'react';
import { Question } from '../types';
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuizCardProps {
  question: Question;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  showFeedback: boolean;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  showFeedback,
}) => {
  const isCorrect = selectedAnswer === question.correct;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{question.question}</h2>
      
      <div className="space-y-4">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const showCorrectHighlight = showFeedback && option === question.correct;
          const showWrongHighlight = showFeedback && isSelected && !isCorrect;
          
          return (
            <button
              key={index}
              onClick={() => !selectedAnswer && onSelectAnswer(option)}
              disabled={!!selectedAnswer}
              className={`w-full text-left p-4 rounded-lg transition-all ${
                isSelected
                  ? 'border-2 border-blue-500'
                  : 'border-2 border-transparent hover:border-blue-200'
              } ${
                showCorrectHighlight
                  ? 'bg-green-50 border-green-500'
                  : showWrongHighlight
                  ? 'bg-red-50 border-red-500'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-700">{option}</span>
                {showFeedback && (
                  <>
                    {option === question.correct && (
                      <CheckCircle2 className="text-green-500 w-5 h-5" />
                    )}
                    {isSelected && !isCorrect && (
                      <XCircle className="text-red-500 w-5 h-5" />
                    )}
                  </>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div className={`mt-6 p-4 rounded-lg ${
          isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {isCorrect ? (
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Correct! Well done!</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              <span>Incorrect. The correct answer is: {question.correct}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
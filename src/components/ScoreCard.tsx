import React from 'react';
import { Trophy } from 'lucide-react';

interface ScoreCardProps {
  score: number;
  total: number;
  onRestart: () => void;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ score, total, onRestart }) => {
  const percentage = (score / total) * 100;
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full mx-auto text-center">
      <div className="flex justify-center mb-6">
        <Trophy className="w-16 h-16 text-yellow-400" />
      </div>
      
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Completed!</h2>
      
      <div className="text-6xl font-bold text-blue-500 mb-4">
        {score}/{total}
      </div>
      
      <p className="text-xl text-gray-600 mb-8">
        You scored {Math.round(percentage)}% - {
          percentage >= 80 ? 'Excellent!' :
          percentage >= 60 ? 'Good job!' :
          'Keep practicing!'
        }
      </p>
      
      <button
        onClick={onRestart}
        className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};
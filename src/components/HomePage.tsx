import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain className="w-12 h-12 text-blue-500" />
          <h1 className="text-4xl font-bold text-gray-800">Quiz Master</h1>
        </div>
        <p className="text-gray-600 text-lg mb-8">
          Test your knowledge with our interactive quiz!
        </p>
        <button
          onClick={() => navigate('/quiz')}
          className="px-8 py-4 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { PlusCircle, Pencil, Trash2, Save, X } from 'lucide-react';
import { Question } from '../types';

interface AdminPageProps {
  questions: Question[];
  onAddQuestion: (question: Question) => void;
  onUpdateQuestion: (index: number, question: Question) => void;
  onDeleteQuestion: (index: number) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  questions,
  onAddQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const emptyQuestion: Question = {
    question: '',
    options: ['', '', '', ''],
    correct: '',
  };
  const [newQuestion, setNewQuestion] = useState<Question>(emptyQuestion);
  const [editingQuestion, setEditingQuestion] = useState<Question>(emptyQuestion);

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.question || newQuestion.options.some(opt => !opt) || !newQuestion.correct) {
      alert('Please fill in all fields');
      return;
    }
    if (!newQuestion.options.includes(newQuestion.correct)) {
      alert('Correct answer must be one of the options');
      return;
    }
    onAddQuestion(newQuestion);
    setNewQuestion(emptyQuestion);
  };

  const handleUpdateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex === null) return;
    
    if (!editingQuestion.question || editingQuestion.options.some(opt => !opt) || !editingQuestion.correct) {
      alert('Please fill in all fields');
      return;
    }
    if (!editingQuestion.options.includes(editingQuestion.correct)) {
      alert('Correct answer must be one of the options');
      return;
    }
    
    onUpdateQuestion(editingIndex, editingQuestion);
    setEditingIndex(null);
    setEditingQuestion(emptyQuestion);
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditingQuestion(questions[index]);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditingQuestion(emptyQuestion);
  };

  const QuestionForm = ({ 
    question, 
    setQuestion, 
    onSubmit, 
    submitText,
    onCancel
  }: {
    question: Question;
    setQuestion: (q: Question) => void;
    onSubmit: (e: React.FormEvent) => void;
    submitText: string;
    onCancel?: () => void;
  }) => (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Question
        </label>
        <input
          type="text"
          value={question.question}
          onChange={(e) => setQuestion({ ...question, question: e.target.value })}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter question"
        />
      </div>

      {question.options.map((option, i) => (
        <div key={i} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Option {i + 1}
          </label>
          <input
            type="text"
            value={option}
            onChange={(e) => {
              const newOptions = [...question.options];
              newOptions[i] = e.target.value;
              setQuestion({ ...question, options: newOptions });
            }}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Enter option ${i + 1}`}
          />
        </div>
      ))}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Correct Answer
        </label>
        <select
          value={question.correct}
          onChange={(e) => setQuestion({ ...question, correct: e.target.value })}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select correct answer</option>
          {question.options.map((option, i) => (
            <option key={i} value={option}>
              {option || `Option ${i + 1}`}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {submitText}
        </button>
      </div>
    </form>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Quiz Admin</h1>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Question</h2>
        <QuestionForm
          question={newQuestion}
          setQuestion={setNewQuestion}
          onSubmit={handleAddQuestion}
          submitText="Add Question"
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">All Questions</h2>
        <div className="space-y-4">
          {questions.map((q, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              {editingIndex === index ? (
                <QuestionForm
                  question={editingQuestion}
                  setQuestion={setEditingQuestion}
                  onSubmit={handleUpdateQuestion}
                  submitText="Save Changes"
                  onCancel={cancelEditing}
                />
              ) : (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    {q.question}
                  </h3>
                  <ul className="list-disc list-inside mb-4 space-y-1">
                    {q.options.map((option, i) => (
                      <li
                        key={i}
                        className={option === q.correct ? 'text-green-600 font-medium' : ''}
                      >
                        {option}
                        {option === q.correct && ' (Correct)'}
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => startEditing(index)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDeleteQuestion(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
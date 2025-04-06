import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { QuizPage } from './components/QuizPage';
import { AdminPage } from './components/AdminPage';
import { Question } from './types';

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleAddQuestion = (question: Question) => {
    setQuestions([...questions, question]);
  };

  const handleUpdateQuestion = (index: number, updatedQuestion: Question) => {
    const newQuestions = [...questions];
    newQuestions[index] = updatedQuestion;
    setQuestions(newQuestions);
  };

  const handleDeleteQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route
        path="/admin"
        element={
          <AdminPage
            questions={questions}
            onAddQuestion={handleAddQuestion}
            onUpdateQuestion={handleUpdateQuestion}
            onDeleteQuestion={handleDeleteQuestion}
          />
        }
      />
    </Routes>
  );
}

export default App;

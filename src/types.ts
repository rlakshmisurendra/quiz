export interface Question {
  question: string;
  options: string[];
  correct: string;
}

export interface QuizState {
  currentQuestion: number;
  selectedAnswers: (string | null)[];
  seenQuestions: Set<number>;
  isFinished: boolean;
  score: number;
}
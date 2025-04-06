import { Question } from '../types';

export const questions: Question[] = [
  {
    question: "What is React's virtual DOM?",
    options: [
      "A complete copy of the actual DOM",
      "A lightweight copy of the actual DOM",
      "A programming concept unrelated to DOM",
      "A browser feature"
    ],
    correct: "A lightweight copy of the actual DOM"
  },
  {
    question: "Which hook is used for side effects in React?",
    options: [
      "useEffect",
      "useState",
      "useContext",
      "useReducer"
    ],
    correct: "useEffect"
  }
];
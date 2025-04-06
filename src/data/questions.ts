import { Question } from '../types';

export const questions: Question[] = [
  {
  question: "Which keyword is used to create a function in Python?",
  options: [
    "func",
    "define",
    "def",
    "function"
  ],
  correct: "def"
},
{
  question: "How do you start a comment in Python?",
  options: [
    "//",
    "#",
    "/*",
    "--"
  ],
  correct: "#"
},
{
  question: "Which data type is immutable in Python?",
  options: [
    "List",
    "Dictionary",
    "Set",
    "Tuple"
  ],
  correct: "Tuple"
},
{
  question: "What is the output of 'type(10)' in Python?",
  options: [
    "<class 'int'>",
    "<type 'integer'>",
    "int",
    "integer"
  ],
  correct: "<class 'int'>"
},
{
  question: "Which method is used to add an item to a list?",
  options: [
    "add()",
    "append()",
    "insert()",
    "push()"
  ],
  correct: "append()"
},
{
  question: "What is the purpose of the 'pass' statement in Python?",
  options: [
    "To exit a loop",
    "To throw an error",
    "To do nothing",
    "To skip a function"
  ],
  correct: "To do nothing"
},
{
  question: "Which of these is used to handle exceptions in Python?",
  options: [
    "try-except",
    "catch-throw",
    "do-catch",
    "try-catch"
  ],
  correct: "try-except"
},
{
  question: "What does the 'range(5)' function return?",
  options: [
    "List from 1 to 5",
    "List from 0 to 5",
    "List from 0 to 4",
    "List from 1 to 4"
  ],
  correct: "List from 0 to 4"
},
{
  question: "Which operator is used for exponentiation in Python?",
  options: [
    "^",
    "**",
    "%",
    "//"
  ],
  correct: "**"
},
{
  question: "What will 'bool(0)' return in Python?",
  options: [
    "True",
    "False",
    "0",
    "None"
  ],
  correct: "False"
}
];

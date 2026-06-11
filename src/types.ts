export type GameState = 'login' | 'loading' | 'playing' | 'result' | 'error';

export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  shuffled_options: string[];
}

export interface Answer {
  question: string;
  selected: string;
  correct: string;
  isCorrect: boolean;
}

export interface QuizState {
    username: string;
    questions: Question[];
    currentQuestionIndex: number;
    answers: Answer[];
    timer: number;
    gameState: GameState;
}

export interface QuizSession {
  username: string;
  questions: Question[];
  currentIndex: number;
  answers: Answer[];
  timeLeft: number;
  gameState: GameState;
}

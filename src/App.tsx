import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { AlertCircleIcon } from './components/Icons';
import type { Answer, GameState, Question, QuizSession } from './types';
import Login from './components/Login';
import Quiz from './components/Quiz';
import Result from './components/Result';

const TOTAL_TIME = 120;
const API_URL = 'https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple';
const SESSION_KEY = 'quiz_session_v2';

interface OpenTdbQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface OpenTdbResponse {
  response_code: number;
  results: OpenTdbQuestion[];
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>('login');
  const [username, setUsername] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(TOTAL_TIME);
  const [hasSavedSession, setHasSavedSession] = useState<boolean>(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (!saved) return false;

    try {
      const parsedData: QuizSession = JSON.parse(saved);
      return parsedData.gameState === 'playing';
    } catch (e) {
      console.error('Gagal membaca sesi', e);
      return false;
    }
  });

  // Auto-save progres
  useEffect(() => {
    if (gameState === 'playing') {
      const sessionData: QuizSession = { username, questions, currentIndex, answers, timeLeft, gameState };
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    } else if (gameState === 'result') {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [gameState, username, questions, currentIndex, answers, timeLeft]);

  // Logika Timer
  useEffect(() => {
    if (gameState !== 'playing' || timeLeft <= 0) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          setGameState('result');
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [gameState, timeLeft]);

  const fetchQuestions = async () => {
    setGameState('loading');
    try {
      const response = await fetch(API_URL);
      const data = (await response.json()) as OpenTdbResponse;
      
      if (data.response_code !== 0) throw new Error("Gagal mengambil data");

      const formattedQuestions = data.results.map((q) => {
        const options = [...q.incorrect_answers, q.correct_answer];
        return {
          ...q,
          shuffled_options: options.sort(() => Math.random() - 0.5)
        };
      });

      setQuestions(formattedQuestions);
      setCurrentIndex(0);
      setAnswers([]);
      setTimeLeft(TOTAL_TIME);
      setGameState('playing');
    } catch (error) {
      console.error(error);
      setGameState('error');
    }
  };

  const handleStart = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username.trim()) return;
    fetchQuestions();
  };

  const handleResume = () => {
    const saved = localStorage.getItem('quiz_session_v2');
    if (saved) {
      const p: QuizSession = JSON.parse(saved);
      setUsername(p.username);
      setQuestions(p.questions);
      setCurrentIndex(p.currentIndex);
      setAnswers(p.answers);
      setTimeLeft(p.timeLeft);
      setGameState(p.gameState);
    }
  };

  const handleAnswerClick = (selectedOption: string) => {
    const currentQ = questions[currentIndex];
    const isCorrect = selectedOption === currentQ.correct_answer;

    setAnswers((prev) => [...prev, {
      question: currentQ.question, selected: selectedOption, correct: currentQ.correct_answer, isCorrect
    }]);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      localStorage.removeItem(SESSION_KEY);
      setHasSavedSession(false);
      setGameState('result');
    }
  };

  const handleRestart = () => {
    localStorage.removeItem(SESSION_KEY);
    setHasSavedSession(false);
    setGameState('login');
    setUsername('');
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers([]);
  };

  // --- Rendering ---
  if (gameState === 'login') return <Login username={username} setUsername={setUsername} onStart={handleStart} hasSavedSession={hasSavedSession} onResume={handleResume} />;
  
  if (gameState === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mb-4"></div>
        <p className="text-black-600 font-medium text-black">Menyiapkan soal untuk Anda...</p>
      </div>
    );
  }

  if (gameState === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 text-black">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <AlertCircleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Terjadi Kesalahan</h2>
          <p className="text-gray-600 mb-6">Gagal memuat soal dari server.</p>
          <button onClick={() => setGameState('login')} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg">Kembali</button>
        </div>
      </div>
    );
  }

  if (gameState === 'playing' && questions.length > 0) {
    return <Quiz username={username} question={questions[currentIndex]} currentIndex={currentIndex} totalQuestions={questions.length} timeLeft={timeLeft} onAnswerClick={handleAnswerClick} />;
  }

  if (gameState === 'result') {
    return <Result username={username} totalQuestions={questions.length} answers={answers} onRestart={handleRestart} />;
  }

  return null;
}

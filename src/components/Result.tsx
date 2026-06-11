import { CheckCircleIcon, RotateCcwIcon, UserIcon, XCircleIcon } from './Icons';
import type { Answer } from '../types';

interface ResultProps {
  username: string;
  totalQuestions: number;
  answers: Answer[];
  onRestart: () => void;
}

export default function Result({ username, totalQuestions, answers, onRestart }: ResultProps) {
  const answeredCount = answers.length;
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const incorrectCount = answeredCount - correctCount;
  const scorePercentage = Math.round((correctCount / totalQuestions) * 100) || 0;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 text-black">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full text-center border border-gray-200">
        <h2 className="text-3xl font-extrabold mb-2">Kuis Selesai!</h2>
        <p className="text-gray-500 mb-8">Kerja bagus, <span className="font-semibold text-black">{username}</span>.</p>

        <div className="relative w-32 h-32 mx-auto mb-8 mt-4 flex items-center justify-center rounded-full border-4 border-red-100 bg-red-50">
          <div>
            <span className="text-3xl font-black text-red-600">{scorePercentage}</span>
            <span className="text-lg text-red-400 font-bold">%</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="text-gray-400 mb-1 flex justify-center"><UserIcon className="w-5 h-5"/></div>
            <p className="text-2xl font-bold">{answeredCount}</p>
            <p className="text-xs text-gray-500 uppercase font-semibold">Dijawab</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="text-gray-800 mb-1 flex justify-center"><CheckCircleIcon className="w-5 h-5"/></div>
            <p className="text-2xl font-bold">{correctCount}</p>
            <p className="text-xs text-gray-500 uppercase font-semibold">Benar</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="text-gray-800 mb-1 flex justify-center"><XCircleIcon className="w-5 h-5"/></div>
            <p className="text-2xl font-bold">{incorrectCount}</p>
            <p className="text-xs text-gray-500 uppercase font-semibold">Salah</p>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center gap-2"
        >
          <RotateCcwIcon className="w-5 h-5" />
          Main Lagi
        </button>
      </div>
    </div>
  );
}

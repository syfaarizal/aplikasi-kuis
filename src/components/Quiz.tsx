import { TimerIcon } from './Icons';
import type { Question } from '../types';

interface QuizProps {
  username: string;
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  timeLeft: number;
  onAnswerClick: (selectedOption: string) => void;
}

export default function Quiz({ username, question, currentIndex, totalQuestions, timeLeft, onAnswerClick }: QuizProps) {
  const isLowTime = timeLeft <= 15;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 text-black">
      <div className="max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div>
            <p className="text-sm text-gray-500 font-medium">Pemain</p>
            <p className="font-bold">{username}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 font-medium">Progres</p>
            <p className="font-bold">Soal {currentIndex + 1} dari {totalQuestions}</p>
          </div>
          <div className={`text-right ${isLowTime ? 'text-red-600 animate-pulse' : 'text-black'}`}>
            <p className="text-sm text-gray-500 font-medium">Waktu</p>
            <div className="flex items-center gap-1 font-bold">
              <TimerIcon className="w-4 h-4" />
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
              {question.category}
            </span>
            <h2 className="text-xl md:text-2xl font-semibold leading-relaxed" dangerouslySetInnerHTML={{ __html: question.question }} />
          </div>

          <div className="space-y-3">
            {question.shuffled_options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => onAnswerClick(option)}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-red-400 hover:bg-gray-50 transition-all font-medium text-gray-800"
                dangerouslySetInnerHTML={{ __html: option }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

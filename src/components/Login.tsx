import type { FormEvent } from 'react';
import { PlayIcon, RotateCcwIcon, UserIcon } from './Icons';

interface LoginProps {
  username: string;
  setUsername: (name: string) => void;
  onStart: (e: FormEvent<HTMLFormElement>) => void;
  hasSavedSession: boolean;
  onResume: () => void;
}

export default function Login({ username, setUsername, onStart, hasSavedSession, onResume }: LoginProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 text-black">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <UserIcon className="h-7 w-7" />
          </div>
          <h1 className="text-3xl text-black-800 font-extrabold">Kuis Aplikasi</h1>
          <p className="mt-2 text-sm text-gray-500">Masukkan nama Anda untuk memulai kuis.</p>
        </div>
        
        <form onSubmit={onStart} className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-xl font-semibold text-gray-700">Nama pemain</span>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
              placeholder="Masukkan nama Anda..."
            />
          </label>
          
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 font-bold text-white transition hover:bg-red-600"
          >
            <PlayIcon className="h-5 w-5" />
            Mulai Kuis
          </button>
        </form>

        {hasSavedSession && (
          <div className="mt-6 border-t border-gray-100 pt-6">
            <p className="mb-3 text-center text-sm text-gray-500">Sesi kuis sebelumnya masih tersimpan.</p>
            <button
                onClick={onResume}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 mt-3 font-semibold text-white transition hover:bg-black-800">
                <RotateCcwIcon className="h-5 w-5" />
                Lanjutkan Kuis
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

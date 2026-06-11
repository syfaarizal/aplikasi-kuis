# Interactive Quiz App - Frontend React.js Challenge

Proyek ini adalah Aplikasi Kuis Interaktif berbasis web yang dibangun menggunakan React.js dan TypeScript. Aplikasi ini dikembangkan secara khusus untuk memenuhi persyaratan Frontend React.js Challenge sebagai bagian dari proses seleksi program magang.

## Fitur Utama (Berdasarkan Kriteria Challenge)

Seluruh kriteria yang diminta dalam instruksi challenge telah diimplementasikan:

- Fitur Login Sederhana: Pengguna diharuskan memasukkan nama (username) sebelum dapat memulai kuis.
- Integrasi OpenTDB API: Soal kuis di-fetch secara dinamis (real-time) dari REST API Open Trivia Database (OpenTDB).
- Kustomisasi Soal: Menggunakan konfigurasi 10 soal, tipe Pilihan Ganda (Multiple Choice), dengan kategori Entertainment: Japanese Anime &amp; Manga.
- Indikator Progres: Layar kuis menampilkan secara jelas informasi pengguna, progres saat ini (contoh: "Soal 3 dari 10"), dan total soal.
- Timer / Waktu Pengerjaan: Terdapat fitur countdown timer dengan batas waktu 120 detik (2 menit).
- Navigasi Satu Arah: UI diatur agar hanya menampilkan satu soal per halaman. Saat pengguna menekan pilihan jawaban, sistem akan merekam jawaban dan otomatis berpindah ke soal berikutnya.
- Auto-Submit & Result Panel: Jika timer mencapai 00:00 atau seluruh soal telah dijawab, sistem akan langsung menutup soal dan menampilkan panel hasil (Result Page) yang berisi persentase akurasi, total soal terjawab, jumlah jawaban benar, dan jumlah jawaban salah.
- Mekanisme Resume (State Persistence) : Menambahkan mekanisme auto-save menggunakan localStorage. Jika pengguna tidak sengaja menutup tab atau browser saat sedang mengerjakan, mereka dapat melanjutkan sesi kuis yang tersimpan beserta sisa waktunya.

## Teknologi yang Digunakan

- Core: React.js (Hooks: useState, useEffect)
- Language: TypeScript (untuk type-safety dan struktur data yang lebih baik)
- Styling: Tailwind CSS (untuk desain UI yang responsif dan modern)
- Icons: Lucide React
- Build Tool: Vite / Create React App

## Struktur Direktori Proyek

Proyek ini dipisahkan menjadi beberapa komponen agar codebase tetap bersih, terukur (scalable), dan mudah di-maintain layaknya standar industri:
```
src/
 ├── types.ts          # Definisi TypeScript Interfaces (GameState, Question, Session, dll)
 ├── App.tsx           # Entry point & State Management utama (Logika Timer & API)
 └── components/
      ├── Login.tsx    # Komponen halaman awal / Login
      ├── Quiz.tsx     # Komponen render soal & interaksi kuis
      └── Result.tsx   # Komponen kalkulasi skor & hasil akhir
```

Cara Menjalankan Proyek Secara Lokal

Untuk menjalankan proyek ini di mesin lokal Anda, ikuti langkah-langkah berikut:

1. Clone repositori ini
```
git clone https://github.com/syfaarizal/aplikasi-kuis
cd kuis-aplikasi
```

2. Install dependensi
Pastikan Anda sudah menginstal Node.js, lalu jalankan:
```
npm install
```

(Jika Anda menggunakan library ikon tertentu seperti Lucide, pastikan untuk menginstalnya: npm install lucide-react)

3. Jalankan Development Server
```
npm run dev
# atau npm start (jika menggunakan Create React App)
```

4. Buka di Browser
Buka http://localhost:5173 (atau port yang tertera pada terminal Anda).

## Catatan Tambahan

Mekanisme resume memanfaatkan localStorage dengan key quiz_session_v2. Sistem secara otomatis menyimpan state setiap kali pengguna menjawab soal atau saat detik timer berkurang. Jika kuis selesai secara normal, cache sesi tersebut akan otomatis dibersihkan.

_Dibuat dengan untuk Frontend React.js Challenge._
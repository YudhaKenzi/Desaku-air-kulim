# Panduan Kontribusi

Terima kasih atas minat Anda untuk berkontribusi pada Aplikasi Pemerintahan Desa! Berikut adalah panduan untuk membantu Anda berkontribusi.

## Proses Kontribusi

1. Fork repositori ini
2. Clone fork Anda ke mesin lokal Anda: `git clone https://github.com/username-anda/aplikasi-pemerintahan-desa.git`
3. Buat branch baru: `git checkout -b fitur-baru`
4. Lakukan perubahan yang diperlukan dan commit: `git commit -m "Tambah fitur baru"`
5. Push ke branch Anda: `git push origin fitur-baru`
6. Buat Pull Request

## Pengembangan

Aplikasi ini menggunakan:

- Frontend: React + TypeScript + TailwindCSS
- Backend: Express + Node.js
- Database: PostgreSQL dengan Drizzle ORM

### Setup Lokal

1. Install dependencies:
   ```
   npm install
   ```

2. Setup variabel lingkungan:
   - Salin `.env.example` ke `.env`
   - Isi credential database dan konfigurasi lainnya

3. Jalankan database migration:
   ```
   npm run db:push
   ```

4. Jalankan aplikasi dalam mode development:
   ```
   npm run dev
   ```

## Panduan Kode

1. Gunakan TypeScript untuk semua kode JavaScript
2. Ikuti style guide ESLint yang sudah dikonfigurasi
3. Pastikan semua fitur baru memiliki dokumentasi yang memadai
4. Tulis komentar untuk kode yang kompleks

## Membuat Issue

Jika Anda menemukan bug atau punya permintaan fitur, silakan buat issue:

1. Gunakan judul yang jelas dan deskriptif
2. Untuk bug, berikan langkah-langkah untuk mereproduksi
3. Untuk fitur, jelaskan kegunaan dan implementasi yang diharapkan

## Proses Review

1. Pull Request akan di-review oleh maintainer
2. Jika ada perubahan yang diperlukan, maintainer akan memberikan komentar
3. Setelah semua perubahan dilakukan, PR akan di-merge

Terima kasih atas kontribusi Anda!
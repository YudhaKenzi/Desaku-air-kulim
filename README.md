# Aplikasi Pemerintahan Desa Air Kulim

Aplikasi web untuk manajemen administrasi pemerintahan desa dengan berbagai fitur seperti dashboard, profil desa, data penduduk, surat-menyurat, keuangan, dan manajemen pembangunan.

## Fitur Utama

- **Autentikasi**: Login sebagai admin atau warga desa
- **Dashboard**: Statistik dan informasi penting
- **Profil Desa**: Informasi lengkap tentang desa
- **Data Penduduk**: Manajemen data penduduk desa
- **Surat Menyurat**: Pembuatan dan manajemen surat-surat
- **Keuangan**: Pencatatan dan manajemen keuangan desa
- **Pembangunan**: Perencanaan dan pelacakan proyek pembangunan
- **Pengaturan**: Konfigurasi aplikasi

## Teknologi

- Frontend: React, TypeScript, Tailwind CSS
- Backend: Express.js, Node.js
- Penyimpanan: In-memory storage (siap untuk deployment gratis)

## Cara Menjalankan Proyek

### Prasyarat

- Node.js (versi 18 atau lebih tinggi)
- npm

### Instalasi

1. Clone repositori ini

```bash
git clone https://github.com/username/desa-air-kulim-app.git
cd desa-air-kulim-app
```

2. Instal dependensi

```bash
npm install
```

3. Jalankan aplikasi dalam mode pengembangan

```bash
npm run dev
```

4. Buka [http://localhost:5000](http://localhost:5000) di browser Anda

### Akun Default

- Admin: username `admin`, password `admin123`
- User: username `user`, password `user123`

## Deployment

Aplikasi ini dapat di-deploy ke GitHub Pages:

1. Perbarui `homepage` di `package.json` jika perlu
2. Jalankan perintah build

```bash
npm run build
```

3. Push ke repositori GitHub Anda dan aktifkan GitHub Pages

## Lisensi

MIT
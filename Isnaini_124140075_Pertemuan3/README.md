# Rak Buku — Manajemen Buku Pribadi

Aplikasi sederhana untuk mencatat buku yang sudah dimiliki, sedang dibaca, atau ingin dibeli. Data disimpan di `localStorage`, jadi tetap ada saat halaman dibuka kembali pada browser yang sama.

## Menjalankan aplikasi

Pastikan Node.js dan npm sudah terpasang.

```bash
npm install
npm run dev
```

Buka alamat lokal yang ditampilkan oleh Vite di terminal.

## Menjalankan pengujian

```bash
npm test -- --run
```

Untuk membuat build produksi:

```bash
npm run build
```

## Fitur

- Menambah, mengedit, dan menghapus buku.
- Mencari buku berdasarkan judul atau penulis.
- Menyaring daftar berdasarkan status.
- Melihat ringkasan jumlah buku.
- Menyimpan data dengan `localStorage`.

## Konsep React yang digunakan

- **Functional components dan Hooks:** `useState` untuk form, filter, dan pencarian; `useEffect` untuk memperbarui judul halaman.
- Context API: `BookContext` menyimpan daftar buku dan menyediakan fungsi tambah, edit, dan hapus.
- React Router: halaman Daftar Buku (`/`) dan Statistik (`/stats`).
- Custom hooks: `useLocalStorage` untuk penyimpanan dan `useBookStats` untuk menghitung ringkasan.
- PropTypes: validasi tipe props komponen.
- Unit testing: Vitest dan React Testing Library untuk menguji fungsi penting.

## Screenshot antarmuka

Setelah menjalankan aplikasi, ambil screenshot halaman Daftar Buku dan Statistik dari browser, lalu simpan di folder `images/` dan tambahkan gambarnya di bagian ini. Screenshot tidak disertakan karena perlu diambil dari aplikasi yang berjalan di perangkat masing-masing.

Contoh penambahan screenshot:

[Halaman daftar buku](images/Daftar-Buku.png)
[Halaman Testing](images/Testing.png)

## Laporan testing

Jalankan `npm test -- --run`, lalu ambil screenshot terminal yang menunjukkan seluruh test berhasil untuk dilampirkan pada laporan tugas.

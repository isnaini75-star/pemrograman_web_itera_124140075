# Mini POS - Kasir & Keranjang Belanja

## Deskripsi

Mini POS adalah aplikasi kasir sederhana yang digunakan untuk mengelola
barang belanja, menghitung total pembayaran, diskon, dan kembalian.

Aplikasi ini dibuat menggunakan HTML, CSS, dan JavaScript.

## Fitur

1. Validasi input barang
2. Tambah barang ke keranjang
3. Menampilkan daftar barang
4. Menghapus barang
5. Menghitung subtotal otomatis
6. Menghitung total belanja
7. Diskon 10%
8. Kode promo HEMAT10
9. Menghitung uang pembayaran
10. Menghitung kembalian
11. Penyimpanan keranjang menggunakan localStorage
12. Transaksi baru / reset keranjang

## Validasi

### Nama Barang
- Wajib diisi
- Minimal 3 karakter

### Harga Satuan
- Wajib berupa angka
- Minimal Rp500

### Jumlah
- Wajib berupa angka bulat
- Minimal 1

## Diskon

Jika total belanja mencapai Rp50.000,
pelanggan mendapatkan diskon sebesar 10%.

Selain itu, pengguna juga dapat menggunakan kode promo:

HEMAT10

## Teknologi

- HTML
- CSS
- JavaScript
- DOM Manipulation
- LocalStorage

## Cara Menjalankan

1. Buka file `index.html`.
2. Masukkan nama barang.
3. Masukkan harga barang.
4. Masukkan jumlah barang.
5. Klik "Tambah ke Keranjang".
6. Barang akan masuk ke tabel keranjang.
7. Sistem menghitung subtotal dan total secara otomatis.
8. Masukkan uang bayar untuk melihat kembalian.
9. Gunakan tombol "Transaksi Baru" untuk mengosongkan keranjang.
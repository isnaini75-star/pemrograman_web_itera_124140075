# Praktikum PAW - Pertemuan 5

## Identitas Mahasiswa
- Nama Lengkap: [Isi nama lengkap]
- NIM: [Isi NIM]
- Kelas Praktikum: [Isi kelas praktikum]

## Deskripsi Program
Program ini merupakan sistem manajemen perpustakaan sederhana menggunakan Python dan konsep Object-Oriented Programming (OOP). Program dapat menambahkan buku dan majalah, menampilkan katalog, mencari item berdasarkan ID atau judul, serta menampilkan status ketersediaan item.

### Penerapan 4 Pilar OOP
1. **Class dan Object**: `LibraryItem`, `Book`, `Magazine`, `Library`, dan `Member` merupakan class. Objek dibuat dari class tersebut untuk mewakili item, perpustakaan, dan anggota.
2. **Inheritance**: `Book` dan `Magazine` mewarisi `LibraryItem`, sehingga menggunakan atribut dan method dasar yang sama.
3. **Encapsulation**: atribut `__koleksi`, `__dipinjam`, serta atribut identitas pada `Member` dibuat private. Atribut tertentu diakses melalui `@property`, sedangkan atribut protected menggunakan awalan satu garis bawah.
4. **Polymorphism**: `Book` dan `Magazine` mengimplementasikan `get_detail()` dan `hitung_denda()` dengan perilaku masing-masing. `Library` dapat memanggil method yang sama tanpa perlu membedakan jenis itemnya.

## Struktur Folder
```text
nama_nim_pertemuan5/
├── latihan/
│   ├── 01_everything_is_object.py
│   ├── 01_procedural_vs_oop.py
│   ├── 02_class_object.py
│   ├── 03_inheritance.py
│   ├── 04_encapsulation.py
│   ├── 05_polymorphism.py
│   └── 06_abstract_class.py
├── tugas_perpustakaan/
│   ├── library_item.py
│   ├── member.py
│   ├── library.py
│   └── main.py
├── README.md
└── .gitignore
```

## Panduan Menjalankan Program
Pastikan Python sudah terpasang. Buka terminal, lalu masuk ke folder tugas:

```bash
cd tugas_perpustakaan
python main.py
```

Jika perintah `python` tidak dikenali di Windows, coba:

```bash
py main.py
```

Program akan menampilkan proses penambahan item, katalog, pencarian berdasarkan ID dan judul, status peminjaman, serta contoh perhitungan denda.

## Screenshot Output
Setelah menjalankan program, ambil screenshot terminal yang memperlihatkan:
- Pesan berhasil menambahkan buku dan majalah.
- Hasil katalog item perpustakaan.
- Hasil pencarian berdasarkan ID dan judul.
- Status item sebelum dan sesudah dipinjam.

Simpan screenshot ke folder ini, misalnya dengan nama `screenshot-output.png`, lalu tambahkan gambar berikut ke README:

```markdown
![Screenshot Output Program](screenshot-output.png)
```

## Catatan
- Ganti identitas mahasiswa pada bagian README sebelum dikumpulkan.
- Folder `latihan/` berisi contoh implementasi konsep OOP dasar. Sesuaikan kembali jika dosen/asisten memberikan instruksi khusus untuk setiap latihan.
- Folder `__pycache__/` dan virtual environment tidak perlu diunggah ke GitHub karena sudah tercantum di `.gitignore`.

# Tugas Praktikum Dasar Pemrograman Python - Pertemuan 4

## Identitas Mahasiswa

- **Nama:** Isnaini Febriana
- **NIM:** 124140075

## Deskripsi Program

### 1. `tugas1_bmi.py` - Program Penghitung BMI
Program meminta pengguna memasukkan berat badan dalam kilogram dan tinggi badan dalam meter. Program menghitung BMI menggunakan rumus berat dibagi tinggi kuadrat, kemudian menentukan kategori berdasarkan percabangan `if-elif-else`. Hasil BMI ditampilkan dengan dua angka di belakang koma.

### 2. `tugas2_nilai_mahasiswa.py` - Pengelolaan Data Nilai Mahasiswa
Program menyimpan lima data mahasiswa dalam sebuah list yang berisi dictionary. Nilai akhir dihitung dari 30% UTS, 40% UAS, dan 30% tugas. Program menentukan grade A-E, menampilkan tabel nilai, serta mencari mahasiswa dengan nilai tertinggi dan terendah.

### 3. `math_operations.py` dan `main.py` - Modul Matematika
`math_operations.py` merupakan modul yang berisi konstanta `PI`, fungsi luas dan keliling persegi, persegi panjang, dan lingkaran, serta fungsi konversi Celsius ke Fahrenheit dan Kelvin.

`main.py` merupakan program utama yang mengimpor modul menggunakan dua cara, yaitu `import math_operations` dan `from math_operations import ...`. Program kemudian menjalankan seluruh fungsi dan menampilkan hasilnya.

## Struktur Folder

```text
Isnaini_124140075_pertemuan4/
├── .gitignore
├── README.md
├── tugas1_bmi.py
├── tugas2_nilai_mahasiswa.py
├── math_operations.py
└── main.py
```

## Cara Menjalankan Program

Pastikan Python sudah terpasang. Buka terminal, kemudian masuk ke folder tugas.

```bash
cd Isnaini_124140075_pertemuan4
```

Jalankan setiap program dengan perintah berikut:

**Soal 1 - Penghitung BMI**
```bash
python tugas1_bmi.py
```
Masukkan berat badan (kg) dan tinggi badan (m) ketika diminta oleh program.

**Soal 2 - Data Nilai Mahasiswa**
```bash
python tugas2_nilai_mahasiswa.py
```

**Soal 3 - Modul Matematika**
```bash
python main.py
```

Pastikan `main.py` dan `math_operations.py` berada di folder yang sama agar modul dapat ditemukan oleh Python.

## Bukti Screenshot Eksekusi

Tambahkan screenshot hasil program yang benar-benar dijalankan di terminal pada bagian ini sebelum mengumpulkan tugas.

![docs_soal1.png]
![docs_soal2.png]
![docs_soal3.png]

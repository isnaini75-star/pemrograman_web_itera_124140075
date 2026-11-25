# RESTful API Manajemen Mahasiswa dan Matakuliah

## Identitas Praktikan
- Nama: Isnaini Febriana
- NIM: 124140075
- Kelas Praktikum: RB

## Deskripsi
Aplikasi RESTful API berbasis Pyramid, SQLAlchemy ORM, Alembic, dan PostgreSQL. Modul Matakuliah menyediakan operasi CRUD untuk data mata kuliah.

## Struktur
text
Isnaini Febriana_124140075_pertemuan6/
├── development.ini
├── production.ini
├── setup.py
├── README.md
├── .gitignore
└── pyramid_mahasiswa/
    ├── __init__.py
    ├── routes.py
    ├── alembic/
    │   ├── env.py
    │   └── versions/
    ├── models/
    │   ├── __init__.py
    │   ├── meta.py
    │   ├── mahasiswa.py
    │   └── matakuliah.py
    ├── scripts/
    │   ├── __init__.py
    │   └── initialize_db.py
    └── views/
        ├── __init__.py
        ├── default.py
        ├── mahasiswa.py
        └── matakuliah.py

## 1. Persiapan
Pastikan Python, PostgreSQL, dan Git sudah terpasang. Buat database PostgreSQL, misalnya `db_pyramid`.

sql
CREATE DATABASE db_pyramid;


Buat dan aktifkan virtual environment (Windows):
powershell
py -m venv venv
venv\Scripts\activate


Instal aplikasi:
  bash
pip install -e .


Sesuaikan `sqlalchemy.url` pada `development.ini` dengan username, password, host, dan nama database PostgreSQL milik Anda.

## 2. Migrasi database
Jalankan dari folder project:
 bash
alembic -c alembic.ini revision --autogenerate -m "create matakuliah table"
alembic -c alembic.ini upgrade head


Jika project praktikum sebelumnya sudah memiliki konfigurasi Alembic dan tabel mahasiswa, pertahankan revision lama dan buat revision baru untuk Matakuliah. Jangan mengganti atau menghapus riwayat migrasi yang sudah ada.

## 3. Inisialisasi data
  bash
initialize_pyramid_db development.ini

Perintah tersebut memasukkan tiga data awal Matakuliah apabila tabel masih kosong.

## 4. Menjalankan server
  bash
pserve development.ini --reload

Server berjalan di `http://localhost:6543`.

## 5. Endpoint Matakuliah

| Method | Endpoint | Keterangan |
| | | |
| GET | `/api/matakuliah` | Daftar semua mata kuliah |
| GET | `/api/matakuliah/{id}` | Detail mata kuliah |
| POST | `/api/matakuliah` | Menambah mata kuliah |
| PUT | `/api/matakuliah/{id}` | Memperbarui mata kuliah |
| DELETE | `/api/matakuliah/{id}` | Menghapus mata kuliah |

### Contoh pengujian cURL

**Melihat semua data**
  bash
curl http://localhost:6543/api/matakuliah

**Melihat detail**
  bash
curl http://localhost:6543/api/matakuliah/1

Menambahkan data
  bash
curl -X POST http://localhost:6543/api/matakuliah \
  -H "Content-Type: application/json" \
  -d "{\"kode_mk\":\"IF2110\",\"nama_mk\":\"Pemrograman Web\",\"sks\":3,\"semester\":3}"

Memperbarui data
  bash
curl -X PUT http://localhost:6543/api/matakuliah/1 \
  -H "Content-Type: application/json" \
  -d "{\"kode_mk\":\"IF2110\",\"nama_mk\":\"Pemrograman Web Lanjut\",\"sks\":3,\"semester\":4}"

Menghapus data
  bash
curl -X DELETE http://localhost:6543/api/matakuliah/1

### Validasi
- Semua field wajib diisi pada POST dan PUT.
- `kode_mk` harus unik.
- `sks` dan `semester` harus berupa bilangan bulat positif.
- API mengembalikan status `400` untuk input tidak valid/duplikat dan `404` jika ID tidak ditemukan.

### 6. Bukti pengujian
Jalankan setiap endpoint melalui cURL atau Postman, lalu masukkan screenshot hasil pengujian di bawah ini sebelum pengumpulan.

***Get Mata Kuliah***
![Hasil Get Mata Kuliah](images/Screenshot%202026-11-25%20161012.png)

![Hasil Get Mata Kuliah 1](images/Screenshot%202026-11-25%20161737.png)

![Hasil post Mata Kuliah](images/Screenshot%202026-11-25%20161943.png)

![Hasil PUT Mata Kuliah 1](images/Screenshot%202026-11-25%20162430.png)

![Hasil DELETE Mata Kuliah](images/Screenshot%202026-11-25%20162644.png)

![Hasil Get Mata Kuliah akhir](images/Screenshot%202026-11-25%20162845.png)

![Hasil Get Mahasiswa](images/Screenshot%202026-11-25%20161038.png)

![Hasil POST mahasiswa](images/Screenshot%202026-11-25%20164246.png)

![Hasil GET mahasiswa 2](images/Screenshot%202026-11-25%20164403.png)

![Hasil PUT mahasiswa 1](images/Screenshot%202026-11-25%20164657.png)

![Hasil DELETE mahasiswa 3](images/Screenshot%202026-11-25%20164717.png)

![Hasil localhost matakuliah](images/Screenshot%202026-11-25%20164854.png)

![Hasil localhost mahasiswa](images/Screenshot%202026-11-25%20164913.png)

![Hasil localhost](images/Screenshot%202026-11-25%20165005.png)

Catatan: Screenshot harus berasal dari pengujian yang benar-benar dilakukan pada database dan server lokal, bukan gambar contoh.
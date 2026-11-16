"""
Program utama untuk menjalankan dan menguji sistem perpustakaan.
Jalankan dari folder tugas_perpustakaan dengan: python main.py
"""
from library import Library
from library_item import Book, Magazine
from member import Member


def main():
    """Menjalankan demonstrasi fitur perpustakaan."""
    perpustakaan = Library("Perpustakaan Sederhana")

    # Membuat beberapa objek dari dua subclass LibraryItem.
    buku1 = Book("B001", "Laskar Pelangi", 2005, "Andrea Hirata")
    buku2 = Book("B002", "Bumi", 2014, "Tere Liye")
    majalah1 = Magazine("M001", "National Geographic", 2024, "Edisi Januari")
    majalah2 = Magazine("M002", "Teknologi Masa Kini", 2025, "Edisi Maret")

    print("MENAMBAHKAN ITEM : ")
    perpustakaan.tambah_item(buku1)
    perpustakaan.tambah_item(buku2)
    perpustakaan.tambah_item(majalah1)
    perpustakaan.tambah_item(majalah2)

    # Menampilkan semua item.
    perpustakaan.tampilkan_katalog()

    # Mencari berdasarkan ID.
    print("\n PENCARIAN BERDASARKAN ID ")
    hasil_id = perpustakaan.cari_berdasarkan_id("B001")
    print(hasil_id.get_detail() if hasil_id else "Item tidak ditemukan.")

    # Mencari berdasarkan judul.
    print("\n  PENCARIAN BERDASARKAN JUDUL ")
    hasil_judul = perpustakaan.cari_berdasarkan_judul("teknologi")
    if hasil_judul:
        for item in hasil_judul:
            print(item.get_detail())
    else:
        print("Item tidak ditemukan.")

    # Demonstrasi status ketersediaan dan property is_dipinjam.
    print("\n STATUS PEMINJAMAN ")
    print(f"Sebelum dipinjam: {buku1.judul} tersedia = {buku1.tersedia}")
    buku1.pinjam()
    print(f"Setelah dipinjam: {buku1.judul} tersedia = {buku1.tersedia}")
    print(f"Status is_dipinjam = {buku1.is_dipinjam}")
    perpustakaan.tampilkan_item_tersedia()

    # Demonstrasi polymorphism pada method hitung_denda().
    print("\n CONTOH DENDA TERLAMBAT 3 HARI ")
    for item in (buku1, majalah1):
        print(f"{item.judul}: Rp{item.hitung_denda(3):,}".replace(",", "."))

    # Contoh penggunaan class Member yang tersedia di member.py.
    anggota = Member("A001", "Isnaini Febriana")
    print("\n" + anggota.get_detail())


if __name__ == "__main__":
    main()

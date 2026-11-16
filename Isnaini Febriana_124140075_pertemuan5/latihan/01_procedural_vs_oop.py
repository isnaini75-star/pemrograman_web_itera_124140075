"""
Perbandingan sederhana pendekatan prosedural dan OOP.
"""

# data dan fungsi ditulis terpisah.
def tampilkan_buku_prosedural(judul, penulis):
    print(f"Judul: {judul} | Penulis: {penulis}")

tampilkan_buku_prosedural("Laskar Pelangi", "Andrea Hirata")


# data dan perilaku digabungkan dalam class.
class Buku:
    """Mewakili sebuah buku."""

    def __init__(self, judul, penulis):
        self.judul = judul
        self.penulis = penulis

    def tampilkan(self):
        """Menampilkan informasi buku."""
        print(f"Judul: {self.judul} | Penulis: {self.penulis}")


buku = Buku("Bumi", "Tere Liye")
buku.tampilkan()

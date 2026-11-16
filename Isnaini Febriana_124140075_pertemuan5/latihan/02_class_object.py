"""
Contoh pembuatan class dan object.
"""

class Mahasiswa:
    """Menyimpan data dasar seorang mahasiswa."""

    def __init__(self, nama, nim):
        self.nama = nama
        self.nim = nim

    def perkenalan(self):
        """Menampilkan identitas mahasiswa."""
        print(f"Halo, saya {self.nama} dengan NIM {self.nim}.")


mahasiswa1 = Mahasiswa("Nama Mahasiswa", "NIM")
mahasiswa1.perkenalan()

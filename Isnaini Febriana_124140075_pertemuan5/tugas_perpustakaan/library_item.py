"""
Modul berisi abstract class LibraryItem dan turunannya, Book serta Magazine.
"""
from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """Class abstrak sebagai dasar semua item perpustakaan."""

    def __init__(self, item_id, judul, tahun_terbit):
        self._item_id = str(item_id)
        self._judul = judul
        self._tahun_terbit = tahun_terbit
        self.__dipinjam = False

    @property
    def item_id(self):
        """Mengambil ID item (read-only)."""
        return self._item_id

    @property
    def judul(self):
        """Mengambil judul item (read-only)."""
        return self._judul

    @property
    def tahun_terbit(self):
        """Mengambil tahun terbit item (read-only)."""
        return self._tahun_terbit

    @property
    def is_dipinjam(self):
        """Mengembalikan True jika item sedang dipinjam."""
        return self.__dipinjam

    @property
    def tersedia(self):
        """Menentukan apakah item tersedia untuk dipinjam."""
        return not self.__dipinjam

    def pinjam(self):
        """Mengubah status item menjadi dipinjam."""
        if self.__dipinjam:
            return False
        self.__dipinjam = True
        return True

    def kembalikan(self):
        """Mengubah status item menjadi tersedia."""
        if not self.__dipinjam:
            return False
        self.__dipinjam = False
        return True

    @abstractmethod
    def get_detail(self):
        """Menghasilkan informasi khusus sesuai jenis item."""
        pass

    @abstractmethod
    def hitung_denda(self, hari_terlambat):
        """Menghitung denda berdasarkan jenis item."""
        pass


class Book(LibraryItem):
    """Item buku dengan informasi penulis dan tarif denda sendiri."""

    DENDA_PER_HARI = 1000

    def __init__(self, item_id, judul, tahun_terbit, penulis):
        super().__init__(item_id, judul, tahun_terbit)
        self._penulis = penulis

    def get_detail(self):
        """Mengembalikan detail buku."""
        return (
            f"Buku \n ID: {self.item_id} \n Judul: {self.judul} "
            f"\n Penulis: {self._penulis} \n Tahun: {self.tahun_terbit}"
        )

    def hitung_denda(self, hari_terlambat):
        """Menghitung denda buku sebesar Rp1.000 per hari."""
        return max(0, hari_terlambat) * self.DENDA_PER_HARI


class Magazine(LibraryItem):
    """Item majalah dengan informasi edisi dan tarif denda sendiri."""

    DENDA_PER_HARI = 500

    def __init__(self, item_id, judul, tahun_terbit, edisi):
        super().__init__(item_id, judul, tahun_terbit)
        self._edisi = edisi

    def get_detail(self):
        """Mengembalikan detail majalah."""
        return (
            f"Majalah \n ID: {self.item_id} \n Judul: {self.judul} "
            f"\n Edisi: {self._edisi} \n Tahun: {self.tahun_terbit}"
        )

    def hitung_denda(self, hari_terlambat):
        """Menghitung denda majalah sebesar Rp500 per hari."""
        return max(0, hari_terlambat) * self.DENDA_PER_HARI

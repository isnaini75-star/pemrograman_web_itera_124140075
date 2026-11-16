"""
Contoh abstract class menggunakan modul abc.
"""
from abc import ABC, abstractmethod


class Bentuk(ABC):
    """Class abstrak yang mewajibkan subclass menghitung luas."""

    @abstractmethod
    def hitung_luas(self):
        """Menghitung luas bentuk."""
        pass


class Persegi(Bentuk):
    """Bentuk persegi."""

    def __init__(self, sisi):
        self.sisi = sisi

    def hitung_luas(self):
        """Mengembalikan luas persegi."""
        return self.sisi ** 2


persegi = Persegi(5)
print("Luas persegi:", persegi.hitung_luas())

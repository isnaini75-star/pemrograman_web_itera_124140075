"""
Contoh encapsulation dengan atribut private dan property.
"""

class Rekening:
    """Menyimpan saldo agar tidak diubah langsung dari luar class."""

    def __init__(self, saldo_awal):
        self.__saldo = saldo_awal

    @property
    def saldo(self):
        """Mengakses saldo secara aman."""
        return self.__saldo

    def setor(self, jumlah):
        """Menambahkan saldo jika jumlah valid."""
        if jumlah <= 0:
            raise ValueError("Jumlah setoran harus lebih dari 0.")
        self.__saldo += jumlah


rekening = Rekening(100000)
rekening.setor(50000)
print("Saldo:", rekening.saldo)

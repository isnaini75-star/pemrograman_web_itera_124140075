"""
Contoh inheritance (pewarisan) pada Python.
"""

class Kendaraan:
    """Class induk untuk kendaraan."""

    def __init__(self, merek):
        self.merek = merek

    def bergerak(self):
        """Perilaku umum kendaraan."""
        print(f"Kendaraan {self.merek} sedang bergerak.")


class Mobil(Kendaraan):
    """Mobil mewarisi atribut dan method dari Kendaraan."""

    def klakson(self):
        """Perilaku khusus mobil."""
        print(f"Mobil {self.merek} membunyikan klakson.")


mobil = Mobil("Toyota")
mobil.bergerak()
mobil.klakson()

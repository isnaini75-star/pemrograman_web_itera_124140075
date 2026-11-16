"""
Contoh polymorphism: method yang sama memiliki perilaku berbeda.
"""

class Kucing:
    """Hewan kucing."""

    def bersuara(self):
        print("Meong")


class Anjing:
    """Hewan anjing."""

    def bersuara(self):
        print("Guk guk")


def bunyikan(hewan):
    """Memanggil method bersuara tanpa perlu mengetahui tipe objeknya."""
    hewan.bersuara()


for hewan in (Kucing(), Anjing()):
    bunyikan(hewan)

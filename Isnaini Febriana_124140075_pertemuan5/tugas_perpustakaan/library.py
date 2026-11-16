"""
Modul pengelolaan koleksi perpustakaan.
"""
from library_item import LibraryItem


class Library:
    """Menyimpan, menampilkan, dan mencari item perpustakaan."""

    def __init__(self, nama):
        self.nama = nama
        self.__koleksi = []

    def tambah_item(self, item):
        """Menambahkan item jika bertipe LibraryItem dan ID belum digunakan."""
        if not isinstance(item, LibraryItem):
            raise TypeError("Item harus merupakan turunan LibraryItem.")

        if any(data.item_id == item.item_id for data in self.__koleksi):
            print(f"Gagal: ID {item.item_id} sudah digunakan.")
            return False

        self.__koleksi.append(item)
        print(f"{item.judul}")
        return True

    def tampilkan_katalog(self, hanya_tersedia=False):
        """Menampilkan seluruh katalog atau hanya item yang tersedia."""
        print(f"\n=== Katalog {self.nama} ===")
        daftar = [
            item for item in self.__koleksi
            if not hanya_tersedia or item.tersedia
        ]

        if not daftar:
            print("Belum ada item yang sesuai.")
            return

        # Polymorphism: pemanggilan get_detail() menyesuaikan subclass item.
        for item in daftar:
            status = "Tersedia" if item.tersedia else "Dipinjam"
            print(f"{item.get_detail()} | Status: {status}")

    def cari_berdasarkan_id(self, item_id):
        """Mencari satu item berdasarkan ID."""
        for item in self.__koleksi:
            if item.item_id.lower() == str(item_id).lower():
                return item
        return None

    def cari_berdasarkan_judul(self, judul):
        """Mencari item berdasarkan sebagian atau seluruh judul."""
        kata_kunci = judul.strip().lower()
        if not kata_kunci:
            return []

        return [
            item for item in self.__koleksi
            if kata_kunci in item.judul.lower()
        ]

    def tampilkan_item_tersedia(self):
        """Menampilkan item yang belum dipinjam."""
        self.tampilkan_katalog(hanya_tersedia=True)

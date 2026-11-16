"""
Modul untuk merepresentasikan anggota perpustakaan.
"""


class Member:
    """Menyimpan identitas anggota dengan atribut private."""

    def __init__(self, member_id, nama):
        self.__member_id = str(member_id)
        self.__nama = nama

    @property
    def member_id(self):
        """Mengambil ID anggota."""
        return self.__member_id

    @property
    def nama(self):
        """Mengambil nama anggota."""
        return self.__nama

    def get_detail(self):
        """Mengembalikan informasi anggota."""
        return f"ID Anggota: {self.member_id} | Nama: {self.nama}"

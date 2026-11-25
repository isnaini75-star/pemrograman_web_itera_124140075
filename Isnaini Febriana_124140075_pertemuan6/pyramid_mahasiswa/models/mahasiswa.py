"""Model contoh minimal; sesuaikan dengan model mahasiswa praktikum sebelumnya."""
from sqlalchemy import Column, Integer, Text
from .meta import Base


class Mahasiswa(Base):
    __tablename__ = "mahasiswa"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nama = Column(Text, nullable=False)
    nim = Column(Text, unique=True, nullable=False)

    def to_dict(self):
        return {"id": self.id, "nama": self.nama, "nim": self.nim}

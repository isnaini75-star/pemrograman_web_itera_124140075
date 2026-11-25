from pyramid.paster import bootstrap, setup_logging
from pyramid_sqlalchemy import Session
from ..models import Matakuliah


DATA_AWAL = [
    {"kode_mk": "IF2110", "nama_mk": "Pemrograman Web", "sks": 3, "semester": 3},
    {"kode_mk": "IF3140", "nama_mk": "Basis Data", "sks": 4, "semester": 5},
    {"kode_mk": "IF2120", "nama_mk": "Struktur Data", "sks": 3, "semester": 3},
]


def main():
    import sys
    config_uri = sys.argv[1] if len(sys.argv) > 1 else "development.ini"
    setup_logging(config_uri)
    with bootstrap(config_uri) as env:
        session = env["request"].dbsession if "request" in env else Session
        if session.query(Matakuliah).count() == 0:
            session.add_all([Matakuliah(**item) for item in DATA_AWAL])
            session.flush()
            print("Seeding 3 data matakuliah berhasil.")
        else:
            print("Data matakuliah sudah tersedia; seeding dilewati.")


if __name__ == "__main__":
    main()

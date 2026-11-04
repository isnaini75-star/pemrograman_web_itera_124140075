"""Program pengelolaan nilai akhir mahasiswa."""

# Menyimpan data mahasiswa dalam list yang berisi dictionary
mahasiswa = [
    {
        "nama": "Regina Cahyani",
        "nim": "124140063",
        "nilai_uts": 85,
        "nilai_uas": 87,
        "nilai_tugas": 90,
    },
    {
        "nama": "Putu Laura",
        "nim": "124140021",
        "nilai_uts": 78,
        "nilai_uas": 82,
        "nilai_tugas": 80,
    },
    {
        "nama": "Yoga Aditomo",
        "nim": "124140081",
        "nilai_uts": 65,
        "nilai_uas": 70,
        "nilai_tugas": 75,
    },
    {
        "nama": "Salsabila",
        "nim": "124140069",
        "nilai_uts": 55,
        "nilai_uas": 60,
        "nilai_tugas": 58,
    },
    {
        "nama": "Guntur Anggoro",
        "nim": "124140105",
        "nilai_uts": 88,
        "nilai_uas": 90,
        "nilai_tugas": 92,
    },
]


def hitung_nilai_akhir(data):
    """Menghitung nilai akhir dari data mahasiswa.

    Parameter:
        data (dict): Dictionary yang berisi nilai UTS, UAS, dan tugas.

    Returns:
        float: Nilai akhir berdasarkan bobot yang ditentukan.
    """

    # Menghitung nilai akhir berdasarkan bobot UTS, UAS, dan tugas
    return (
        0.30 * data["nilai_uts"]
        + 0.40 * data["nilai_uas"]
        + 0.30 * data["nilai_tugas"]
    )


def tentukan_grade(nilai_akhir):
    """Menentukan grade berdasarkan nilai akhir.

    Parameter:
        nilai_akhir (float): Nilai akhir mahasiswa.

    Returns:
        str: Grade A, B, C, D, atau E.
    """
    # Menentukan grade sesuai rentang nilai akhir
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"


def main():
    """Menghitung dan menampilkan seluruh nilai mahasiswa."""
    print("= PROGRAM PENGELOLAAN NILAI MAHASISWA =")

    # Menghitung nilai akhir dan menentukan grade setiap mahasiswa
    for data in mahasiswa:
        data["nilai_akhir"] = hitung_nilai_akhir(data)
        data["grade"] = tentukan_grade(data["nilai_akhir"])

    # Menampilkan judul kolom tabel
    print(
        f"{'Nama':<18} {'NIM':<12} "
        f"{'Nilai Akhir':>12} {'Grade':>7}"
    )
    print("-" * 53)

    # Menampilkan data mahasiswa dalam bentuk tabel
    for data in mahasiswa:
        print(
            f"{data['nama']:<18} "
            f"{data['nim']:<12} "
            f"{data['nilai_akhir']:>12.2f} "
            f"{data['grade']:>7}"
        )

    # Mencari mahasiswa dengan nilai tertinggi dan terendah
    tertinggi = max(mahasiswa, key=lambda data: data["nilai_akhir"])
    terendah = min(mahasiswa, key=lambda data: data["nilai_akhir"])

    # Menampilkan mahasiswa dengan nilai tertinggi
    print("\nNILAI TERTINGGI")
    print(
        f"{tertinggi['nama']} ({tertinggi['nim']}) - "
        f"{tertinggi['nilai_akhir']:.2f} "
        f"(Grade {tertinggi['grade']})"
    )

    # Menampilkan mahasiswa dengan nilai terendah
    print("\nNILAI TERENDAH")
    print(
        f"{terendah['nama']} ({terendah['nim']}) - "
        f"{terendah['nilai_akhir']:.2f} "
        f"(Grade {terendah['grade']})"
    )


if __name__ == "__main__":
    main()

"""Program utama untuk mencoba seluruh fungsi math_operations."""

import math_operations
from math_operations import (
    luas_persegi,
    keliling_persegi,
    luas_persegi_panjang,
    keliling_persegi_panjang,
    luas_lingkaran,
    keliling_lingkaran,
    celsius_ke_fahrenheit,
    celsius_ke_kelvin,
)


def main():
    """Menjalankan contoh perhitungan geometri dan konversi suhu."""
    print("=== PROGRAM MODUL MATEMATIKA PYTHON ===")

    sisi = 5
    panjang = 8
    lebar = 4
    jari_jari = 7
    suhu = 25

    print("\n1. PERSEGI")
    print(f"Sisi: {sisi}")
    print(f"Luas: {luas_persegi(sisi):.2f}")
    print(f"Keliling: {keliling_persegi(sisi):.2f}")

    print("\n2. PERSEGI PANJANG")
    print(f"Panjang: {panjang}, Lebar: {lebar}")
    print(f"Luas: {luas_persegi_panjang(panjang, lebar):.2f}")
    print(
        "Keliling: "
        f"{keliling_persegi_panjang(panjang, lebar):.2f}"
    )

    print("\n3. LINGKARAN")
    print(f"Jari-jari: {jari_jari}")
    print(f"Konstanta PI: {math_operations.PI}")
    print(f"Luas: {luas_lingkaran(jari_jari):.2f}")
    print(f"Keliling: {keliling_lingkaran(jari_jari):.2f}")

    print("\n4. KONVERSI SUHU")
    print(f"Suhu awal: {suhu:.2f} Celsius")
    print(
        "Fahrenheit: "
        f"{celsius_ke_fahrenheit(suhu):.2f} Fahrenheit"
    )
    print(f"Kelvin: {celsius_ke_kelvin(suhu):.2f} Kelvin")


if __name__ == "__main__":
    main()

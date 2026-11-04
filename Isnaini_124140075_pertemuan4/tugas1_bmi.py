"""Program sederhana untuk menghitung BMI dan kategorinya."""


def main():
    """Meminta data berat dan tinggi, lalu menampilkan hasil BMI."""
    print("=== PROGRAM PENGHITUNG BMI ===")

    try:
        # Memasukkan berat dan tinggi badan
        berat = float(input("berat badan(kg)    : "))
        tinggi = float(input("tinggi badan (m)  : "))

        # Memeriksa apakah input lebih dari 0
        if berat <= 0 or tinggi <= 0:
            print("Berat dan tinggi badan harus lebih dari 0.")
            return

        # Menghitung nilai BMI
        bmi = berat / (tinggi * tinggi)

        # Menentukan kategori berdasarkan nilai BMI
        if bmi < 18.5:
            kategori = "Berat badan kurang"
        elif bmi < 25:
            kategori = "Berat badan normal"
        elif bmi < 30:
            kategori = "Berat badan berlebih"
        else:
            kategori = "Obesitas"

        # Menampilkan hasil perhitungan BMI
        print("\n--- HASIL PERHITUNGAN ---")
        print(f"Nilai BMI : {bmi:.2f}")
        print(f"Kategori  : {kategori}")

    except ValueError:
        print("Input harus angka.")


if __name__ == "__main__":
    main()

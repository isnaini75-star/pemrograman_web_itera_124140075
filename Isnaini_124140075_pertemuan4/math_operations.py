"""Modul berisi fungsi geometri dan konversi temperatur."""

# Konstanta nilai PI
PI = 3.14159

# Menghitung luas persegi
def luas_persegi(sisi):
    """Menghitung luas persegi.

    Parameter:
        sisi (float): Panjang sisi persegi.

    Returns:
        float: Luas persegi.
    """
    return sisi * sisi


# Menghitung keliling persegi
def keliling_persegi(sisi):
    """Menghitung keliling persegi.

    Parameter:
        sisi (float): Panjang sisi persegi.

    Returns:
        float: Keliling persegi.
    """
    return 4 * sisi

# Menghitung luas persegi panjang
def luas_persegi_panjang(panjang, lebar):
    """Menghitung luas persegi panjang.

    Parameter:
        panjang (float): Panjang persegi panjang.
        lebar (float): Lebar persegi panjang.

    Returns:
        float: Luas persegi panjang.
    """
    return panjang * lebar

# Menghitung keliling persegi panjang
def keliling_persegi_panjang(panjang, lebar):
    """Menghitung keliling persegi panjang.

    Parameter:
        panjang (float): Panjang persegi panjang.
        lebar (float): Lebar persegi panjang.

    Returns:
        float: Keliling persegi panjang.
    """
    return 2 * (panjang + lebar)


# Menghitung luas lingkaran
def luas_lingkaran(jari_jari):
    """Menghitung luas lingkaran.

    Parameter:
        jari_jari (float): Panjang jari-jari lingkaran.

    Returns:
        float: Luas lingkaran.
    """
    return PI * jari_jari * jari_jari

# Menghitung keliling lingkaran
def keliling_lingkaran(jari_jari):
    """Menghitung keliling lingkaran.

    Parameter:
        jari_jari (float): Panjang jari-jari lingkaran.

    Returns:
        float: Keliling lingkaran.
    """
    return 2 * PI * jari_jari

# Mengonversi suhu Celsius ke Fahrenheit
def celsius_ke_fahrenheit(celsius):
    """Mengubah suhu Celsius menjadi Fahrenheit.

    Parameter:
        celsius (float): Suhu dalam derajat Celsius.

    Returns:
        float: Suhu dalam derajat Fahrenheit.
    """
    return (celsius * 9 / 5) + 32

# Mengonversi suhu Celsius ke Kelvin
def celsius_ke_kelvin(celsius):
    """Mengubah suhu Celsius menjadi Kelvin.

    Parameter:
        celsius (float): Suhu dalam derajat Celsius.

    Returns:
        float: Suhu dalam Kelvin.
    """
    return celsius + 273.15

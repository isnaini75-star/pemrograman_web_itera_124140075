
const output = document.getElementById("output");
const runButton = document.getElementById("runButton");

// 1. CLASS PRODUCT
class Product {
  constructor(name, price) {
    this.name = name;
    this._price = price;
  }

  // Getter untuk mengambil harga
  get price() {
    return this._price;
  }

  // Setter untuk mengubah harga
  set price(newPrice) {
    if (newPrice < 0) {
      throw new Error("Harga tidak boleh negatif!");
    }

    this._price = newPrice;
  }

  getInfo() {
    return `Nama: ${this.name}\nHarga: Rp${this.price}`;
  }
}

// 2. INHERITANCE: DIGITAL PRODUCT
class DigitalProduct extends Product {
  constructor(name, price, fileSize) {
    super(name, price);
    this.fileSize = fileSize;
  }

  getInfo() {
    return `${super.getInfo()}\nJenis: Digital\nUkuran file: ${this.fileSize}`;
  }
}

// 3. INHERITANCE: PHYSICAL PRODUCT
class PhysicalProduct extends Product {
  constructor(name, price, weight) {
    super(name, price);
    this.weight = weight;
  }

  getInfo() {
    return `${super.getInfo()}\nJenis: Fisik\nBerat: ${this.weight} gram`;
  }
}

// 4. COMPUTED PROPERTY NAMES
function createProductObject(key, value) {
  return {
    [key]: value
  };
}

// 5. DEFAULT PARAMETERS + DESTRUCTURING
function displayProduct(
  { name = "Produk tanpa nama", price = 0 } = {}
) {
  return `Nama produk: ${name}\nHarga produk: Rp${price}`;
}

// Jalankan program saat tombol diklik
runButton.addEventListener("click", () => {
  try {
    // Membuat objek produk
    const ebook = new DigitalProduct(
      "Belajar JavaScript",
      50000,
      "15 MB"
    );

    const keyboard = new PhysicalProduct(
      "Keyboard",
      150000,
      500
    );

    // Menggunakan getter
    const hargaAwal = ebook.price;

    // Menggunakan setter
    ebook.price = 60000;

    // Menggunakan computed property names
    const dynamicKey = "kategori";
    const productData = createProductObject(
      dynamicKey,
      "Elektronik"
    );

    // Menggunakan destructuring dan default parameter
    const productDescription = displayProduct({
      name: "Mouse Wireless",
      price: 75000
    });

    // Contoh nilai default
    const defaultDescription = displayProduct();

    // Menampilkan hasil
    output.textContent =
      "=== DIGITAL PRODUCT ===\n" +
      ebook.getInfo() +
      "\n\n=== PHYSICAL PRODUCT ===\n" +
      keyboard.getInfo() +
      "\n\n=== GETTER DAN SETTER ===\n" +
      `Harga ebook sebelum diubah: Rp${hargaAwal}\n` +
      `Harga ebook setelah diubah: Rp${ebook.price}` +
      "\n\n=== COMPUTED PROPERTY NAMES ===\n" +
      JSON.stringify(productData, null, 2) +
      "\n\n=== DESTRUCTURING + DEFAULT PARAMETERS ===\n" +
      productDescription +
      "\n\n=== NILAI DEFAULT ===\n" +
      defaultDescription;

  } catch (error) {
    output.textContent = "Terjadi kesalahan: " + error.message;
  }
});

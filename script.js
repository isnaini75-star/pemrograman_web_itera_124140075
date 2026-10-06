let keranjang = JSON.parse(
    localStorage.getItem("keranjangBelanja")
) || [];

function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(angka);
}

function validasiBarang(nama, harga, jumlah) {
    let valid = true;

    document.getElementById("error-nama").textContent = "";
    document.getElementById("error-harga").textContent = "";
    document.getElementById("error-jumlah").textContent = "";

    if (nama.length < 3) {
        document.getElementById("error-nama").textContent =
            "Nama barang minimal 3 karakter.";
        valid = false;
    }

    if (isNaN(harga) || harga < 500) {
        document.getElementById("error-harga").textContent =
            "Harga minimal Rp500.";
        valid = false;
    }

    if (!Number.isInteger(jumlah) || jumlah < 1) {
        document.getElementById("error-jumlah").textContent =
            "Jumlah minimal 1.";
        valid = false;
    }

    return valid;
}

document.getElementById("form-barang").addEventListener("submit", function(event) {

    event.preventDefault();

    const nama = document.getElementById("nama-barang").value.trim();
    const harga = Number(document.getElementById("harga-barang").value);
    const jumlah = Number(document.getElementById("jumlah-barang").value);

    if (!validasiBarang(nama, harga, jumlah)) {
        return;
    }

    const barang = {
        id: Date.now(),
        nama: nama,
        harga: harga,
        jumlah: jumlah
    };

    keranjang.push(barang);

    simpanKeranjang();
    tampilkanKeranjang();

    document.getElementById("form-barang").reset();
});

function tampilkanKeranjang() {

    const tabel = document.getElementById("tabel-keranjang");

    tabel.innerHTML = "";

    if (keranjang.length === 0) {

        tabel.innerHTML = `
            <tr>
                <td colspan="6">Keranjang masih kosong.</td>
            </tr>
        `;

    } else {

        keranjang.forEach((barang, index) => {

            const subtotal = barang.harga * barang.jumlah;

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${barang.nama}</td>
                <td>${formatRupiah(barang.harga)}</td>
                <td>${barang.jumlah}</td>
                <td>${formatRupiah(subtotal)}</td>
                <td>
                    <button
                        class="btn-hapus"
                        onclick="hapusBarang(${barang.id})">
                        Hapus
                    </button>
                </td>
            `;

            tabel.appendChild(row);
        });
    }

    hitungTotal();
}

function hapusBarang(id) {

    keranjang = keranjang.filter(function(barang) {
        return barang.id !== id;
    });

    simpanKeranjang();
    tampilkanKeranjang();
}

function simpanKeranjang() {

    localStorage.setItem(
        "keranjangBelanja",
        JSON.stringify(keranjang)
    );
}

function hitungTotal() {

    let totalBelanja = 0;

    keranjang.forEach(function(barang) {

        totalBelanja += barang.harga * barang.jumlah;

    });

    const diskon = hitungDiskon(totalBelanja);

    const totalAkhir = totalBelanja - diskon;

    document.getElementById("total-belanja").textContent =
        formatRupiah(totalBelanja);

    document.getElementById("total-diskon").textContent =
        formatRupiah(diskon);

    document.getElementById("total-akhir").textContent =
        formatRupiah(totalAkhir);

    // Langsung hitung uang kembalian
    hitungKembalian();
}

function hitungDiskon(totalBelanja) {

    const kodePromo =
        document.getElementById("kode-promo").value
        .trim()
        .toUpperCase();

    let diskon = 0;

    if (totalBelanja >= 50000) {
        diskon = totalBelanja * 0.10;
    }

    if (kodePromo === "HEMAT10") {
        diskon = totalBelanja * 0.10;

        document.getElementById("pesan-promo").textContent =
            "Promo HEMAT10 berhasil digunakan.";
        document.getElementById("pesan-promo").style.color = "green";

    } else if (kodePromo !== "") {

        document.getElementById("pesan-promo").textContent =
            "Kode promo tidak valid.";
        document.getElementById("pesan-promo").style.color = "red";

    } else {

        document.getElementById("pesan-promo").textContent = "";
    }

    return diskon;
}

document.getElementById("kode-promo").addEventListener("input", function() {

    hitungTotal();

});

function hitungKembalian() {

    let totalBelanja = 0;

    keranjang.forEach(function(barang) {

        totalBelanja += barang.harga * barang.jumlah;

    });

    const diskon = hitungDiskon(totalBelanja);
    const totalAkhir = totalBelanja - diskon;

    const uangBayar =
        Number(document.getElementById("uang-bayar").value) || 0;

    const hasil = document.getElementById("hasil-pembayaran");

    if (keranjang.length === 0) {

        hasil.textContent = "Rp0";
        return;

    }

    if (uangBayar === 0) {

        hasil.textContent = "Rp0";
        return;

    }

    if (uangBayar < totalAkhir) {

        hasil.textContent =
            "Kurang " + formatRupiah(totalAkhir - uangBayar);

        hasil.style.color = "red";

    } else {

        hasil.textContent =
            formatRupiah(uangBayar - totalAkhir);

        hasil.style.color = "green";
    }
}

document.getElementById("uang-bayar").addEventListener("input", function() {

    hitungKembalian();

});

document.getElementById("btn-reset").addEventListener("click", function() {

    const yakin = confirm(
        "Apakah Anda yakin ingin memulai transaksi baru?"
    );

    if (!yakin) {
        return;
    }

    keranjang = [];

    localStorage.removeItem("keranjangBelanja");

    document.getElementById("form-barang").reset();

    document.getElementById("kode-promo").value = "";
    document.getElementById("uang-bayar").value = "";

    document.getElementById("pesan-promo").textContent = "";

    document.getElementById("hasil-pembayaran").textContent = "Rp0";

    tampilkanKeranjang();
});

tampilkanKeranjang();
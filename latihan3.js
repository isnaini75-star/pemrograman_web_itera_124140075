let dataMahasiswa = [
  {
    nama: "Andi",
    nim: "124140101",
    jurusan: "Teknik Informatika",
    nilai: 85
  },
  {
    nama: "Budi",
    nim: "124140102",
    jurusan: "Teknik Informatika",
    nilai: 78
  },
  {
    nama: "Citra",
    nim: "124140103",
    jurusan: "Teknik Informatika",
    nilai: 92
  },
  {
    nama: "Dina",
    nim: "124140104",
    jurusan: "Teknik Informatika",
    nilai: 88
  },
  {
    nama: "Eka",
    nim: "124140105",
    jurusan: "Teknik Informatika",
    nilai: 75
  }
];

// Menampilkan data mahasiswa ke tabel utama
function tampilkanMahasiswa() {
  let tabel = document.getElementById("tabel-mahasiswa");

  tabel.innerHTML = "";

  dataMahasiswa.forEach(function (mahasiswa, index) {
    tabel.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${mahasiswa.nama}</td>
        <td>${mahasiswa.nim}</td>
        <td>${mahasiswa.jurusan}</td>
        <td>${mahasiswa.nilai}</td>
      </tr>
    `;
  });
}


function tampilkanTabelCRUD() {
  let tabel = document.getElementById("tabel-crud");

  tabel.innerHTML = "";

  dataMahasiswa.forEach(function (mahasiswa, index) {
    tabel.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${mahasiswa.nama}</td>
        <td>${mahasiswa.nim}</td>
        <td>${mahasiswa.jurusan}</td>
        <td>${mahasiswa.nilai}</td>
        <td>
          <button onclick="ubahMahasiswa(${index})">Ubah</button>
          <button onclick="hapusMahasiswa(${index})">Hapus</button>
        </td>
      </tr>
    `;
  });
}


document.getElementById("btn-tertinggi").addEventListener("click", function () {

  let mahasiswaTertinggi = dataMahasiswa.reduce(function (tertinggi, mahasiswa) {
    return mahasiswa.nilai > tertinggi.nilai ? mahasiswa : tertinggi;
  });

  document.getElementById("out-tertinggi").innerHTML =
    "Nama: " + mahasiswaTertinggi.nama +
    "<br>NIM: " + mahasiswaTertinggi.nim +
    "<br>Nilai: " + mahasiswaTertinggi.nilai;
});


document.getElementById("btn-rata-rata").addEventListener("click", function () {

  let totalNilai = dataMahasiswa.reduce(function (total, mahasiswa) {
    return total + mahasiswa.nilai;
  }, 0);

  let rataRata = totalNilai / dataMahasiswa.length;

  let mahasiswaDiAtasRataRata = dataMahasiswa.filter(function (mahasiswa) {
    return mahasiswa.nilai > rataRata;
  });

  let hasil = "<p>Rata-rata nilai: " + rataRata.toFixed(2) + "</p>";

  hasil += `
    <table>
      <tr>
        <th>Nama</th>
        <th>NIM</th>
        <th>Nilai</th>
      </tr>
  `;

  mahasiswaDiAtasRataRata.forEach(function (mahasiswa) {
    hasil += `
      <tr>
        <td>${mahasiswa.nama}</td>
        <td>${mahasiswa.nim}</td>
        <td>${mahasiswa.nilai}</td>
      </tr>
    `;
  });

  hasil += "</table>";

  document.getElementById("out-rata-rata").innerHTML = hasil;
});


function urutkanNamaNaik() {

  let dataUrut = [...dataMahasiswa];

  dataUrut.sort(function (a, b) {
    return a.nama.localeCompare(b.nama);
  });

  tampilkanHasilUrutan(dataUrut);
}

function urutkanNamaTurun() {

  let dataUrut = [...dataMahasiswa];

  dataUrut.sort(function (a, b) {
    return b.nama.localeCompare(a.nama);
  });

  tampilkanHasilUrutan(dataUrut);
}

function tampilkanHasilUrutan(data) {

  let hasil = `
    <table>
      <tr>
        <th>No</th>
        <th>Nama</th>
        <th>NIM</th>
        <th>Nilai</th>
      </tr>
  `;

  data.forEach(function (mahasiswa, index) {
    hasil += `
      <tr>
        <td>${index + 1}</td>
        <td>${mahasiswa.nama}</td>
        <td>${mahasiswa.nim}</td>
        <td>${mahasiswa.nilai}</td>
      </tr>
    `;
  });

  hasil += "</table>";

  document.getElementById("out-urutan").innerHTML = hasil;
}

document.getElementById("btn-naik").addEventListener("click", function () {
  urutkanNamaNaik();
});

document.getElementById("btn-turun").addEventListener("click", function () {
  urutkanNamaTurun();
});


document.getElementById("btn-tambah").addEventListener("click", function () {

  let nama = document.getElementById("input-nama").value;
  let nim = document.getElementById("input-nim").value;
  let jurusan = document.getElementById("input-jurusan").value;
  let nilai = Number(document.getElementById("input-nilai").value);

  if (nama === "" || nim === "" || jurusan === "" || nilai === "") {
    alert("Semua data harus diisi.");
    return;
  }

  let mahasiswaBaru = {
    nama: nama,
    nim: nim,
    jurusan: jurusan,
    nilai: nilai
  };

  dataMahasiswa.push(mahasiswaBaru);

  tampilkanMahasiswa();
  tampilkanTabelCRUD();

  document.getElementById("input-nama").value = "";
  document.getElementById("input-nim").value = "";
  document.getElementById("input-jurusan").value = "";
  document.getElementById("input-nilai").value = "";
});


function ubahMahasiswa(index) {

  let mahasiswa = dataMahasiswa[index];

  let namaBaru = prompt("Masukkan nama baru:", mahasiswa.nama);
  let nimBaru = prompt("Masukkan NIM baru:", mahasiswa.nim);
  let jurusanBaru = prompt("Masukkan jurusan baru:", mahasiswa.jurusan);
  let nilaiBaru = prompt("Masukkan nilai baru:", mahasiswa.nilai);

  if (namaBaru !== null && nimBaru !== null &&
      jurusanBaru !== null && nilaiBaru !== null) {

    dataMahasiswa[index].nama = namaBaru;
    dataMahasiswa[index].nim = nimBaru;
    dataMahasiswa[index].jurusan = jurusanBaru;
    dataMahasiswa[index].nilai = Number(nilaiBaru);

    tampilkanMahasiswa();
    tampilkanTabelCRUD();
  }
}

function hapusMahasiswa(index) {

  let konfirmasi = confirm(
    "Apakah Anda yakin ingin menghapus data mahasiswa ini?"
  );

  if (konfirmasi) {
    dataMahasiswa.splice(index, 1);

    tampilkanMahasiswa();
    tampilkanTabelCRUD();
  }
}


// Menampilkan data ketika halaman pertama kali dibuka
tampilkanMahasiswa();
tampilkanTabelCRUD();
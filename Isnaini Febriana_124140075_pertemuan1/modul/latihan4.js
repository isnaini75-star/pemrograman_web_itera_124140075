let dataMahasiswa = JSON.parse(
  localStorage.getItem("dataMahasiswa")
) || [];

function tampilkanMahasiswa() {
  let hasil = "";

  if (dataMahasiswa.length === 0) {
    hasil = "<p>Belum ada data mahasiswa.</p>";
  } else {
    hasil = `
      <table>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>NIM</th>
          <th>Jurusan</th>
        </tr>
    `;

    dataMahasiswa.forEach(function (mahasiswa, index) {
      hasil += `
        <tr>
          <td>${index + 1}</td>
          <td>${mahasiswa.nama}</td>
          <td>${mahasiswa.nim}</td>
          <td>${mahasiswa.jurusan}</td>
        </tr>
      `;
    });

    hasil += "</table>";
  }

  document.getElementById("out-mahasiswa").innerHTML = hasil;
}


document.getElementById("btn-tambah").addEventListener("click", function () {

  let nama = document.getElementById("input-nama").value.trim();
  let nim = document.getElementById("input-nim").value.trim();
  let jurusan = document.getElementById("input-jurusan").value.trim();

  let pesan = "";

  // Validasi form
  if (nama === "") {
    pesan = "Nama harus diisi.";
  } else if (nim === "") {
    pesan = "NIM harus diisi.";
  } else if (jurusan === "") {
    pesan = "Jurusan harus diisi.";
  }

  if (pesan !== "") {
    document.getElementById("pesan-validasi").textContent = pesan;
    return;
  }

  let mahasiswaBaru = {
    nama: nama,
    nim: nim,
    jurusan: jurusan
  };

  dataMahasiswa.push(mahasiswaBaru);

  document.getElementById("pesan-validasi").textContent =
    "Data berhasil ditambahkan.";

  document.getElementById("input-nama").value = "";
  document.getElementById("input-nim").value = "";
  document.getElementById("input-jurusan").value = "";

  tampilkanMahasiswa();
});


// ==========================================
// 2. LOCAL STORAGE
// ==========================================

// Tombol untuk menyimpan data
document.getElementById("btn-simpan").addEventListener("click", function () {

  localStorage.setItem(
    "dataMahasiswa",
    JSON.stringify(dataMahasiswa)
  );

  document.getElementById("out-storage").textContent =
    "Data mahasiswa berhasil disimpan ke LocalStorage.";
});


// Tombol untuk mengambil data
document.getElementById("btn-tampilkan").addEventListener("click", function () {

  let dataTersimpan = JSON.parse(
    localStorage.getItem("dataMahasiswa")
  );

  if (dataTersimpan) {
    dataMahasiswa = dataTersimpan;

    tampilkanMahasiswa();

    document.getElementById("out-storage").textContent =
      "Data berhasil diambil dari LocalStorage.";
  } else {
    document.getElementById("out-storage").textContent =
      "Belum ada data yang tersimpan.";
  }
});


// ==========================================
// 3. SEARCH / FILTER POST DARI API
// ==========================================

let dataPost = [];

async function ambilPost() {

  try {

    let respon = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );

    dataPost = await respon.json();

    tampilkanPost(dataPost);

  } catch (error) {

    document.getElementById("out-post").textContent =
      "Gagal mengambil data dari API.";
  }
}


function tampilkanPost(data) {

  let hasil = "";

  data.forEach(function (post) {

    hasil += `
      <div style="margin-bottom: 10px;">
        <strong>${post.id}. ${post.title}</strong>
      </div>
    `;
  });

  document.getElementById("out-post").innerHTML = hasil;
}


document.getElementById("btn-cari").addEventListener("click", function () {

  let kataKunci = document
    .getElementById("input-cari")
    .value
    .toLowerCase();

  let hasilPencarian = dataPost.filter(function (post) {

    return post.title.toLowerCase().includes(kataKunci);

  });

  tampilkanPost(hasilPencarian);
});


// Ambil data API ketika halaman dibuka
ambilPost();


// ==========================================
// 4. DARK MODE
// ==========================================

let modeGelap = false;

document.getElementById("btn-mode").addEventListener("click", function () {

  modeGelap = !modeGelap;

  document.body.classList.toggle("gelap");

  if (modeGelap) {

    document.getElementById("btn-mode").textContent =
      "Aktifkan Light Mode";

  } else {

    document.getElementById("btn-mode").textContent =
      "Aktifkan Dark Mode";
  }
});


// ==========================================
// 5. PAGINATION DATA API
// ==========================================

let halaman = 1;
let jumlahData = 10;

function tampilkanPagination() {

  let dataMulai = (halaman - 1) * jumlahData;
  let dataSelesai = dataMulai + jumlahData;

  let dataHalaman = dataPost.slice(
    dataMulai,
    dataSelesai
  );

  let hasil = `
    <table>
      <tr>
        <th>ID</th>
        <th>Title</th>
      </tr>
  `;

  dataHalaman.forEach(function (post) {

    hasil += `
      <tr>
        <td>${post.id}</td>
        <td>${post.title}</td>
      </tr>
    `;
  });

  hasil += "</table>";

  document.getElementById("out-pagination").innerHTML =
    hasil;
}


// Tombol Previous
document.getElementById("btn-sebelumnya").addEventListener(
  "click",
  function () {

    if (halaman > 1) {

      halaman--;

      tampilkanPagination();
    }
  }
);


// Tombol Next
document.getElementById("btn-berikutnya").addEventListener(
  "click",
  function () {

    let jumlahHalaman =
      Math.ceil(dataPost.length / jumlahData);

    if (halaman < jumlahHalaman) {

      halaman++;

      tampilkanPagination();
    }
  }
);


// ==========================================
// 6. TODO LIST
// ==========================================

let daftarTodo = JSON.parse(
  localStorage.getItem("daftarTodo")
) || [];

function tampilkanTodo() {

  let hasil = "";

  if (daftarTodo.length === 0) {

    hasil = "<p>Belum ada kegiatan.</p>";

  } else {

    daftarTodo.forEach(function (todo, index) {

      let kelasSelesai = todo.selesai
        ? "selesai"
        : "";

      hasil += `
        <div>
          <span class="${kelasSelesai}">
            ${todo.kegiatan}
          </span>

          <button onclick="tandaiSelesai(${index})">
            ${todo.selesai ? "Batal Selesai" : "Selesai"}
          </button>

          <button onclick="hapusTodo(${index})">
            Hapus
          </button>
        </div>
      `;
    });
  }

  document.getElementById("out-todo").innerHTML = hasil;
}


// Menambahkan Todo
document.getElementById("btn-tambah-todo").addEventListener(
  "click",
  function () {

    let kegiatan = document
      .getElementById("input-todo")
      .value
      .trim();

    if (kegiatan === "") {
      alert("Kegiatan harus diisi.");
      return;
    }

    let todoBaru = {
      kegiatan: kegiatan,
      selesai: false
    };

    daftarTodo.push(todoBaru);

    simpanTodo();

    document.getElementById("input-todo").value = "";

    tampilkanTodo();
  }
);


// Menandai Todo sebagai selesai
function tandaiSelesai(index) {

  daftarTodo[index].selesai =
    !daftarTodo[index].selesai;

  simpanTodo();

  tampilkanTodo();
}


// Menghapus Todo
function hapusTodo(index) {

  daftarTodo.splice(index, 1);

  simpanTodo();

  tampilkanTodo();
}


// Menyimpan Todo ke LocalStorage
function simpanTodo() {

  localStorage.setItem(
    "daftarTodo",
    JSON.stringify(daftarTodo)
  );
}


// Menampilkan Todo ketika halaman dibuka
tampilkanTodo();


// Menampilkan data mahasiswa ketika halaman dibuka
tampilkanMahasiswa();

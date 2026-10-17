// Konstanta dan elemen
const STORAGE_KEY = 'kegiatan_v2_blue';

let kegiatan = [];

try {
  const dataTersimpan = JSON.parse(localStorage.getItem(STORAGE_KEY));
  kegiatan = Array.isArray(dataTersimpan) ? dataTersimpan : [];
} catch (error) {
  kegiatan = [];
}

const menuItems = document.querySelectorAll('.menu-item');
const pages = document.querySelectorAll('.page');
const pageButtons = document.querySelectorAll('[data-page]');

const form = document.getElementById('formKegiatan');
const inputNama = document.getElementById('nama');
const inputTanggal = document.getElementById('tanggal');
const inputWaktu = document.getElementById('waktu');
const inputJenis = document.getElementById('jenis');
const inputLokasi = document.getElementById('lokasi');

const inputDeskripsi = document.getElementById('deskripsi');

const submitBtn = document.getElementById('submitBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');

const listContainer = document.getElementById('listKegiatan');
const searchInput = document.getElementById('search');
const filterJenis = document.getElementById('filterJenis');
const clearFiltersBtn = document.getElementById('clearFilters');

const totalCountEl = document.getElementById('totalCount');
const doneCountEl = document.getElementById('doneCount');
const todayCountEl = document.getElementById('todayCount');
const priorityListEl = document.getElementById('priorityList');
const upcomingListEl = document.getElementById('upcomingList');

const dayEl = document.getElementById('day');
const monthEl = document.getElementById('month');
const fullDateEl = document.getElementById('fullDate');
const clockEl = document.getElementById('clock');
const syncTimeEl = document.getElementById('syncTime');

let editIndex = null;


//Kelas kegiatam
class Kegiatan {
  constructor(
    nama,
    tanggal,
    waktu,
    jenis,
    lokasi,
    deskripsi = '',
    selesai = false
  ) {
    this.nama = nama;
    this.tanggal = tanggal;
    this.waktu = waktu;
    this.jenis = jenis;
    this.lokasi = lokasi;
    this.deskripsi = deskripsi;
    this.selesai = selesai;
  }
}


// Helper
const save = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(kegiatan));
  renderSummary();
};

const formatDate = tanggal => {
  if (!tanggal) return '-';

  // Menghindari tanggal bergeser karena perbedaan zona waktu
  const [tahun, bulan, hari] = tanggal.split('-').map(Number);
  const date = new Date(tahun, bulan - 1, hari);

  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

const escapeHtml = str => {
  return String(str ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
};

const getDateTime = item => {
  return new Date(`${item.tanggal}T${item.waktu || '00:00'}:00`);
};


// Navigasi halaman
function bukaHalaman(namaHalaman) {
  const targetPage = document.getElementById(namaHalaman);

  if (!targetPage || !targetPage.classList.contains('page')) {
    return;
  }

  pages.forEach(page => page.classList.remove('active-page'));
  targetPage.classList.add('active-page');

  menuItems.forEach(menu => {
    menu.classList.toggle(
      'active',
      menu.dataset.page === namaHalaman
    );
  });

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Menangani navigasi atas dan tombol Tambah Kegiatan
pageButtons.forEach(button => {
  button.addEventListener('click', () => {
    bukaHalaman(button.dataset.page);
  });
});


// Daftar kegiatan
function renderList() {
  const q = (searchInput.value || '').trim().toLowerCase();
  const jenisFilter = filterJenis.value;

  listContainer.innerHTML = '';

  const filtered = kegiatan
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => {
      const nama = String(item.nama || '').toLowerCase();
      const lokasi = String(item.lokasi || '').toLowerCase();
      const deskripsi = String(item.deskripsi || '').toLowerCase();

      const cocokPencarian =
        nama.includes(q) ||
        lokasi.includes(q) ||
        deskripsi.includes(q);

      const cocokJenis =
        !jenisFilter || item.jenis === jenisFilter;

      return cocokPencarian && cocokJenis;
    })
    .sort((a, b) => {
      const waktuA = getDateTime(a.item).getTime();
      const waktuB = getDateTime(b.item).getTime();
      return waktuA - waktuB;
    });

  if (filtered.length === 0) {
    listContainer.innerHTML = `
      <div class="card">
        ${q || jenisFilter
          ? 'Kegiatan tidak ditemukan.'
          : 'Belum ada kegiatan.'}
      </div>
    `;
    return;
  }

  filtered.forEach(({ item: k, index: idx }) => {
    const card = document.createElement('div');

    card.className = `keg-card ${k.selesai ? 'keg-done' : ''}`;

    card.innerHTML = `
      <div class="keg-left">
        <div class="keg-title">${escapeHtml(k.nama)}</div>

        <div class="keg-meta">
          ${escapeHtml(k.jenis || '-')} •
          ${formatDate(k.tanggal)}
          ${escapeHtml(k.waktu || '-')} •
          📍 ${escapeHtml(k.lokasi)}
        </div>

        <div class="keg-desc">
          ${escapeHtml(k.deskripsi || '')}
        </div>
      </div>

      <div class="keg-actions">
        <button type="button" class="done"
          aria-label="${k.selesai ? 'Batalkan selesai' : 'Tandai selesai'}"
          title="${k.selesai ? 'Batalkan selesai' : 'Tandai selesai'}">
          ${k.selesai ? '↩' : '✓'}
        </button>

        <button type="button" class="edit"
          aria-label="Edit kegiatan" title="Edit">
          ✏️
        </button>

        <button type="button" class="del"
          aria-label="Hapus kegiatan" title="Hapus">
          🗑️
        </button>
      </div>
    `;

    // Tandai selesai / batalkan selesai
    card.querySelector('.done').addEventListener('click', () => {
      kegiatan[idx].selesai = !kegiatan[idx].selesai;
      save();
      renderList();
    });

    // Edit kegiatan
    card.querySelector('.edit').addEventListener('click', () => {
      enterEditMode(kegiatan[idx], idx);
    });

    // Hapus kegiatan
    card.querySelector('.del').addEventListener('click', () => {
      if (!confirm('Hapus kegiatan ini?')) return;

      kegiatan.splice(idx, 1);

      if (editIndex === idx) {
        exitEditMode();
      } else if (editIndex !== null && idx < editIndex) {
        editIndex--;
      }

      save();
      renderList();
    });

    listContainer.appendChild(card);
  });
}


// Ringkasan beranda
function renderSummary() {
  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
  ].join('-');

  const total = kegiatan.length;
  const done = kegiatan.filter(k => k.selesai).length;

  const todayCount = kegiatan.filter(
    k => k.tanggal === todayString
  ).length;

  totalCountEl.textContent = total;
  doneCountEl.textContent = done;
  todayCountEl.textContent = todayCount;

  // Tugas yang belum selesai dan belum lewat waktunya
  const now = new Date();

  const priority = kegiatan
    .filter(k => !k.selesai)
    .filter(k => getDateTime(k) >= now)
    .sort((a, b) => getDateTime(a) - getDateTime(b))
    .slice(0, 3);

  priorityListEl.innerHTML = priority.length
    ? priority.map(k => `
        <div>• ${escapeHtml(k.nama)}
        (${formatDate(k.tanggal)})</div>
      `).join('')
    : 'Tidak ada tugas prioritas.';

  // Jadwal terdekat
  const upcoming = kegiatan
    .filter(k => k.tanggal)
    .filter(k => getDateTime(k) >= now)
    .sort((a, b) => getDateTime(a) - getDateTime(b))
    .slice(0, 3);

  upcomingListEl.innerHTML = upcoming.length
    ? upcoming.map(k => `
        <div>• ${escapeHtml(k.nama)}
        (${formatDate(k.tanggal)})</div>
      `).join('')
    : 'Tidak ada jadwal terdekat.';
}


// Mode edit
function enterEditMode(item, idx) {
  editIndex = idx;

  inputNama.value = item.nama || '';
  inputTanggal.value = item.tanggal || '';
  inputWaktu.value = item.waktu || '';
  inputJenis.value = item.jenis || 'Organisasi';
  inputLokasi.value = item.lokasi || '';

  if (inputDeskripsi) {
    inputDeskripsi.value = item.deskripsi || '';
  }

  submitBtn.textContent = 'Simpan Perubahan';
  cancelEditBtn.style.display = 'inline-block';

  bukaHalaman('kegiatan');

  form.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

function exitEditMode() {
  editIndex = null;
  form.reset();

  submitBtn.textContent = 'Tambah Kegiatan';
  cancelEditBtn.style.display = 'none';
}

cancelEditBtn.addEventListener('click', () => {
  exitEditMode();
});


// Tambah dan simpan perubahan
form.addEventListener('submit', event => {
  event.preventDefault();

  const nama = inputNama.value.trim();
  const lokasi = inputLokasi.value.trim();

  if (!nama || !inputTanggal.value ||
      !inputWaktu.value || !lokasi) {
    alert('Mohon lengkapi semua data kegiatan.');
    return;
  }

  const deskripsi = inputDeskripsi
    ? inputDeskripsi.value.trim()
    : '';

  const item = new Kegiatan(
    nama,
    inputTanggal.value,
    inputWaktu.value,
    inputJenis.value,
    lokasi,
    deskripsi,
    false
  );

  if (editIndex !== null) {
    // Pertahankan status selesai saat mengedit
    item.selesai = kegiatan[editIndex].selesai;
    kegiatan[editIndex] = item;
  } else {
    kegiatan.push(item);
  }

  save();
  renderList();
  exitEditMode();
});


//Pencarian dan filter
searchInput.addEventListener('input', renderList);
filterJenis.addEventListener('change', renderList);

clearFiltersBtn.addEventListener('click', () => {
  searchInput.value = '';
  filterJenis.value = '';
  renderList();
});


// Jam dan tanggal
function updateDateTimeLocal() {
  const now = new Date();

  dayEl.textContent = now.getDate();

  monthEl.textContent = now
    .toLocaleString('id-ID', { month: 'short' })
    .toUpperCase();

  fullDateEl.textContent = now.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  clockEl.textContent = now.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

updateDateTimeLocal();
setInterval(updateDateTimeLocal, 1000);


//Sinkronisasi waktu server
async function fetchServerTime() {
  try {
    const response = await fetch(
      'https://worldtimeapi.org/api/timezone/Asia/Jakarta'
    );

    if (!response.ok) {
      throw new Error('Gagal mengambil waktu server');
    }

    const data = await response.json();

    syncTimeEl.textContent =
      `Sinkron: ${new Date(data.datetime).toLocaleTimeString('id-ID')}`;

  } catch (error) {
    syncTimeEl.textContent = 'Sinkron: gagal ambil waktu';
    console.warn('fetchServerTime error:', error);
  }
}

fetchServerTime();

// Mengambil kutipan motivasi dari API
async function fetchQuote() {
  const quoteText = document.getElementById("quoteText");
  const quoteAuthor = document.getElementById("quoteAuthor");

  try {
    const response = await fetch(
      "https://dummyjson.com/quotes/random"
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil kutipan.");
    }

    const data = await response.json();

    quoteText.textContent = `"${data.quote}"`;
    quoteAuthor.textContent = `— ${data.author}`;
  } catch (error) {
    quoteText.textContent =
      "Tetap semangat dan lakukan yang terbaik hari ini!";
    quoteAuthor.textContent = "— Kutipan motivasi";
    console.error(error);
  }
}

fetchQuote();

//Inisialisasi
renderSummary();
renderList();

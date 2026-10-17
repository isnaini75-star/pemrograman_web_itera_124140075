
const BASE_URL = "https://jsonplaceholder.typicode.com";
const ITEMS_PER_PAGE = 10;

// ELEMEN HTML
const statusBox = document.getElementById("status");
const summary = document.getElementById("summary");
const postList = document.getElementById("postList");
const searchInput = document.getElementById("searchInput");
const searchStatus = document.getElementById("searchStatus");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");
const errorBox = document.getElementById("errorBox");

// STATE APLIKASI
let currentPage = 1;
let currentQuery = "";
let totalPages = 1;
let searchTimer;
let requestId = 0;

// 1. FETCH DENGAN RETRY EXPONENTIAL BACKOFF
async function fetchWithRetry(url, maxRetries = 3) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      // Jika semua percobaan sudah habis, tampilkan error.
      if (attempt === maxRetries) {
        throw error;
      }

      // Jeda: 1 detik, 2 detik, lalu 4 detik.
      const delay = 1000 * (2 ** attempt);

      console.warn(
        `Percobaan ${attempt + 1} gagal. Mencoba lagi dalam ${delay / 1000} detik.`
      );

      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Helper untuk mengambil respons API dengan informasi pagination.
async function fetchPosts(page, query = "") {
  const params = new URLSearchParams({
    _page: page,
    _limit: ITEMS_PER_PAGE
  });

  if (query.trim()) {
    params.set("title_like", query.trim());
  }

  const response = await fetch(
    `${BASE_URL}/posts?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(`Gagal mengambil postingan: HTTP ${response.status}`);
  }

  const posts = await response.json();

  // JSONPlaceholder memberikan jumlah data pada header ini.
  const totalItems = Number(response.headers.get("X-Total-Count")) || 0;

  return { posts, totalItems };
}

// 2. FETCH BEBERAPA ENDPOINT DAN GABUNGKAN DATANYA
async function fetchCombinedData(page, query = "") {
  const [users, result] = await Promise.all([
    fetchWithRetry(`${BASE_URL}/users`),
    fetchPosts(page, query)
  ]);

  const userMap = new Map(
    users.map(user => [user.id, user.name])
  );

  const combinedPosts = result.posts.map(post => ({
    ...post,
    authorName: userMap.get(post.userId) || "Penulis tidak diketahui"
  }));

  return {
    users,
    posts: combinedPosts,
    totalItems: result.totalItems
  };
}

// 3. LOADING STATE
function showLoading(message = "Sedang memuat data...") {
  statusBox.className = "status";
  statusBox.textContent = message;
}

function showSuccess(message) {
  statusBox.className = "status success";
  statusBox.textContent = message;
}

function showError(message) {
  statusBox.className = "status error";
  statusBox.textContent = message;
}

// 4. ERROR HANDLING UNTUK OPERASI ASYNC
function handleAsyncError(error) {
  console.error(error);

  showError(
    error.message || "Terjadi kesalahan saat mengambil data."
  );

  errorBox.className = "status error";
  errorBox.textContent =
    "Error berhasil ditangani: " +
    (error.message || "Kesalahan tidak diketahui.");
}

// Fungsi ini menjadi pembungkus untuk operasi async di UI.
async function runSafely(operation) {
  try {
    await operation();
  } catch (error) {
    handleAsyncError(error);
  }
}

// Error global sebagai perlindungan tambahan.
// Ini bukan error boundary framework seperti React,
// tetapi membantu menangani error yang tidak tertangkap.
window.addEventListener("unhandledrejection", event => {
  event.preventDefault();
  handleAsyncError(event.reason);
});

window.addEventListener("error", event => {
  console.error("JavaScript error:", event.message);
});

// Menampilkan data dengan aman menggunakan textContent.
function renderPosts(posts) {
  postList.replaceChildren();

  if (posts.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "Postingan tidak ditemukan.";
    postList.appendChild(emptyMessage);
    return;
  }

  posts.forEach(post => {
    const card = document.createElement("article");
    card.className = "post";

    const title = document.createElement("h3");
    title.textContent = post.title;

    const author = document.createElement("p");
    author.className = "author";
    author.textContent = `Penulis: ${post.authorName}`;

    const body = document.createElement("p");
    body.textContent = post.body;

    card.append(title, author, body);
    postList.appendChild(card);
  });
}

// 5. PAGINATION MENGGUNAKAN ASYNC/AWAIT
async function loadData() {
  const thisRequest = ++requestId;

  showLoading("Mengambil data pengguna dan postingan...");

  prevBtn.disabled = true;
  nextBtn.disabled = true;

  try {
    const data = await fetchCombinedData(
      currentPage,
      currentQuery
    );

    // Abaikan hasil permintaan lama jika pencarian baru sudah dimulai.
    if (thisRequest !== requestId) return;

    totalPages = Math.max(
      1,
      Math.ceil(data.totalItems / ITEMS_PER_PAGE)
    );

    renderPosts(data.posts);

    summary.textContent =
      `Total pengguna: ${data.users.length} | ` +
      `Total postingan ditemukan: ${data.totalItems}`;

    pageInfo.textContent =
      `Halaman ${currentPage} dari ${totalPages}`;

    searchStatus.textContent = currentQuery
      ? `Hasil pencarian: "${currentQuery}"`
      : "Menampilkan semua postingan.";

    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages;

    showSuccess("Data berhasil dimuat.");
  } catch (error) {
    if (thisRequest === requestId) {
      handleAsyncError(error);
    }
  }
}

// Tombol halaman sebelumnya.
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    runSafely(loadData);
  }
});

// Tombol halaman berikutnya.
nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    runSafely(loadData);
  }
});

// 6. DEBOUNCED SEARCH DENGAN ASYNC API CALLS
function performSearch() {
  clearTimeout(searchTimer);

  searchTimer = setTimeout(() => {
    currentQuery = searchInput.value.trim();
    currentPage = 1;

    runSafely(loadData);
  }, 500);
}

// Cari setelah pengguna berhenti mengetik selama 500 ms.
searchInput.addEventListener("input", performSearch);

// Tombol pencarian untuk menjalankan pencarian langsung.
document.getElementById("searchBtn").addEventListener("click", () => {
  clearTimeout(searchTimer);

  currentQuery = searchInput.value.trim();
  currentPage = 1;

  runSafely(loadData);
});

// Enter juga dapat digunakan untuk mencari.
searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    clearTimeout(searchTimer);
    currentQuery = searchInput.value.trim();
    currentPage = 1;

    runSafely(loadData);
  }
});

// Tombol muat ulang data.
document.getElementById("reloadBtn").addEventListener("click", () => {
  runSafely(loadData);
});

// Menguji error handling dengan sengaja.
document.getElementById("errorBtn").addEventListener("click", () => {
  runSafely(async () => {
    throw new Error("Ini adalah contoh error untuk latihan.");
  });
});

// Jalankan aplikasi saat halaman dibuka.
runSafely(loadData);

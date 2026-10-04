// ============================================
// Trang tìm kiếm: lấy từ khóa trên URL rồi gọi API tìm kiếm
// ============================================

const thamSo = new URLSearchParams(location.search);
const tuKhoa = thamSo.get("q");

async function timKiemPhim() {
  if (!tuKhoa) return;

  document.getElementById("search-title").innerText =
    `Kết quả tìm kiếm cho: "${tuKhoa}"`;

  const url = `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=vi&query=${encodeURIComponent(tuKhoa)}`;

  const response = await fetch(url);
  const data = await response.json();

  let html = "";
  for (let i = 0; i < data.results.length; i++) {
    const phim = data.results[i];
    if (!phim.poster_path) continue;

    html += `
      <a href="info.html?id=${phim.id}" class="movie-card">
        <img src="${IMG_URL}${phim.poster_path}" alt="${phim.title}">
        <p>${phim.title}</p>
      </a>
    `;
  }

  document.getElementById("movie-grid").innerHTML = html || "<p>Không tìm thấy phim nào.</p>";
}

timKiemPhim();

// ============================================
// Trang chủ: lấy danh sách phim phổ biến từ TMDB
// ============================================

async function taiPhimPhoBien() {
  const url = `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=vi`;

  const response = await fetch(url);
  const data = await response.json();

  document.getElementById("loading").style.display = "none";
  hienThiDanhSachPhim(data.results);
}

function hienThiDanhSachPhim(danhSachPhim) {
  const luoiPhim = document.getElementById("movie-grid");
  let html = "";

  for (let i = 0; i < danhSachPhim.length; i++) {
    const phim = danhSachPhim[i];

    // Bỏ qua phim không có poster
    if (!phim.poster_path) continue;

    html += `
      <a href="info.html?id=${phim.id}" class="movie-card">
        <img src="${IMG_URL}${phim.poster_path}" alt="${phim.title}">
        <p>${phim.title}</p>
      </a>
    `;
  }

  luoiPhim.innerHTML = html;
}

taiPhimPhoBien();

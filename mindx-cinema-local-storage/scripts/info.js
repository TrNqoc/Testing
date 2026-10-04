// ============================================
// Trang chi tiết phim: lấy id phim trên URL rồi gọi API
// ============================================

const thamSo = new URLSearchParams(location.search);
const idPhim = thamSo.get("id");

if (!idPhim) location.href = "index.html";

async function taiThongTinPhim() {
  // append_to_response=credits giúp lấy luôn danh sách diễn viên trong 1 lần gọi
  const url = `${BASE_URL}/movie/${idPhim}?api_key=${TMDB_API_KEY}&language=vi&append_to_response=credits`;

  const response = await fetch(url);
  const phim = await response.json();

  document.getElementById("poster").src = `${IMG_URL}${phim.poster_path}`;
  document.getElementById("title").innerText = phim.title;
  document.getElementById("description").innerText = phim.overview;
  document.getElementById("release-date").innerText = "Ngày phát hành: " + phim.release_date;
  document.getElementById("genres").innerText =
    "Thể loại: " + phim.genres.map((g) => g.name).join(", ");
  document.getElementById("watch-btn").href = `watch.html?id=${phim.id}`;

  hienThiDienVien(phim.credits.cast);
}

function hienThiDienVien(danhSachDienVien) {
  let html = "";
  const toiDa8NguoiDau = danhSachDienVien.slice(0, 8);

  for (let i = 0; i < toiDa8NguoiDau.length; i++) {
    const dv = toiDa8NguoiDau[i];
    if (!dv.profile_path) continue;

    html += `
      <div>
        <img src="${IMG_URL}${dv.profile_path}" alt="${dv.name}">
        <p>${dv.name}</p>
      </div>
    `;
  }

  document.getElementById("cast-list").innerHTML = html;
}

taiThongTinPhim();

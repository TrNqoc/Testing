// ============================================
// Trang xem trailer: lấy video từ TMDB (YouTube chính thức)
// và xử lý bình luận lưu trong localStorage
// ============================================

const thamSo = new URLSearchParams(location.search);
const idPhim = thamSo.get("id");

if (!idPhim) location.href = "index.html";

// ----- Tải trailer + thông tin phim -----
async function taiTrailer() {
  // Không lọc theo language=vi vì hầu hết trailer chỉ có bản tiếng Anh (en-US),
  // lọc theo vi sẽ trả về mảng rỗng ở gần như mọi phim.
  const urlVideo = `${BASE_URL}/movie/${idPhim}/videos?api_key=${TMDB_API_KEY}`;
  const resVideo = await fetch(urlVideo);
  const dataVideo = await resVideo.json();

  // Tìm trailer YouTube, nếu không có tiếng Việt thì lấy video YouTube bất kỳ
  let video = dataVideo.results.find((v) => v.type === "Trailer" && v.site === "YouTube");
  if (!video) video = dataVideo.results.find((v) => v.site === "YouTube");

  if (video) {
    document.getElementById("trailer-frame").src = `https://www.youtube.com/embed/${video.key}`;
  } else {
    document.getElementById("trailer-frame").outerHTML = "<p>Phim này chưa có trailer.</p>";
  }

  const urlPhim = `${BASE_URL}/movie/${idPhim}?api_key=${TMDB_API_KEY}&language=vi`;
  const resPhim = await fetch(urlPhim);
  const phim = await resPhim.json();

  document.getElementById("title").innerText = phim.title;
  document.getElementById("description").innerText = phim.overview;
}

taiTrailer();

// ----- Bình luận (yêu cầu đăng nhập) -----
const nguoiDung = JSON.parse(localStorage.getItem("currentUser"));

function hienThiBinhLuan() {
  const danhSachBinhLuan = JSON.parse(localStorage.getItem("comments-" + idPhim)) || [];
  let html = "";

  for (let i = 0; i < danhSachBinhLuan.length; i++) {
    html += `
      <div class="comment-item">
        <img class="avatar-nho" src="${AVATAR_MAC_DINH}" alt="avatar">
        <div>
          <strong>${danhSachBinhLuan[i].username}</strong>
          <p>${danhSachBinhLuan[i].noiDung}</p>
        </div>
      </div>
    `;
  }

  document.getElementById("comment-list").innerHTML = html;
}

if (!nguoiDung) {
  // Nếu chưa đăng nhập, ẩn form và yêu cầu đăng nhập
  document.getElementById("comment-form-area").innerHTML =
    `<p>Vui lòng <a href="login.html">đăng nhập</a> để bình luận.</p>`;
} else {
  document.getElementById("comment-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const noiDung = document.getElementById("comment-input").value.trim();
    if (!noiDung) return;

    const danhSachBinhLuan = JSON.parse(localStorage.getItem("comments-" + idPhim)) || [];
    danhSachBinhLuan.push({ username: nguoiDung.username, noiDung: noiDung });
    localStorage.setItem("comments-" + idPhim, JSON.stringify(danhSachBinhLuan));

    document.getElementById("comment-input").value = "";
    hienThiBinhLuan();
  });
}

hienThiBinhLuan();

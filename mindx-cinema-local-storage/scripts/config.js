// ============================================
// CẤU HÌNH CHUNG - dùng lại cho tất cả các trang
// ============================================

// Đăng ký tài khoản miễn phí tại https://www.themoviedb.org/signup
// rồi vào Settings > API để lấy API key, dán vào đây
const TMDB_API_KEY = "4e491e5d73c1ab740c1872427b6acce6";

const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w300";
const AVATAR_MAC_DINH = "assets/default-avatar.png";

// ============================================
// Hiển thị khu vực đăng nhập/đăng xuất trên navbar
// (đoạn này chạy trên mọi trang có #auth-area)
// ============================================

function hienThiTrangThaiDangNhap() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const khuVucAuth = document.getElementById("auth-area");
  if (!khuVucAuth) return;

  if (user) {
    khuVucAuth.innerHTML = `
      <img class="avatar-nho" src="${AVATAR_MAC_DINH}" alt="avatar">
      <span>Xin chào, ${user.username}</span>
      <button onclick="dangXuat()">Đăng xuất</button>
    `;
  } else {
    khuVucAuth.innerHTML = `<a href="login.html">Đăng nhập</a>`;
  }
}

function dangXuat() {
  localStorage.removeItem("currentUser");
  location.href = "index.html";
}

hienThiTrangThaiDangNhap();

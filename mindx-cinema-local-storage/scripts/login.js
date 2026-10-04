// ============================================
// Đăng nhập: kiểm tra email + mật khẩu với danh sách user đã lưu
// ============================================

// Nếu đã đăng nhập rồi thì không cho vào trang đăng nhập nữa
if (localStorage.getItem("currentUser")) {
  location.href = "index.html";
}

const form = document.getElementById("login-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const matKhau = document.getElementById("password").value;

  const danhSachUser = JSON.parse(localStorage.getItem("users")) || [];

  const user = danhSachUser.find(
    (u) => u.email === email && u.password === matKhau
  );

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    location.href = "index.html";
  } else {
    alert("Email hoặc mật khẩu không đúng");
  }
});

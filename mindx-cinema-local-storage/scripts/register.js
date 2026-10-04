// ============================================
// Đăng ký tài khoản: lưu danh sách user vào localStorage
// ============================================

// Nếu đã đăng nhập rồi thì không cho vào trang đăng ký nữa
if (localStorage.getItem("currentUser")) {
  location.href = "index.html";
}

const form = document.getElementById("register-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const tenDangNhap = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const matKhau = document.getElementById("password").value;

  if (tenDangNhap.length < 4) {
    alert("Tên đăng nhập phải có ít nhất 4 ký tự");
    return;
  }

  if (matKhau.length < 6) {
    alert("Mật khẩu phải có ít nhất 6 ký tự");
    return;
  }

  // Lấy danh sách user cũ (nếu chưa có thì dùng mảng rỗng)
  const danhSachUser = JSON.parse(localStorage.getItem("users")) || [];

  // Kiểm tra email đã tồn tại chưa
  const daTonTai = danhSachUser.find((u) => u.email === email);
  if (daTonTai) {
    alert("Email này đã được đăng ký");
    return;
  }

  // Thêm user mới vào danh sách rồi lưu lại
  danhSachUser.push({
    username: tenDangNhap,
    email: email,
    password: matKhau,
  });
  localStorage.setItem("users", JSON.stringify(danhSachUser));

  alert("Đăng ký thành công! Vui lòng đăng nhập.");
  location.href = "login.html";
});

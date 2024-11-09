const express = require("express");
const cors = require("cors");

const app = express();

// Đăng ký API vừa tạo
const booksRouter = require("./app/routes/book.route");
const ApiError = require("./app/api-error");

//API xử lý lỗi
app.use((req, res, next) => {
  // Mã nguồn tại đây sẽ chạy nếu có không hợp lệ
  return next(new ApiError(404, "Resource Not Found")); 
});

// middleware xử lý lỗi
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({ 
    message: err.message || "Internal Server Error", });
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to management book application."});
});

// Sử dụng các API vừa tạo
app.use("/api/books", booksRouter);

module.exports = app;
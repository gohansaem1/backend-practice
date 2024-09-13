const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path"); // 추가
const postRoutes = require("./routes/posts");

dotenv.config();

const app = express();

// CORS 설정
const corsOptions = {
  origin: "https://frontend-practice-wheat.vercel.app", // 여기에 프론트엔드 도메인을 입력하세요
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions)); // CORS 설정 적용
app.use(express.json()); // JSON 파싱 미들웨어

// 정적 파일 제공
app.use(express.static(path.join(__dirname, "public"))); // 'public' 폴더를 정적 파일로 제공

// MongoDB 연결
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// 라우트 설정
app.use("/api/posts", postRoutes);

// 기본 웹페이지 처리
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000; // 포트 번호 설정
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

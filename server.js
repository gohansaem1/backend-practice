const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // 추가
const postRoutes = require("./routes/posts");

dotenv.config();

const app = express();
app.use(cors()); // 추가
app.use(express.json()); // JSON 파싱 미들웨어

// MongoDB 연결
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// 라우트 설정
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 3000; // 포트 번호 변경
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const corsOptions = {
  origin: "https://your-frontend-domain.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));

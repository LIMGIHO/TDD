const express = require("express");
const productRoutes = require("./route");
const mongoose = require("mongoose")

const PORT = 5000;
const HOST = "0.0.0.0";

mongoose.connect("mongodb+srv://lasid84:X4Y7RGEoPWsNahR1@cluster0.djlr8bq.mongodb.net/")
.then(() => {
    console.log("✅ MongoDB 연결 성공!");
    // 여기서부터 서버 실행 등의 로직을 이어가면 됩니다.
  })
  .catch((err) => {
    console.error("❌ MongoDB 연결 실패:", err);
    // 연결에 실패했을 때 어떻게 처리할지 (재시도, 프로세스 종료 등) 여기서 작성
  });
  
const app = express();
app.use(express.json());

app.use("/", productRoutes);

app.listen(PORT);
console.log(`Running on port ${PORT}`)
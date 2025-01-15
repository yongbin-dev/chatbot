import { Router } from "express";
import env from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";
import { getMessage } from "../utils/Test.mjs";

env.config();

const UploadRouter = Router();
const upload = multer({ dest: "uploads/" });

/* GET users listing. */
UploadRouter.get("/:id", function (req, res, next) {
  res.send("respond with a resource");
});

UploadRouter.post("/", upload.single("uploadFile"), async (req, res) => {
  try {
    // 업로드된 파일 경로
    const filePath = path.resolve(req.file.path);
    const message = req.body.message; // 메시지

    // 파일이 존재하는지 확인
    if (!fs.existsSync(filePath)) {
      return res.status(400).send("업로드된 파일이 존재하지 않습니다.");
    }

    // const result = await getMessage(filePath, message);
    // PDFLoader를 이용해 PDF 내용 로드
    // console.log(docs);
    // PDF 내용을 클라이언트에 응답
    res.json({
      question: message,
      message: "result.answer",
    });

    // // 파일 삭제
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error("PDF 처리 중 오류:", error);
    res.status(500).send("PDF 처리 중 오류가 발생했습니다.");
  }
});

export default UploadRouter;

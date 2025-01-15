import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import UploadRouter from "./routes/UploadRouter.mjs";

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/upload", UploadRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

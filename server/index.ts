import express from "express";
import path from "path";

import { log } from "./utils/index";
import { RIDES_DATA_DYNAMIC } from "./utils/mock";

const PORT = 3002;

const app = express();
app.use("/static", express.static(path.join(__dirname, "public")));
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  //res.header('Vary', 'origin')
  next();
});
const options = {
  root: path.join(__dirname, "public"),
  headers: {
    "Content-Type": "text/plain",
  },
};
app.get("/images", (req, res) => {
  log(req);
  res.send({ images: ["imageA.png"] });
});
app.post("/rides", (req, res) => {
  log("post /rides", req);
  res.send(RIDES_DATA_DYNAMIC());
});
app.get("/codes.txt", (req, res) => {
  res.sendFile("codes.txt", options);
});

app.listen(PORT, () => {
  console.log("EXPRESS server listening on ", PORT);
});

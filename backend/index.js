const express = require("express");
const cors = require("cors");
const { StatusCodes } = require("http-status-codes");
const app = express();
app.use(express.json());
app.use(cors());

let totalAttempts = 0;
let totalScore = 0;

app.get("/", (req, res) => {
  res.status(StatusCodes.OK).send("hello");
});

app.get("/getScore", (req, res) => {
  res
    .status(StatusCodes.OK)
    .send({ averageScore: totalScore / totalAttempts || 0 });
});

app.post("/score", (req, res) => {
  totalScore = Number(req.body.data.score) + totalScore;
  totalAttempts += 1;
  res.status(StatusCodes.OK).send("OK");
});

app.listen(3001);
